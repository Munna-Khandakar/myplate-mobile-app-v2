import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MyProfileInput from './MyProfileInput';
import {COLORS} from '../../utils/Colors';
import {useState} from 'react';
import MainActionButton from '../MainActionButton';
import useAuthStore from '../../stores/authStore';
import {useEffect} from 'react';
import Axios from 'axios';
import {fetchMyProfile} from '../../requests/auth';
import {API_URL} from '../../utils/Requests';

const MyProfileScreen = () => {
  const [editStatus, setEditStatus] = useState(false);
  const user = useAuthStore(state => state.user);
  const user_token = useAuthStore(state => state.user_token);
  const storeUser = useAuthStore(state => state.storeUser);
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    address: '',
    gender: '',
    myPromo: '',
    myQuota: '',
    myClient: '',
  });

  useEffect(() => {
    setUserData({
      name: user?.userId?.name,
      phone: user?.userId?.phone,
      address: user?.address,
      gender: user?.gender || 'female',
      myPromo: user?.userId?.myPromoCode,
      myQuota: user?.userId?.myQuota,
      myClient: user?.userId?.myRefClients.length,
    });
  }, [user]);

  const getMyProfile = async () => {
    const myProfile = await fetchMyProfile();
    storeUser(myProfile);
  };

  const handleSubmit = () => {
    setEditStatus(false);
    let data = {
      address: userData.address,
      gender: userData.gender,
      name: userData.name,
    };

    Axios.put(`${API_URL}/update-my-profile-info`, data, {
      headers: {
        Authorization: 'Bearer ' + user_token,
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        if (result.data.success) {
          getMyProfile();
        } else {
          console.log('Something went wrong');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{padding: 2}}>
        <TouchableOpacity>
          <View
            style={{
              borderColor: COLORS.main,
              borderWidth: 2,
              borderRadius: 100,
              width: 110,
              height: 110,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <Image
              source={require('../../assets/user.png')}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-end',
            borderRadius: 5,
            backgroundColor: editStatus ? 'white' : COLORS.main,
            padding: 5,
            borderColor: COLORS.main,
            borderWidth: 1,
          }}
          onPress={() => setEditStatus(!editStatus)}>
          <Text style={{color: editStatus ? COLORS.main : 'white'}}>
            EDIT PROFILE
          </Text>
        </TouchableOpacity>
        <MyProfileInput
          label="Name"
          onChangeText={txt => {
            setUserData(prevData => ({
              ...prevData,
              name: txt,
            }));
          }}
          value={userData.name}
          edit={editStatus}
        />
        <MyProfileInput label="Phone" value={userData.phone} />

        <MyProfileInput
          label="Address"
          onChangeText={txt => {
            setUserData(prevData => ({
              ...prevData,
              address: txt,
            }));
          }}
          value={userData.address}
          edit={editStatus}
        />
        <MyProfileInput
          label="Gender"
          value={userData.gender}
          edit={editStatus}
          onChangeText={txt => {
            setUserData(prevData => ({
              ...prevData,
              gender: txt,
            }));
          }}
        />
        <MyProfileInput label="My Promo" value={userData.myPromo} />
        <MyProfileInput label="My Quota" value={userData.myQuota.toString()} />
        <MyProfileInput
          label="My Client"
          value={userData.myClient.toString()}
        />

        {editStatus && (
          <MainActionButton pressHandler={handleSubmit} text="Update" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({});
