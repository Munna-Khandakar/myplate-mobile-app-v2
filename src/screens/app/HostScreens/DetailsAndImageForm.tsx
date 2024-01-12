import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/Colors';
import TitleWithSubtitle from '../../../components/TitleWithSubtitle';
import {Controller, UseFormReturn} from 'react-hook-form';
import {HostPlateType} from '../../../types/HostPlateType';

type DetailsAndImageFormTypes = {
  form: UseFormReturn<HostPlateType, any, undefined>;
};

const IMG =
  'https://pinchofyum.com/wp-content/uploads/2014/07/poached-egg-toast-5.jpg';

export const DetailsAndImageForm = (props: DetailsAndImageFormTypes) => {
  const {form} = props;
  const {control, setValue, watch} = form;
  const hasImag = watch('images')[0];

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            backgroundColor: COLORS.tranparenSecondary,
            height: 40,
            width: 40,
            margin: 10,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../../../assets/host-plate-1.png')}
            style={{height: 25, width: 25}}
          />
        </View>

        <Controller
          name={'description'}
          control={control}
          rules={{
            required: {value: true, message: 'Please add some description'},
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <View style={{width: '100%', minHeight: 150}}>
              <TextInput
                style={styles.inputStyle}
                placeholder={'Enter Your Plate Description'}
                placeholderTextColor={COLORS.main}
                selectionColor={COLORS.main}
                keyboardType="default"
                multiline={true}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </View>
          )}
        />
      </View>
      {/* image upload*/}
      <TitleWithSubtitle
        title={`Upload Image`}
        subtitle={`Don't upload any downloaded image`}
      />

      {hasImag !== '' && (
        <View style={{marginBottom: 10, marginLeft: 10}}>
          <Image
            source={{uri: watch('images')[0]}}
            style={{
              height: 150,
              width: 200,
              borderRadius: 10,
            }}
          />
        </View>
      )}

      <Controller
        name={'images'}
        control={control}
        rules={{
          required: {value: true, message: 'Please upload an image'},
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View style={{width: '100%'}}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                marginBottom: 10,
              }}
              onPress={() => {
                onChange([IMG]);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: COLORS.secondary,
                  padding: 10,
                  width: 120,
                  borderRadius: 10,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/icons/camera.png')}
                  style={{height: 30, width: 30, resizeMode: 'contain'}}
                />
                <Text
                  style={{
                    color: 'white',
                    marginLeft: 10,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {watch('images') ? 'Change' : 'Upload'}
                </Text>
              </View>
            </TouchableOpacity>
            {error && (
              <Text style={{color: 'red', marginLeft: 10}}>
                {error.message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    height: 140,
    borderColor: COLORS.tranparenSecondary,
    borderWidth: 1,
    marginRight: 10,
    marginTop: 10,
    color: COLORS.main,
  },
});
