import axios from 'axios';

export const getCategory = async () => {
  try {
    const res = await axios.get('/category');
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
