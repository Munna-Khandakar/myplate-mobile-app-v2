import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HostScreen from '../screens/app/HostScreen';

const Stack = createNativeStackNavigator();

const HostStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="HostScreen"
          component={HostScreen}
          options={{title: 'Host Plate', headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default HostStack;
