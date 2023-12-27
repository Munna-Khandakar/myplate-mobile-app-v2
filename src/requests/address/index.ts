import axios from 'axios';

export const getAddress = async () => {
  try {
    const res = await axios.get('/address');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
