import axios from 'axios';

const instance = axios.create({
   baseURL: 'http://localhost:3000'
   // baseURL: 'https://jsonplaceholder.typicode.com'
});

export default instance;
