import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/Colors';
import {NavigationProp} from '@react-navigation/native';
import useAuthStore from '../../stores/authStore';

type ProfileCardProps = {
  navigation: NavigationProp<Record<string, object | undefined>, string>;
};
const ProfileCard = (props: ProfileCardProps) => {
  const {navigation} = props;
  const user = useAuthStore(state => state.user);

  return (
    <TouchableOpacity
      style={styles.profile}
      onPress={() => navigation.navigate('MyProfileScreen')}>
      <Image
        style={styles.profileImage}
        source={
          user?.userId?.profile_image
            ? user?.userId?.profile_image
            : require('../../assets/user-icon.png')
        }
      />
      <View style={styles.profileTextContainer}>
        <Text
          style={{
            color: COLORS.main,
            fontSize: 20,
            fontWeight: 'bold',
          }}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {user?.userId?.name}
        </Text>
        <Text
          style={{
            color: COLORS.textColorSecondary,
            fontSize: 12,
          }}>
          {user?.userId?.myPromoCode}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;

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
});
