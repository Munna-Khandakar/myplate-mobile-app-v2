import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuScreen from '../screens/app/MenuScreen';

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
      </Stack.Navigator>
    </>
  );
};

export default MenuStack;
