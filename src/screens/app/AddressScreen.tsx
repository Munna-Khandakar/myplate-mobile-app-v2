import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import useSWR from 'swr';
import {COLORS} from '../../utils/Colors';
import {getAddress} from '../../requests/address';
import {AddressFormInputs, AddressType} from '../../types/AddressType';
import CustomModal from '../../components/common/CustomModal';
import {AddressForm} from '../../components/AddressForm';

const editIcon: ImageSourcePropType = require('./../../assets/icons/edit.png');
const deleteIcon: ImageSourcePropType = require('./../../assets/icons/delete.png');
const plusIcon: ImageSourcePropType = require('./../../assets/icons/plus.png');
const backIcon: ImageSourcePropType = require('./../../assets/icons/back.png');

const AddressScreen = ({navigation}: {navigation: any}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressType>();

  const {data, error, isLoading, mutate} = useSWR<AddressType[]>(
    'address',
    getAddress,
  );

  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const handleEditPress = (address: AddressType) => {
    setSelectedAddress(address);
    setOpenEditModal(true);
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
      mutate();
    } catch (error: any) {
      showToast('error', error.error, error.message);
    }
  };

  const onFormSubmit = async (data: AddressFormInputs) => {
    try {
      const res: any = await axios.post(`/address`, data);
      showToast('success', res.message, 'Address Added');
      mutate();
    } catch (error: any) {
      showToast('error', error.error, error.message);
    }
    setModalVisible(false);
  };

  const onEditFormSubmit = async (data: AddressFormInputs) => {
    try {
      const res: any = await axios.put(
        `/address/${selectedAddress?._id}`,
        data,
      );
      showToast('success', res.message, 'Address Saved');
      mutate();
    } catch (error: any) {
      showToast('error', error.error, error.message);
    }
    setOpenEditModal(false);
  };

  if (error)
    return (
      <View>
        <Text>failed to load</Text>
      </View>
    );
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginEnd: 15}}>
            <Image
              source={backIcon}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', color: COLORS.main}}>
              Your Address
            </Text>
            <Text style={{color: COLORS.main}}>click to add a new address</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.button}>
          <Image
            source={plusIcon}
            style={{height: 20, width: 20, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
      {data && data.length > 0 ? (
        data.map(address => (
          <View key={address._id} style={styles.addressCardContainer}>
            <View style={[styles.addressCard]}>
              <Text style={styles.title}>{address.title}</Text>
              <Text>{address.description}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => handleEditPress(address)}
                style={styles.button}>
                <Image
                  source={editIcon}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showDeleteAlert(address._id)}
                style={styles.button}>
                <Image
                  source={deleteIcon}
                  style={{height: 20, width: 20, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[styles.button, {alignSelf: 'center', marginTop: 20}]}>
            <Image
              source={plusIcon}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
          <Text style={{textAlign: 'center', color: COLORS.main}}>
            No Saved Address.
          </Text>
          <Text style={{textAlign: 'center', color: COLORS.main}}>
            Click the plus button to add
          </Text>
        </View>
      )}
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
      <CustomModal
        onClose={() => {
          setOpenEditModal(false);
        }}
        isOpen={openEditModal}>
        <AddressForm
          data={selectedAddress}
          onFormSubmit={onEditFormSubmit}
          closeForm={() => setOpenEditModal(false)}
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
  button: {
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
