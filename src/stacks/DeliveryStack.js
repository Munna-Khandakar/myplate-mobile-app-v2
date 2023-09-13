import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/app/HomeScreen';
import DeliveryScreen from '../screens/app/DeliveryScreen';

const Stack = createNativeStackNavigator();

const DeliveryStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="DeliveryScreen"
          component={DeliveryScreen}
          options={{title: 'Delivery', headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default DeliveryStack;
