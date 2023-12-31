import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import SecondaryActionButton from '../../components/SecondaryActionButton';
import MainActionButton from '../../components/MainActionButton';
import useAuthStore from '../../stores/authStore';
import COLORS from '../../utils/Colors';
import InputField from '../../components/common/InputField';

const LoginScreen = ({navigation}) => {
  const storeUserToken = useAuthStore(state => state.storeUserToken);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: 'user01@gmail.com',
      password: '1234',
    },
  });

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const onSubmit = async data => {
    try {
      const res = await axios.post(`/login`, data);
      if (res.statusCode !== 201) {
        return showToast('error', res.error, res.message);
      }
      if (res.statusCode == 201) {
        const token = res.data.token;
        AsyncStorage.setItem('user_token', token);
        storeUserToken(token);
      }
    } catch (error) {
      showToast('error', error.error, error.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View>
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
            paddingHorizontal: 10,
          }}>
          Login
        </Text>
        <KeyboardAvoidingView enabled>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                label="Phone"
                placeholder="01XXXXXXXXX"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text style={styles.errorMessage}>This is required.</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputField
                placeholder="password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Password"
                isPassword
                togglePasswordVisibility={isVisible =>
                  console.log('Password visibility:', isVisible)
                }
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.errorMessage}>This is required.</Text>
          )}
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
        <MainActionButton pressHandler={handleSubmit(onSubmit)} text="Login" />
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

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});
