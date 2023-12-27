import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
} from 'react-native';
import {COLORS} from '../../utils/Colors';
import {getAddress} from '../../requests/address';
import {AddressType} from '../../types/AddressType';

const ADDRESSES = [
  {
    id: '1',
    title: 'Home Address',
    selected: false,
    description: 'House 143/A, Mirpur DOHS, Dhaka',
  },
  {
    id: '2',
    title: 'Home Address - 2',
    selected: true,
    description:
      'House 143/A, Mirpur DOHS, Dhaka House 143/A, Mirpur DOHS, Dhaka House 143/A, Mirpur DOHS, Dhaka',
  },
];

const AddressScreen = () => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const editImg: ImageSourcePropType = require('./../../assets/icons/camera.png');

  useEffect(() => {
    async function fetchAddress() {
      const data = await getAddress();
      console.log(data);
      setAddresses(data);
    }

    fetchAddress();
  }, []);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handleEditPress = (addressId: string) => {
    // Implement the edit functionality here
    console.log(`Edit pressed for address with ID: ${addressId}`);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.main}}>
          Select Your Address
        </Text>
        <Text style={{color: COLORS.main}}>
          selected address will be added to delivery address
        </Text>
      </View>
      {addresses &&
        addresses.map(address => (
          <View
            key={address._id}
            style={[
              styles.addressCardContainer,
              selectedAddress === address._id && styles.selected,
            ]}>
            <TouchableOpacity
              onPress={() => {
                handleAddressSelect(address._id);
              }}
              style={[styles.addressCard]}>
              <Text style={styles.title}>{address.title}</Text>
              <Text>{address.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEditPress(address._id)}
              style={styles.editButton}>
              <Image
                source={editImg}
                style={{height: 30, width: 30, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addressCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    flex: 1,
  },
  addressCard: {
    flex: 1,
  },
  editButton: {
    marginLeft: 5,
    padding: 5,
    borderRadius: 3,
    backgroundColor: '#eeddae',
    marginStart: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.main,
  },
  selected: {
    borderStartWidth: 3,
    borderLeftColor: COLORS.main,
    backgroundColor: COLORS.tranparenSecondary,
  },
});

export default AddressScreen;
