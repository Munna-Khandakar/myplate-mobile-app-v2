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
import {NavigationProp} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import SecondaryActionButton from '../../components/SecondaryActionButton';
import MainActionButton from '../../components/MainActionButton';
import useAuthStore from '../../stores/authStore';
import {COLORS} from '../../utils/Colors';
import InputField from '../../components/common/InputField';
import {LoginFormInputs} from '../../types/login/LoginFormInputs';

type LoginScreenProps = {
  navigation: NavigationProp<Record<string, object | undefined>, string>;
};
const LoginScreen = (props: LoginScreenProps) => {
  const {navigation} = props;

  const storeUserToken = useAuthStore(state => state.storeUserToken);
  const storeUser = useAuthStore(state => state.storeUser);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormInputs>({
    defaultValues: {
      phone: '01794807577',
      password: '1234',
    },
  });

  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const getMyProfile = async (token: string) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.get(`/users/me`);
      storeUser(res);
      console.log({res});
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // @ts-ignore
  const onSubmit = async data => {
    try {
      const res = await axios.post(`/login`, data);
      // @ts-ignore
      if (res.statusCode !== 201) {
        // @ts-ignore
        return showToast('error', res.error, res.message);
      }
      // @ts-ignore
      if (res.statusCode == 201) {
        const token = res.data.token;
        AsyncStorage.setItem('user_token', token);
        storeUserToken(token);
        await getMyProfile(token);
      }
    } catch (error) {
      // @ts-ignore
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
            name="phone"
          />
          {errors.phone && (
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
                // @ts-ignore
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
