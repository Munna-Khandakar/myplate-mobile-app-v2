import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../assets/secondary-logo.png')}
          style={styles.logo}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconBg}
            onPress={() => navigation.navigate('Customerorders')}>
            <Image
              source={require('../assets/icons/customer-order.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBg}
            onPress={() => navigation.navigate('MyOrders')}>
            <Image
              source={require('../assets/icons/my-order.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="search myplate"
          placeholderTextColor={COLORS.secondary}
          onChangeText={() => {}}
        />
        <Image
          source={require('../assets/icons/enter.png')}
          style={styles.headerIcon}
        />
      </View> */}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: COLORS.backgroundColor,
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
  },
  headerIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconBg: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 50,
    backgroundColor: COLORS.tranparenSecondary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 5,
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
  },
  searchInput: {
    color: COLORS.main,
    fontSize: 15,
    width: '80%',
  },
});
