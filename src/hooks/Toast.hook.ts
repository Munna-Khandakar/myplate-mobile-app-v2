// Toast.hook.ts
import {useEffect} from 'react';
import Toast from 'react-native-toast-message';

export const useToast = () => {
  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({type, text1, text2});
  };

  return {showToast};
};
