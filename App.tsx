import React, {useEffect} from 'react';
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
  const userToken = useAuthStore(state => state.user_token);

  useEffect(() => {
    AsyncStorage.getItem('user_token')
      .then(user_token => {
        if (user_token) {
          storeUserToken(user_token);
        }
      })
      .catch(error => {
        console.error('Error retrieving token from storage:', error);
      });
  }, [userToken]);

  return (
    <SafeAreaProvider style={{backgroundColor: COLORS.backgroundColor}}>
      <NavigationContainer>
        {userToken ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
