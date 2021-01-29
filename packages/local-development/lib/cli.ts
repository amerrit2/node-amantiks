import { program } from 'commander';
import PackageJson from '../package.json';
import { LocalDevOptions, run } from './local_development';

program.version(PackageJson.version);

program.option('-c, --config <config>', 'Path to .links.json file', '.links.json');

program.parse(process.argv);

run(program.opts() as LocalDevOptions).catch((e) => {
	console.error(e.message);
	process.exit(1);
});
