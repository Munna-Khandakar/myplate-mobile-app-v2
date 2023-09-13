import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../utils/Colors';
import SecondaryActionButton from '../../components/SecondaryActionButton';
import MainActionButton from '../../components/MainActionButton';
import FormInputField from '../../components/common/FormInputField';
import {userRegistration, verifyUser} from '../../requests/auth';
import Toast from 'react-native-toast-message';
import {API_URL} from '../../utils/Requests';
import axios from 'axios';

const RegistrationScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [username, setUsername] = useState('munna');
  const [password, setPassword] = useState('11111111');
  const [confirmPassword, setConfirmPassword] = useState('11111111');
  const [mobile, setMobile] = useState('01794807577');
  const [otp, setOtp] = useState('123212');
  const [promo, setPromo] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const handleFormSubmit = async () => {
    if (password !== confirmPassword) {
      showToast(
        'error',
        'Check Your Passwords',
        'Password and Confirm Password not matched',
      );
    }
    const payload = {
      name: username,
      phone: mobile,
      otp_code: otp,
      password,
      promoCode: promo,
      registerBy: 'phone',
    };

    axios
      .post(`${API_URL}/register`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('response', response.data);
        showToast(
          'success',
          'Congratulations',
          'Your account is created,Login to procceed',
        );
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        showToast('error', 'Invalid Credentials', error.response.data.error);
      });
  };

  //async await verification code sender function
  const verificationCodeHandler = async () => {
    let only_phone_number = 0;
    setIsLoading(true);
    let verifyData;
    const phone = mobile;
    if (!phone) {
      setIsLoading(false);
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
        setIsLoading(false);
        return showToast(
          'error',
          'Invalid Phone Number',
          'Please Provide a valid Phone Number length',
        );
      }
    }

    verifyData = {
      value: only_phone_number,
      registerBy: 'phone',
    };

    axios
      .post(`${API_URL}/verify`, verifyData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('response', response);
        setIsLoading(false);
        setIsDisable(true);
        wait3min();
        showToast('success', 'Invalid Credentials', response?.data?.success);
      })
      .catch(error => {
        setIsLoading(false);
        setIsDisable(false);
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
          Registration
        </Text>

        <FormInputField
          icon={require('../../assets/user.png')}
          placeholder="username"
          value={username}
          onChangeHandlar={txt => setUsername(txt)}
        />
        <FormInputField
          icon={require('../../assets/password.png')}
          placeholder="password"
          value={password}
          onChangeHandlar={password => setPassword(password)}
          secureTextEntry={!seePassword}>
          <TouchableOpacity
            onPress={() => {
              setSeePassword(p => !p);
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
        </FormInputField>
        <FormInputField
          icon={require('../../assets/password.png')}
          placeholder="confirm password"
          value={confirmPassword}
          onChangeHandlar={password => setConfirmPassword(password)}
          secureTextEntry={!seeConfirmPassword}>
          <TouchableOpacity
            onPress={() => {
              setSeeConfirmPassword(p => !p);
            }}>
            {seeConfirmPassword ? (
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
        </FormInputField>
        <FormInputField
          icon={require('../../assets/icons/telephone.png')}
          placeholder="mobile"
          value={mobile}
          onChangeHandlar={txt => setMobile(txt)}>
          <View>
            <TouchableOpacity
              disabled={isDisable}
              onPress={verificationCodeHandler}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={COLORS.main} />
              ) : (
                <Text
                  style={{
                    color: `${
                      isDisable ? COLORS.secureTextEntry : COLORS.main
                    }`,
                  }}>
                  Send OTP
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </FormInputField>
        <FormInputField
          icon={require('../../assets/icons/otp.png')}
          placeholder="otp code"
          value={otp}
          onChangeHandlar={txt => setOtp(txt)}
        />
        <FormInputField
          icon={require('../../assets/icons/promotion.png')}
          placeholder="promo code"
          value={promo}
          onChangeHandlar={txt => setPromo(txt)}
        />
      </View>

      {/*buttons */}
      <View style={{flexDirection: 'row', width: '100%'}}>
        <SecondaryActionButton
          pressHandler={() => {
            navigation.goBack();
          }}
          text="Back?"
        />
        <MainActionButton pressHandler={handleFormSubmit} text="Register" />
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

const styles = StyleSheet.create({});
