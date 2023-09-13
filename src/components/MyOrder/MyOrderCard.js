import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RowTitle = ({icon, text}) => (
  <View style={{flexDirection: 'row', alignItems: 'center', margin: 5}}>
    <Image source={icon} style={{height: 25, width: 25, resizeMode: 'cover'}} />
    <Text style={styles.RowTitleText}>{text}</Text>
  </View>
);

export default function MyOrderCard({
  plateName,
  plateImage,
  hostName,
  hostPhone,
  price,
  status,
}) {
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
}

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
