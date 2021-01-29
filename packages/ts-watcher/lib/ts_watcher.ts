import { ParsedTsconfig } from 'typescript';
import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import { execCommand, pathExists, readJson } from '@amantiks/utils';

interface TsConfig {
	compilerOptions: ParsedTsconfig['options'];
	include: string[];
}

export interface ProgramOptions {
	project: string;
}

export async function run(options: ProgramOptions, tsArgs: string[]) {
	const tsConfig: TsConfig = await readJson(options.project);
	console.log('Watching files: ', tsConfig.include);

	const watcher = chokidar.watch(tsConfig.include);

	watcher.on('unlink', async (filePath) => {
		if (filePath.endsWith('.d.ts') || filePath.endsWith('.js')) return;

		console.log(`Watcher: unlinked ${filePath}`);
		const parsedPath = path.parse(filePath);

		['d.ts', 'js', 'd.ts.map', 'js.map'].forEach(async (ext) => {
			const buildFile = path.join(parsedPath.dir, `${parsedPath.name}.${ext}`);
			if (await pathExists(buildFile)) {
				try {
					console.log(`Unlinking: ${buildFile}`);
					await fs.promises.unlink(buildFile);
				} catch (e) {
					console.log(`Failed: ${e.message}`);
				}
			}
		});
	});

	await execCommand(process.cwd(), `npx tsc -w -p ${options.project} ${tsArgs.join(' ')}`);
}
