import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-viv-project.firebaseio.com/'
});

export default instance;