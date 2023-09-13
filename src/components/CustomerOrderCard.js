import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import SecondaryActionButton from './SecondaryActionButton';
import MainActionButton from './MainActionButton';

const RowTitle = ({icon, text}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
    <Image source={icon} style={{height: 25, width: 25, resizeMode: 'cover'}} />
    <Text style={styles.RowTitleText}>{text}</Text>
  </View>
);

const CustomerOrderCard = ({order}) => {
  return (
    <View style={styles.CustomerOrderCardContainer}>
      <View style={styles.CustomerOrderCard}>
        <Image
          source={{
            uri: `${order?.plate_info?.plate_images[0]}`,
            // uri: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/sirloin_steak-bb0433d.jpg?quality=90&resize=768,574',
          }}
          style={styles.CustomerOrderCardImage}
        />
        <View style={{flex: 3, marginLeft: 5}}>
          <RowTitle
            icon={require('../assets/icons/plate-name.png')}
            text={order?.plate_info?.plate_name}
          />
          <RowTitle
            icon={require('../assets/icons/user.png')}
            text={order?.order_user?.name}
          />
          <RowTitle
            icon={require('../assets/icons/telephone.png')}
            text={order?.order_user?.phone}
          />
          {order?.note && (
            <RowTitle
              icon={require('../assets/icons/note.png')}
              text={order?.note}
            />
          )}
        </View>
      </View>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <SecondaryActionButton pressHandler={() => {}} text="Cancel" />
        <MainActionButton pressHandler={() => {}} text="Confirm" />
      </View>
    </View>
  );
};

export default CustomerOrderCard;

const styles = StyleSheet.create({
  CustomerOrderCardContainer: {
    borderColor: COLORS.tranparenSecondary,
    borderWidth: 1,
    marginBottom: 10,
  },
  CustomerOrderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 10,
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
