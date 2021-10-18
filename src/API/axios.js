import axios from 'axios';

// api link
export let url = 'http://localhost:8003';

// create intance of axios to use it everywhere in the app
const instance = axios.create({
  //   baseURL: process.env.REACT_APP_API_URL,
  baseURL: url,
});

export default instance;
