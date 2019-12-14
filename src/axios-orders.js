import axios from 'axios';

const instance  = axios.create({
	baseURL : 'https://react-burger-builder7.firebaseio.com/'
});

export default instance;