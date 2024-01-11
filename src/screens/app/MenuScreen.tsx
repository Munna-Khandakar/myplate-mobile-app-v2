import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/Colors';
import {useNavigation} from '@react-navigation/native';
import MainActionButton from '../../components/MainActionButton';
import useAuthStore from '../../stores/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuItem from '../../components/MenuScreen/MenuItem';
import ProfileCard from '../../components/MenuScreen/ProfileCard';

const MenuScreen = () => {
  const navigation = useNavigation();
  const storeLogoutHandler = useAuthStore(state => state.logout);

  // logout
  const logoutHandler = () => {
    AsyncStorage.removeItem('user_token');
    storeLogoutHandler();
  };
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ProfileCard />
      <ScrollView>
        <MenuItem
          title={'My Posts'}
          subTitle={'Posts you posted on your timeline'}
          icon={require('../../assets/icons/review.png')}
          //@ts-ignore
          pressHandler={() => navigation.navigate('MyPosts')}
        />
        <MenuItem
          title={'My Orders'}
          subTitle={'Orders you placed to buy from a host'}
          icon={require('../../assets/icons/my-order.png')}
          //@ts-ignore
          pressHandler={() => navigation.navigate('MyOrders')}
        />
        <MenuItem
          title={'My Delivery'}
          subTitle={'Your delivery system tasks'}
          icon={require('../../assets/icons/delivery-man.png')}
          //@ts-ignore
          pressHandler={() => navigation.navigate('Delivery')}
        />

        <MenuItem
          title={'Customer Orders'}
          subTitle={'Orders you need to prepare for your customers'}
          icon={require('../../assets/icons/customer-order.png')}
          //@ts-ignore
          pressHandler={() => navigation.navigate('Customerorders')}
        />

        <MenuItem
          title={'My Addresses'}
          subTitle={'Add and select your address'}
          icon={require('../../assets/icons/location.png')}
          //@ts-ignore
          pressHandler={() => navigation.navigate('MyAddress')}
        />
      </ScrollView>

      <View style={{flexDirection: 'row', width: '100%', marginBottom: 15}}>
        <MainActionButton text={`Logout`} pressHandler={logoutHandler} />
      </View>
    </View>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 100,
    borderBottomColor: COLORS.tranparenSecondary,
    borderBottomWidth: 1,
  },
  profileImage: {
    height: 70,
    width: 70,
    marginLeft: 10,
    borderRadius: 10,
  },
  profileTextContainer: {
    paddingLeft: 5,
  },
  menuItemContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 10,
    width: '100%',
  },
  MenuItemTitle: {
    fontSize: 15,
    color: COLORS.main,
  },
  MenuItemSubTitle: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  PostCardButtonContainer: {
    margin: 10,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  PostCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
  },
  SingleLine: {
    width: '100%',
    borderBottomColor: COLORS.tranparenSecondary,
    borderBottomWidth: 1,
    marginTop: 10,
  },
});
