import { program } from 'commander';
import PackageJson from '../package.json';
import { ProgramOptions, run } from './ts_watcher';

program.version(PackageJson.version);

program.addHelpText(
	'beforeAll',
	"Runs tsc --watch, and will delete corresponding build files for all *.ts files in the 'includes' array.  All arguments after '--' are passed to tsc",
);

program.addHelpText(
	'afterAll',
	'Example: `ts-watcher -p tsconfig.debug.json -- --diagnostics some_file.ts`\nThis will execute: `tsc -p tsconfig.debug.json -w --diagnostics some_file.ts`',
);

program.usage('ts-watcher [options] -- [options and arguments forwarded to tsc]');

program.option('-p, --project [path]', 'Path to tsconfig', 'tsconfig.json');

program.parse(process.argv);

run(program.opts() as ProgramOptions, program.args).catch((e) => {
	console.error(e.message);
	process.exit(1);
});
