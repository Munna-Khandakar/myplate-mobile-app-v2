import {AppRegistry} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from './App';
import {name as appName} from './app.json';

// const API_URL = 'http://192.168.0.120:3000/api';
const API_URL = 'https://grumpy-earrings-pig.cyclic.app/api';

// Check for token and set authorization header conditionally
AsyncStorage.getItem('user_token')
  .then(token => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      //redirect to login
      console.warn('index.js => Token not found in storage');
    }
  })
  .catch(error => {
    console.error('Error retrieving token from storage:', error);
  });

axios.defaults.baseURL = API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
  return request;
});
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return error.response.data;
  },
);
AppRegistry.registerComponent(appName, () => App);
