import axios from 'axios';
import User from 'user/user';
import Application from '../application/model';

export const getGithubRepository = (repositoryName: string) => {
	return axios(`https://api.github.com/repos/${repositoryName}`)
		.then((response: any) => response.data);
}

export const writeFileToGithubRepository = (user: User, application: Application) => {
	return axios({
		method: 'PUT',
		url: `https://api.github.com/repos/${application.githubId}/contents/my-test-file.txt`,
		headers: {
			Authorization: `token ${user.githubToken}`
		},
		data: {
			"message": "my commit message",
			branch: "gh-pages",
			"committer": {
			  "name": user.name,
			  "email": user.email
			},
			"content": "bXkgbmV3IGZpbGUgY29udGVudHM="
		  }
	})
		.then((response: any) => response.data);
}

