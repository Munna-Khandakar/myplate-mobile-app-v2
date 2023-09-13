import axios from 'axios';
import {API_URL} from '../../utils/Requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const showToast = (type, text1, text2) => {
  Toast.show({
    type: type,
    text1: text1,
    text2: text2,
  });
};

export const userLogin = async payload => {
  try {
    const response = await axios.post(`${API_URL}/login`, payload);
    return Promise.resolve(response);
  } catch (error) {
    console.log('userLogin error');
    console.log(error.message);
  }
};

export const fetchMyProfile = async () => {
  const token = await AsyncStorage.getItem('user_token');
  try {
    if (token) {
      const response = await axios.get(`${API_URL}/my-profile-info`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return Promise.resolve(response?.data);
    }
  } catch (error) {
    console.log('fetchMyProfile error');
    console.log(error.message);
  }
};

export const userRegistration = async payload => {
  axios
    .post(`${API_URL}/register`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('response', response.data);
    })
    .catch(error => {
      console.log('error', error.response.data);
      showToast('error', 'Invalid Credentials', error.response.data.error);
    });
};
