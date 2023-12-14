import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Button,
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
import InputField from '../../components/common/InputField';
import {useForm, Controller} from 'react-hook-form';

const RegistrationScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [mobile, setMobile] = useState('01794807577');
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = data => {
    console.log(data); // { name: 'John Doe', email: 'johndoe@example.com' }
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
      </View>

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
