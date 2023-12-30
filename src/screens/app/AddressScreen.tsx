import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {COLORS} from '../../utils/Colors';
import {getAddress} from '../../requests/address';
import {AddressFormInputs, AddressType} from '../../types/AddressType';
import CustomModal from '../../components/common/CustomModal';
import {AddressForm} from '../../components/AddressForm';

const editIcon: ImageSourcePropType = require('./../../assets/icons/edit.png');
const deleteIcon: ImageSourcePropType = require('./../../assets/icons/delete.png');

const AddressScreen = () => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchAddress() {
      const data = await getAddress();
      setAddresses(data);
    }

    fetchAddress();
  }, []);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const handleEditPress = (addressId: string) => {
    setModalVisible(true);
  };

  const showDeleteAlert = (addressId: string) =>
    Alert.alert('Are you sure ?', 'You are going to delete this address', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteAddress(addressId)},
    ]);

  const deleteAddress = async (addressId: string) => {
    try {
      const res: any = await axios.delete(`/address/${addressId}`);
      showToast('success', res.message, 'Address Removed');
    } catch (error: any) {
      showToast('error', error.error, error.message);
    }
  };

  const onFormSubmit = async (data: AddressFormInputs) => {
    try {
      const res: any = await axios.post(`/address`, data);
      if (res.statusCode == 201) {
        showToast('success', res.message, 'Address Added');
      }
    } catch (error: any) {
      showToast('error', error.error, error.message);
    }
    setModalVisible(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.main}}>
          Your Address
        </Text>
        <Text style={{color: COLORS.main}}>click to add a new address</Text>
        <Text style={{alignSelf: 'flex-end'}}>+</Text>
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
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => handleEditPress(address._id)}
                style={styles.editButton}>
                <Image
                  source={editIcon}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showDeleteAlert(address._id)}
                style={styles.editButton}>
                <Image
                  source={deleteIcon}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

      <CustomModal
        onClose={() => {
          setModalVisible(false);
        }}
        isOpen={modalVisible}>
        <AddressForm
          onFormSubmit={onFormSubmit}
          closeForm={() => setModalVisible(false)}
        />
      </CustomModal>
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
    backgroundColor: COLORS.backgroundColor,
  },
  addressCard: {
    flex: 1,
  },
  editButton: {
    marginLeft: 5,
    padding: 5,
    borderRadius: 3,
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
