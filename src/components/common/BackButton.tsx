import {Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{marginEnd: 15}}>
      <Image
        source={require('./../../assets/icons/back.png')}
        style={{height: 20, width: 20, resizeMode: 'contain'}}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
