import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyOrdersScreen from '../screens/app/MyOrdersScreen';

const Stack = createNativeStackNavigator();

const MyOrderStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="MyOrder"
          component={MyOrdersScreen}
          options={{title: 'MyOrder', headerShown: false}}
        />
        {/* <Stack.Screen name="Profile" component={SettingsScreen} /> */}
      </Stack.Navigator>
    </>
  );
};

export default MyOrderStack;
