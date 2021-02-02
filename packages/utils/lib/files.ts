import { resolve } from 'path';
import { promises } from 'fs';
import strip from 'strip-json-comments';

const { readFile, access, readdir } = promises;

export async function readJson(path: string) {
	try {
		return JSON.parse(strip(`${await readFile(resolve(process.cwd(), path))}`));
	} catch (e) {
		e.message = `Failed to read/parse JSON file '${path}'\n${e.message}`;
		throw e;
	}
}

export async function pathExists(path: string) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

export async function getDownloadedDependencies(dir: string) {
	const nodeModulesPath = resolve(dir, 'node_modules');
	if (!(await pathExists(nodeModulesPath))) {
		return [];
	}

	return (await readdir(nodeModulesPath)).reduce(async (chain, folderName) => {
		const values = await chain;
		if (folderName.startsWith('@')) {
			const contents = await readdir(resolve(nodeModulesPath, folderName));
			values.push(...contents.map((c) => `${folderName}/${c}`));
		} else {
			values.push(folderName);
		}
		return values;
	}, Promise.resolve([] as string[]));
}
