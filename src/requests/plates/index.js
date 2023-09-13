import axios from 'axios';
import {API_URL} from '../../utils/Requests';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getInitialPlates = async () => {
  try {
    const response = await axios.get(`${API_URL}/all-plates/ALL/1`);
    return Promise.resolve(response?.data?.all_posts);
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchMyOrders = async () => {
  const token = await AsyncStorage.getItem('user_token');
  try {
    if (token) {
      const response = await axios.get(`${API_URL}/my-orders`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return Promise.resolve(response?.data);
    }
  } catch (error) {
    console.log('fetchMyOrders error');
    console.log(error.message);
  }
};

export const fetchCustomerOrders = async () => {
  const token = await AsyncStorage.getItem('user_token');
  try {
    if (token) {
      const response = await axios.get(`${API_URL}/customer-orders`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response);
      return Promise.resolve(response?.data);
    }
  } catch (error) {
    console.log('fetchCustomerOrders error');
    console.log(error.message);
  }
};
