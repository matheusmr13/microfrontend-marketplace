import axios from 'axios';

const client_id = 'Iv1.c63462ddf8a69eb2';
const client_secret = 'cdda67cca577b26c26e7b86f58f6260a17930826';

export const getGithubAccessToken = (code: string) => {
	return axios({
		method: 'post',
		url: `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
		headers: {
			accept: 'application/json'
		}
	}).then((response: any) => response.data);
}

export const getGithubUserInfo = (githubAuth:any) => {
	const { access_token, token_type } = githubAuth;
	return axios({
		url: `https://api.github.com/user`,
		headers: {
			accept: 'application/json',
			Authorization: `${token_type} ${access_token}`
		}
		}).then((response: any) => response.data);
}