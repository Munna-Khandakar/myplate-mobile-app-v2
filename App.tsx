import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/stacks/AppStack';
import AuthStack from './src/stacks/AuthStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {COLORS} from './src/utils/Colors';
import Toast from 'react-native-toast-message';
import useAuthStore from './src/stores/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const storeUserToken = useAuthStore(state => state.storeUserToken);
  const [token, setToken] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('user_token')
      .then(user_token => {
        if (user_token) {
          console.log('token received');
          setToken(user_token);
          storeUserToken(user_token);
        } else {
          console.warn('APP=>Token not found in storage');
        }
      })
      .catch(error => {
        console.error('Error retrieving token from storage:', error);
      });
  }, [token]);

  return (
    <SafeAreaProvider style={{backgroundColor: COLORS.backgroundColor}}>
      <NavigationContainer>
        {token ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
