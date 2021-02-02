import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import { getDownloadedDependencies, pathExists, readJson } from '@amantiks/utils';
import { relative, resolve } from 'path';
import { promises, Stats } from 'fs';

const { mkdir, rmdir, symlink, lstat, unlink, readFile, readdir } = promises;

const JsonSchema = <S extends JSONSchema7>(s: S) => s;

const ajv = new Ajv({
	useDefaults: true,
});

const schema = JsonSchema({
	type: 'object',
	properties: {
		packageLinks: {
			type: 'object',
			patternProperties: {
				'.*': {
					type: 'string',
				},
			},
		},
	},
	additionalProperties: false,
});

const validate = ajv.compile(schema);

interface LinksJson {
	packageLinks: { [packageName: string]: string };
}

interface PacakgeJson {
	name: string;
	dependencies?: Record<string, string>;
	devDependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
}

export interface LocalDevOptions {
	config: string;
}

async function validatePath(path: string) {
	if (!(await pathExists(path))) {
		throw new Error(`Failed to find path to link to: ${path}`);
	}

	if (!(await pathExists(resolve(path, 'package.json')))) {
		throw new Error(`The directory "${path}" does not contain a package.json`);
	}
}

async function getDependencies(dir: string) {
	let packageJson: PacakgeJson;
	try {
		packageJson = JSON.parse(`${await readFile(resolve(dir, 'package.json'))}`) as PacakgeJson;
	} catch (e) {
		e.message = `Failed to read/parse package.json in ${dir}\n${e.message}`;
		throw e;
	}

	const declared = [
		...Object.keys(packageJson.dependencies || []),
		...Object.keys(packageJson.devDependencies || []),
		...Object.keys(packageJson.peerDependencies || []),
	];

	const downloaded = await getDownloadedDependencies(dir);

	return Array.from(new Set([...declared, ...downloaded]));
}

async function makeLink(dir: string, depName: string, targetPath: string) {
	const nodeModulesPath = resolve(dir, 'node_modules');
	if (!(await pathExists(nodeModulesPath))) {
		await mkdir(nodeModulesPath);
	}

	let symPath: string;
	if (depName.startsWith('@')) {
		const [scope, name] = depName.split('/');

		const scopePath = resolve(nodeModulesPath, scope);
		if (!(await pathExists(scopePath))) {
			await mkdir(scopePath);
		}

		symPath = resolve(scopePath, name);
	} else {
		symPath = resolve(nodeModulesPath, depName);
	}

	// Clean up existing dep-folders
	let stats: Stats | null = null;
	try {
		stats = await lstat(symPath);
	} catch {
		stats = null;
	}

	if (stats && (stats.isSymbolicLink() || stats.isFile())) {
		await unlink(symPath);
	} else if (stats && stats.isDirectory()) {
		await rmdir(symPath, { recursive: true });
	}

	// Make local link
	console.log(`(${dir}) - Linking ${relative(dir, symPath)} to ${relative(dir, targetPath)}`);
	await symlink(targetPath, symPath, 'junction');
}

async function processDirectory(
	dir: string,
	linkTargets: Record<string, string>,
	processedDirs: string[] = [],
	sharedTargets: { name: string; targetPath: string }[] = [],
) {
	if (processedDirs.includes(dir)) return;
	processedDirs.push(dir);

	const deps = await getDependencies(dir);

	for (const dep of deps) {
		const sharedDep = sharedTargets.find((val) => val.name === dep);
		if (dep in linkTargets) {
			const target = linkTargets[dep];
			await makeLink(dir, dep, target);
			await processDirectory(target, linkTargets, processedDirs, sharedTargets);
		} else if (sharedDep) {
			await makeLink(dir, dep, sharedDep.targetPath);
		} else {
			try {
				sharedTargets.push({
					name: dep,
					targetPath: resolve(require.resolve(`${dep}/package.json`, { paths: [dir] }), '..'),
				});
			} catch {}
		}
	}
}

export async function run(options: LocalDevOptions) {
	const configPath = resolve(process.cwd(), options.config);
	const config: LinksJson = await readJson(configPath);

	// Validate config file
	if (!validate(config)) {
		throw new Error(`Invalid config file ${options.config}\nErrors=\n${JSON.stringify(validate.errors, null, 2)}`);
	}

	// Resolve paths
	const entries = Object.entries(config.packageLinks);
	const linkTargets = (
		await Promise.all(
			entries.map(async ([_, targetPath]) => {
				const resolved = resolve(configPath, '..', targetPath);
				await validatePath(resolved);
				return resolved;
			}),
		)
	).reduce((out, targetPath, index) => {
		out[entries[index][0]] = targetPath;
		return out;
	}, {} as Record<string, string>);

	await processDirectory(process.cwd(), linkTargets);
}
