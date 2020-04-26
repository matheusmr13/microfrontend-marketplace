import chalk from 'chalk';
import ghPages from 'gh-pages';
import { appPackageJson as appPackageJsonPath } from './path';

const { log } = console;

const publish = async (options: any) => {
	log(chalk.blue('Publishing on github!'))
	const appPackageJson = require(appPackageJsonPath);

	await new Promise((resolve,reject) => {
		ghPages.publish('build', {
			dest: `versions/${appPackageJson.name}/${appPackageJson.version}`,
			branch: 'versions'
		}, (error) => {
			if (error) {
				console.error(error);
				reject(error);
				return;
			}
			resolve();
		});
	});
	log(chalk.blue('Done!'));
}

export default publish;