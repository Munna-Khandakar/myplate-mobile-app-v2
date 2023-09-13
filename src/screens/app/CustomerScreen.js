import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/Colors';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
import {API_URL} from '../../utils/Requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomerOrderCard from '../../components/CustomerOrderCard';

const CustomerScreen = ({navigation}) => {
  const [customerOrders, setCustomerOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyOrders = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('user_token');
    if (token) {
      fetch(`${API_URL}/customer-orders`, {
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then(res => res.json())
        .then(result => {
          setCustomerOrders(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getMyOrders();
    });
    return focusHandler;
  }, [navigation]);

  if (loading) {
    return <Text style={{textAlign: 'center', marginTop: 30}}>Loading</Text>;
  } else if (customerOrders?.length == 0) {
    return (
      <Text style={{textAlign: 'center', marginTop: 30}}>No Order Found</Text>
    );
  }
  return (
    <ScrollView>
      {customerOrders?.map((order, index) => {
        return <CustomerOrderCard order={order} key={index} />;
      })}
    </ScrollView>
  );
};

export default CustomerScreen;
