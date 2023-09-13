import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogin} from '../../requests/auth';
import Toast from 'react-native-toast-message';
import useAuthStore from '../../stores/authStore';
import COLORS from '../../utils/Colors';
import SecondaryActionButton from '../../components/SecondaryActionButton';
import MainActionButton from '../../components/MainActionButton';

const LoginScreen = ({navigation}) => {
  const [username, setUserName] = useState('01794807577');
  const [password, setPassword] = useState('11111111');
  const [seePassword, setSeePassword] = useState(false);
  // const user_token = useAuthStore(state => state.user_token);
  const storeUserToken = useAuthStore(state => state.storeUserToken);

  useEffect(() => {
    AsyncStorage.getItem('user_token').then(value => {
      if (value) {
        storeUserToken(value);
      }
    });
  }, []);

  const handleSubmitPress = async () => {
    const payload = {username, password};
    try {
      const login = await userLogin(payload);
      if (login?.status == 204) {
        showToast(
          'error',
          'Invalid Credentials',
          'The username or password you have entered is invalid',
        );
      } else if (login?.status == 404) {
        showToast(
          'error',
          'Something Went Wrong',
          'Something Went Wrong,Please try later',
        );
      } else if (login?.status == 201) {
        //login successfull
        AsyncStorage.setItem('user_token', login?.data?.token);
        storeUserToken(login?.data?.token);
      } else {
        showToast(
          'error',
          'Something Went Wrong',
          'Invalid Credentials or Server Issue',
        );
      }
    } catch (error) {
      showToast(
        'error',
        'Something Went Wrong',
        'Something Went Wrong,Please try later',
      );
    }
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 10}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/main-logo.png')}
            style={{
              height: 150,
              width: 150,
              resizeMode: 'stretch',
              marginBottom: 20,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            marginBottom: 30,
            textAlign: 'left',
            color: COLORS.main,
          }}>
          Login
        </Text>
        <KeyboardAvoidingView enabled>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}>
            <Image
              source={require('../../assets/user.png')}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'stretch',
                marginRight: 5,
              }}
            />
            <TextInput
              placeholder="username"
              style={{flex: 1, paddingVertical: 0, color: COLORS.main}}
              value={username}
              onChangeText={txt => setUserName(txt)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
            }}>
            <Image
              source={require('../../assets/password.png')}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'stretch',
                marginRight: 5,
              }}
            />
            <TextInput
              placeholder="password"
              style={{flex: 1, paddingVertical: 0, color: COLORS.main}}
              secureTextEntry={!seePassword}
              value={password}
              onChangeText={pass => setPassword(pass)}
            />
            <TouchableOpacity
              onPress={() => {
                setSeePassword(state => !state);
              }}>
              {seePassword ? (
                <Image
                  source={require('../../assets/eye-on.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'stretch',
                    marginRight: 5,
                  }}
                />
              ) : (
                <Image
                  source={require('../../assets/eye-off.png')}
                  style={{
                    height: 20,
                    width: 20,
                    resizeMode: 'stretch',
                    marginRight: 5,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
      {/*buttons */}
      <View style={{flexDirection: 'row', width: '100%'}}>
        <SecondaryActionButton
          pressHandler={() => {
            navigation.navigate('ForgetPasswordScreen');
          }}
          text="Forget?"
        />
        <MainActionButton pressHandler={handleSubmitPress} text="Login" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          color: COLORS.main,
        }}>
        <Text>New to the app?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RegistrationScreen');
          }}>
          <Text style={{color: COLORS.main, fontWeight: '700'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({});
