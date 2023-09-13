import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomerScreen from '../screens/app/CustomerScreen';

const Stack = createNativeStackNavigator();

const CustomerOrderStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="CustomerOrder"
          component={CustomerScreen}
          options={{title: 'CustomerOrder', headerShown: false}}
        />
        {/* <Stack.Screen name="Profile" component={SettingsScreen} /> */}
      </Stack.Navigator>
    </>
  );
};

export default CustomerOrderStack;
