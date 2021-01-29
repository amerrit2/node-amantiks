import { resolve } from 'path';
import { readFile, access } from 'fs/promises';
import strip from 'strip-json-comments';

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
