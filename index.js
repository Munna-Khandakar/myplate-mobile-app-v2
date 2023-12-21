import {AppRegistry} from 'react-native';
import axios from 'axios';
import App from './App';
import {name as appName} from './app.json';

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
