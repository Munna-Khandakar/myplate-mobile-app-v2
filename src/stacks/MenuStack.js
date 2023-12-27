import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuScreen from '../screens/app/MenuScreen';
import AddressScreen from '../screens/app/AddressScreen';

const Stack = createNativeStackNavigator();

const MenuStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{title: 'Menu', headerShown: false}}
        />
        <Stack.Screen
          name="MyAddress"
          component={AddressScreen}
          options={{title: 'Address', headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default MenuStack;
