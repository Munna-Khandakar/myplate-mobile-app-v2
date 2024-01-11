import axios from 'axios';
import {API_URL} from '../../utils/Requests';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    //@ts-ignore
    console.log(error?.message);
  }
};

type MyProfileType = {
  username: string;
  phone: string;
  profilePicture?: string;
};

export const getMyProfile = async (): Promise<MyProfileType> => {
  try {
    const data = await axios.get('/users/me');
    return data.data;
  } catch (error) {
    throw new Error('Failed to fetch profile');
  }
};
