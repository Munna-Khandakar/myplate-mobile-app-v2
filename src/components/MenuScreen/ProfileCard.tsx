import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import useSWR from 'swr';
import {COLORS} from '../../utils/Colors';
import {getMyProfile} from '../../requests/auth';

const ProfileCard = () => {
  const navigation = useNavigation();

  const {data, isLoading, error} = useSWR('/user/me', getMyProfile);

  if (isLoading) {
    return <Text style={{color: COLORS.main}}>Loading...</Text>;
  }

  if (error) {
    return <Text style={{color: COLORS.main}}>Error</Text>;
  }

  return (
    <TouchableOpacity
      style={styles.profile}
      //@ts-ignore
      onPress={() => navigation.navigate('MyProfileScreen')}>
      <Image
        style={styles.profileImage}
        source={
          data?.profilePicture
            ? data?.profilePicture
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
          {data?.username}
        </Text>
        <Text
          style={{
            color: COLORS.textColorSecondary,
            fontSize: 12,
          }}>
          {data?.phone}
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
