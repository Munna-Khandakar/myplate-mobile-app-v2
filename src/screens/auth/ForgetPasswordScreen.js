import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import COLORS from '../../utils/Colors';
import SecondaryActionButton from '../../components/SecondaryActionButton';
import MainActionButton from '../../components/MainActionButton';
import {API_URL} from '../../utils/Requests';

const ForgetPasswordScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const phoneNumberValidator = number => {
    let only_phone_number = 0;
    // regualr expression checking to remove country code and extra spaces and dash
    only_phone_number = number.replace(/\D/g, '').slice(-11);
    if (only_phone_number.length !== 11) {
      setLoading(false);
      return showToast(
        'error',
        'Invalid Phone Number',
        'Phone number format 01xxxxxxxxx',
      );
    }
    return only_phone_number;
  };

  //count down timer for verficiation code resend...
  const wait3min = () => {
    setTimeout(() => {
      setIsDisable(false);
    }, 180000);
  };

  const handleSubmitPress = async => {
    const phone_number = phoneNumberValidator(phone);
    if (phone_number) {
      let verifyData = {
        value: phone_number,
        registerBy: 'phone',
        verifyType: 'changePass',
      };

      fetch(`${API_URL}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verifyData),
      })
        .then(res => res.json())
        .then(result => {
          if (result.success) {
            setLoading(false);
            setIsDisable(true);
            wait3min();
            return showToast('success', 'OTP SENT', result.success);
          } else {
            setLoading(false);
            return showToast('error', 'Something Went Wrong', result.error);
          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          return showToast('error', 'Something Went Wrong', 'Please Try Later');
        });
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
          }}>
          Forget Password
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
              placeholder="Phone"
              style={{flex: 1, paddingVertical: 0, color: COLORS.main}}
              placeholderTextColor={COLORS.main}
              selectionColor={COLORS.main}
              value={phone}
              onChangeText={txt => setPhone(txt)}
            />
          </View>
        </KeyboardAvoidingView>
        {/*buttons */}
        <View style={{flexDirection: 'row', width: '100%'}}>
          <SecondaryActionButton
            pressHandler={() => {
              navigation.navigate('ForgetPasswordScreen');
            }}
            text="Back"
          />
          <MainActionButton pressHandler={handleSubmitPress} text="Send OTP" />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text>New to the app?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegistrationScreen');
            }}>
            <Text style={{color: COLORS.main, fontWeight: '700'}}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;
