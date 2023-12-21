import axios from 'axios';
import {API_URL} from '../utils/Requests';
import useAuthStore from '../stores/authStore';

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(config => {
  const token = useAuthStore(state => state.user_token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('from ==>');
  return config;
});

instance.interceptors.response.use(response => {
  return response;
});

export default instance;
