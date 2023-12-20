import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../utils/Colors';
import SecondaryActionButton from '../../components/SecondaryActionButton';
import MainActionButton from '../../components/MainActionButton';
import Toast from 'react-native-toast-message';
import {API_URL} from '../../utils/Requests';
import axios from 'axios';
import InputField from '../../components/common/InputField';
import {useForm, Controller} from 'react-hook-form';

const RegistrationScreen = ({navigation}) => {
  const [mobile, setMobile] = useState('');
  const [verifiedPhone, setVerifiedPhone] = useState(true);
  const [isDiasble, setIsDisable] = useState(false);

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      phone: '01794807577',
      otp: '',
    },
  });

  const onSubmit = data => {
    axios
      .post(`${API_URL}/register`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        showToast(
          'success',
          response.data.message,
          response?.data?.data?.message,
        );
        console.log(response.data);
        if (response.data.message == 'Success') {
          reset();
          navigation.navigate('LoginScreen');
        }
      })
      .catch(error => {
        showToast(
          'error',
          error.response.data.message,
          error.response.data.error,
        );
      });
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  //async await verification code sender function
  const verificationCodeHandler = async () => {
    let only_phone_number = 0;
    const phone = mobile;
    if (!phone) {
      return showToast(
        'error',
        "Phone Number can't be empty",
        'Please Provide Your Phone Number',
      );
    }

    if (phone) {
      // regualr expression checking to remove country code and extra spaces and dash
      only_phone_number = phone.replace(/\D/g, '').slice(-11);
      if (only_phone_number.length !== 11) {
        return showToast(
          'error',
          'Invalid Phone Number',
          'Please Provide a valid Phone Number length',
        );
      }
    }

    axios
      .post(
        `${API_URL}/otp`,
        {phone: only_phone_number},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log('response', response.data);
        wait3min();
        showToast('success', response.message, response?.data?.data?.message);
        if (response.message == 'Success') {
          setValue('phone', only_phone_number);
          setVerifiedPhone(true);
        }
      })
      .catch(error => {
        console.log({error: error.response.data});
        showToast('error', 'Invalid Credentials', error.response.data.error);
      });
  };

  //count down timer for verficiation code resend...
  const wait3min = () => {
    setTimeout(() => {
      setIsDisable(false);
    }, 180000);
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View>
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
            Registration
          </Text>
        </View>
        {!verifiedPhone ? (
          <View>
            <InputField
              label="Phone Number"
              placeholder="01XXXXXXXXX"
              onChangeText={setMobile}
              value={mobile}
            />

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <MainActionButton
                pressHandler={verificationCodeHandler}
                text="Send OTP"
              />
            </View>
          </View>
        ) : (
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label="User Name"
                  placeholder="User Name"
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
                  label="Password"
                  placeholder="password"
                  secureTextEntry={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errorMessage}>This is required.</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label="Confirm Password"
                  placeholder="confirm password"
                  secureTextEntry={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="confirmPassword"
            />
            {errors.password && (
              <Text style={styles.errorMessage}>This is required.</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <InputField
                  label="OTP"
                  placeholder="otp"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="otp"
            />
            {errors.otp && (
              <Text style={styles.errorMessage}>This is required.</Text>
            )}
            {/*buttons */}
            <View style={{flexDirection: 'row', width: '100%'}}>
              <SecondaryActionButton
                pressHandler={() => {
                  navigation.goBack();
                }}
                text="Back?"
              />
              <MainActionButton
                pressHandler={handleSubmit(onSubmit)}
                text="Register"
              />
            </View>
          </View>
        )}
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text>Already Registered?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}>
          <Text style={{color: COLORS.main, fontWeight: '700'}}> Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});
