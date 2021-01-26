import { resolve } from 'path';
import { readFile, access } from 'fs/promises';
import strip from 'strip-json-comments';
import { exec } from 'child_process';

export async function readJson(path: string) {
	try {
		return JSON.parse(strip(`${await readFile(resolve(process.cwd(), path))}`));
	} catch (e) {
		e.message = `Failed to read/parse JSON file '${path}'\n${e.message}`;
		throw e;
	}
}

export async function execCommand(cwd: string, command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		const child = exec(command, { cwd }, (error, stdout) => {
			child.removeAllListeners();
			if (error instanceof Error) {
				reject(error);
			} else if (error) {
				reject(new Error(`Command failed - error=${error}`));
			}

			resolve(stdout);
		});

		child.stdout?.pipe(process.stdout);
		child.stderr?.pipe(process.stderr);
	});
}

export async function fileExists(path: string) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}
