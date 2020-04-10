import { configure } from 'axios-hooks';
import Axios from 'axios';
 
const axios = Axios.create({
  baseURL: 'http://localhost:8080/'
})
 
configure({ axios });