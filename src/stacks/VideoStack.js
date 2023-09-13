import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/app/HomeScreen';
import VideoScreen from '../screens/app/VideoScreen';

const Stack = createNativeStackNavigator();

const VideoStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="VideoScreen"
          component={VideoScreen}
          options={{title: 'Explore', headerShown: false}}
        />
        {/* <Stack.Screen name="Profile" component={SettingsScreen} /> */}
      </Stack.Navigator>
    </>
  );
};

export default VideoStack;
