import { exec } from 'child_process';

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
