// const axios = require('axios');
// const { promises: fs } = require('fs');

// const isDirectory = async (source) => {
// 	const stat = await fs.stat(source);
// 	return stat.isDirectory();
//   };

// const getAllFilesFromDir = async (dir, allFiles = []) => {
// 	const all = await fs.readdir(dir);

// 	await Promise.all(all.map(async (fileOrFolder) => {
// 	  const fullDir = `${dir}/${fileOrFolder}`;
// 	  const isDir = await isDirectory(fullDir);
// 	  if (isDir) {
// 		await getAllFilesFromDir(fullDir, allFiles);
// 	  } else {
// 		allFiles.push(fullDir);
// 	  }
// 	}));
// 	return allFiles;
//   };

// const publish = async (files) => {
// 	try {
// 		const a= await axios({
// 			url: 'https://api.github.com/repos/matheusmr13/github-pages-as-bucket',
// 			headers: {
// 			}
// 		});

// 		console.info(a);

// 		return;
// 		await axios({
// 			method: 'DELETE',
// 			url: 'https://api.github.com/repos/matheusmr13/github-pages-as-bucket/git/refs/heads/gh-pages',
// 			headers: {
// 			}
// 		});

// 		await axios({
// 			method: 'POST',
// 			url: 'https://api.github.com/repos/matheusmr13/github-pages-as-bucket/git/refs',
// 			headers: {
// 			},
// 			data: {
// 				"ref": "refs/heads/gh-pages",
// 				"sha": "035bd528a7eb43f4104f5cb439979c77af8555ae"
// 			}
// 		});

// 		for (var i = 0; i < files.length; i++) {
// 			const file = files[i];
// 			const githubPath = file.replace('/Users/matheus.martins/projetos/personal/github-pages-as-repo/build', '');
// 			const url = `https://api.github.com/repos/matheusmr13/github-pages-as-bucket/contents${githubPath}`;

// 			const fileContent = await fs.readFile(file);
// 			console.info(url);

// 			// return Promise.resolve();
// 			console.info('fazendo again')
// 			await axios({
// 				method: 'PUT',
// 				url: url,
// 				headers: {
// 				},
// 				data: {
// 					"message": "new version",
// 					branch: "gh-pages",
// 					"committer": {
// 						"name": 'matheus martins',
// 						"email": 'matheusmr00@gmail.com'
// 					},
// 					"content": fileContent.toString('base64')
// 				}
// 			});
// 		}
// 	} catch (e) {
// 			console.error(e);
// 		}

// 	// ghpages.publish('build', {
// 	// 	dest: `versions/${packageJson.version}`
// 	// }, () => {
// 	// 	resolve();
// 	// });
// });

// // const saveRecord = async () => {
// // 	const files = await mapMicrofrontend();
// // 	const result = await axios.post('http://localhost:8080/versions', {
// // 		microfrontendId: '2f230600-f737-4c4a-a70a-f0c140b9a479',
// // 		name: packageJson.version,
// // 		files
// // 	});

// // 	console.info(result);
// // }

// const run = async() =>{
// 	const files  = await getAllFilesFromDir('/Users/matheus.martins/projetos/personal/github-pages-as-repo/build');
// 	console.info(files)
// 	// await build();
// 	await publish(files);
// 	// await saveRecord();
// }

// run();
