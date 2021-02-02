import { getDownloadedDependencies } from '../lib';

describe('Files', () => {
	it('should list all packages in node_modules', async () => {
		// Really implement somehow (with file-os mocker)

		const deps = await getDownloadedDependencies(process.cwd());
		// console.log('\n', deps.join('\n'));
	});
});
