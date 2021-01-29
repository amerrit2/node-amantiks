import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema';
import { pathExists, readJson } from '@amantiks/utils';
import { resolve } from 'path';
import { mkdir, symlink } from 'fs/promises';

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

async function linkPackages(dir: string, links: LinksJson['packageLinks']) {
	const nodeModulesPath = resolve(dir, 'node_modules');
	if (!(await pathExists(nodeModulesPath))) {
		await mkdir(nodeModulesPath);
	}

	for (const [name, linkPath] of Object.entries(links)) {
		if (name.startsWith('@')) {
			const [scope, packageName] = name.split('/');

			const scopePath = resolve(nodeModulesPath, scope);
			if (!(await pathExists(scopePath))) {
				await mkdir(scopePath);
			}

			await symlink(linkPath, resolve(scopePath, packageName), 'junction');
		} else {
			await symlink(linkPath, resolve(nodeModulesPath, name, 'junction'));
		}

		await linkPackages(linkPath, links);
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
	const resolvedLinks = (
		await Promise.all(
			entries.map(async ([_, linkPath]) => {
				const resolved = resolve(configPath, linkPath);
				await validatePath(resolved);
				return resolved;
			}),
		)
	).reduce((out, linkPath, index) => {
		out[entries[index][0]] = linkPath;
		return out;
	}, {} as LinksJson['packageLinks']);

	// Perform linking
	await linkPackages(process.cwd(), resolvedLinks);
}
