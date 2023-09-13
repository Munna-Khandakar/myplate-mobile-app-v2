import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './src/stacks/AppStack';
import AuthStack from './src/stacks/AuthStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {COLORS} from './src/utils/Colors';
import Toast from 'react-native-toast-message';
import useAuthStore from './src/stores/authStore';

const App = () => {
  const user_token = useAuthStore(state => state.user_token);

  return (
    <SafeAreaProvider style={{backgroundColor: COLORS.backgroundColor}}>
      <NavigationContainer>
        {user_token ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
