import * as React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from '../components/Header';
import HomeStack from './HomeStack';
import DeliveryStack from './DeliveryStack';
import VideoStack from './VideoStack';
import HostStack from './HostStack';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {COLORS} from '../utils/Colors';
import MenuStack from './MenuStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomerOrderStack from './CustomerOrderStack';
import MyOrderStack from './MyOrdersStack';
import MyProfileScreen from '../screens/app/MyProfileScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigationStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabel: () => null,
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.main,
        },
        tabBarStyle: {
          backgroundColor: COLORS.backgroundColor,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/active/direction.png')
                  : require('../assets/icons/direction.png')
              }
              style={[styles.navItem, {borderRadius: focused ? 50 : 0}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Host"
        component={HostStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/active/plus.png')
                  : require('../assets/icons/plus.png')
              }
              style={[styles.navItem, {borderRadius: focused ? 50 : 0}]}
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Delivery"
        component={DeliveryStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/active/delivery-man.png')
                  : require('../assets/icons/delivery-man.png')
              }
              style={[styles.navItem, {borderRadius: focused ? 10 : 0}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Video"
        component={VideoStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/active/play.png')
                  : require('../assets/icons/play.png')
              }
              style={[styles.navItem, {borderRadius: focused ? 50 : 0}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? require('../assets/icons/active/menu.png')
                  : require('../assets/icons/menu.png')
              }
              style={[styles.navItem, {borderRadius: focused ? 50 : 0}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const AppStack = () => {
  return (
    <>
      <SafeAreaView>
        <Header />
      </SafeAreaView>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: COLORS.backgroundColor},
        }}>
        <Stack.Screen
          name="Main"
          component={TabNavigationStack}
          options={{title: 'Main', headerShown: false}}
        />
        <Stack.Screen
          name="Customerorders"
          component={CustomerOrderStack}
          options={{
            title: 'Customer Orders',
          }}
        />
        <Stack.Screen
          name="MyOrders"
          component={MyOrderStack}
          options={{title: 'My Orders'}}
        />
        <Stack.Screen
          name="MyProfileScreen"
          component={MyProfileScreen}
          options={{title: 'My Profile', headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  navItem: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
