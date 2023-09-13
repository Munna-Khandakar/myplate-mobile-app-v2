/* eslint-disable react-native/no-inline-styles */
import {ScrollView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../utils/Requests';
import DeliveryCard from '../../components/Screens/OwnDeliveryScreen/DeliveryCard';

const DeliveryScreen = ({navigation}) => {
  const [myDeliveryOrders, setMyDeliveryOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getOwnDeliveryOrders = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('user_token');

    if (token) {
      fetch(`${API_URL}/own-delivery-orders`, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(res => res.json())
        .then(result => {
          setMyDeliveryOrders(result);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getOwnDeliveryOrders();
    });
    return focusHandler;
  }, [navigation]);

  if (loading) {
    return <Text>Loading....</Text>;
  }
  return (
    <ScrollView>
      {Array.isArray(myDeliveryOrders) && myDeliveryOrders?.length > 0 ? (
        myDeliveryOrders.map((order, index) => (
          <DeliveryCard order={order} key={index} />
        ))
      ) : (
        <Text>no order</Text>
      )}
    </ScrollView>
  );
};

export default DeliveryScreen;
