import { makeUseAxios } from 'axios-hooks';

import Axios from 'axios';
 
export const useApiRequest = makeUseAxios({
  axios: Axios.create({
    baseURL: 'http://localhost:8080/',
  })
});

export const useLoggedApiRequest = makeUseAxios({
  axios: null
});

const configureLoggedApiRequest = (token: any) => {
  useLoggedApiRequest.configure({
    axios: Axios.create({
      baseURL: 'http://localhost:8080/',
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    })
  })
}


export const useGithubApiRequest = makeUseAxios({
  axios: null
});

const configureGithubApiRequest = (token: any) => {
  useGithubApiRequest.configure({
    axios: Axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    })
  })
}

export const configureLoggedUser = (loggedUser : any) => {
  configureLoggedApiRequest(loggedUser.api);
  configureGithubApiRequest(loggedUser.github);
}