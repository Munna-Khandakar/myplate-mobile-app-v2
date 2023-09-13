/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../utils/Colors';
import SecondaryActionButton from '../../components/SecondaryActionButton';
import MainActionButton from '../../components/MainActionButton';
import {fetchMyOrders} from '../../requests/plates';

const RowTitle = ({icon, text}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
    <Image source={icon} style={{height: 25, width: 25, resizeMode: 'cover'}} />
    <Text style={styles.RowTitleText}>{text}</Text>
  </View>
);

const MyOrderCard = ({
  plateName,
  plateImage,
  hostName,
  hostPhone,
  price,
  status,
}) => {
  return (
    <View style={styles.CustomerOrderCardContainer}>
      <View style={styles.CustomerOrderCard}>
        <Image
          source={{
            uri: plateImage,
          }}
          style={styles.CustomerOrderCardImage}
        />
        <View style={{flex: 3, marginLeft: 5}}>
          <RowTitle
            icon={require('../../assets/icons/plate-name.png')}
            text={plateName}
          />
          <RowTitle
            icon={require('../../assets/icons/chef.png')}
            text={hostName}
          />
          <RowTitle
            icon={require('../../assets/icons/telephone.png')}
            text={hostPhone}
          />
          <RowTitle
            icon={require('../../assets/icons/taka.png')}
            text={`${price} BDT (delivery charge includded )`}
          />
          <RowTitle
            icon={require('../../assets/icons/hourglass.png')}
            text={status}
          />
        </View>
      </View>
    </View>
  );
};

const MyOrdersScreen = () => {
  const [myOrders, setMyOrders] = useState(null);
  const getMyOrders = async () => {
    const data = await fetchMyOrders();
    setMyOrders(data);
  };
  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <View>
      {myOrders?.length > 0 ? (
        <FlatList
          data={myOrders}
          renderItem={order => (
            <MyOrderCard
              plateName={order?.item?.plate_info?.plate_name}
              plateImage={order?.item?.plate_info?.plate_images[0]}
              hostName={order?.item?.host_info?.name}
              hostPhone={order?.item?.host_info?.phone}
              price={order?.item?.total_price}
              status={order?.item?.order_status}
            />
          )}
          keyExtractor={order => order.id}
        />
      ) : (
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/noItem1.png')}
            style={{
              height: 400,
              width: 400,
              resizeMode: 'contain',
            }}
          />
          <Text>Empty Orders</Text>
        </View>
      )}
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  CustomerOrderCardContainer: {
    borderColor: COLORS.tranparenSecondary,
    borderWidth: 1,
    marginBottom: 10,
  },
  CustomerOrderCard: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
  },
  CustomerOrderCardImage: {
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    flex: 1,
  },
  RowTitleText: {
    fontSize: 15,
    color: COLORS.main,
    marginRight: 10,
    textAlign: 'auto',
    marginLeft: 10,
  },
});
