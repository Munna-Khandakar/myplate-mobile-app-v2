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
import {Controller, FieldValues, UseFormReturn} from 'react-hook-form';
import {HostPlateType} from '../../../types/HostPlateType';

type SimpleInputsFormTypes = {
  form: UseFormReturn<HostPlateType, any, undefined>;
};

export const SimpleInputsForm = (props: SimpleInputsFormTypes) => {
  const {form} = props;
  const {control} = form;

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/icons/food-name.png')}
            style={{height: 25, width: 25}}
          />
        </View>
        <Controller
          name={'title'}
          control={control}
          rules={{
            required: {value: true, message: 'Please Enter Plate Name'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputStyle}
              placeholder={'Enter Plate Name'}
              placeholderTextColor={COLORS.main}
              selectionColor={COLORS.main}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../../../assets/icons/taka.png')}
            style={{height: 25, width: 25}}
          />
        </View>
        <Controller
          name={'price'}
          control={control}
          rules={{
            required: {value: true, message: 'Please Enter Price'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.inputStyle}
              placeholder={'Enter Per Plate Price'}
              keyboardType="numeric"
              placeholderTextColor={COLORS.main}
              selectionColor={COLORS.main}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
            />
          )}
        />
      </View>

      <Controller
        name={'quantity'}
        control={control}
        defaultValue={1}
        rules={{
          required: {value: true, message: 'Please Enter Price'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
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
            <Text
              style={{
                color: COLORS.main,
              }}>
              Quantity
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                alignItems: 'center',
                justifyContent: 'space-between',

                width: '50%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  const newValue = Math.max(1, value - 1);
                  onChange(newValue);
                }}>
                <Text
                  style={{fontSize: 25, color: COLORS.main, marginLeft: 10}}>
                  -
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 45,
                  fontWeight: 'bold',
                  color: COLORS.main,
                  marginLeft: 10,
                }}>
                {value}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  onChange(value + 1);
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: COLORS.main,
                    marginLeft: 10,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    height: 40,
    borderBottomColor: COLORS.tranparenSecondary,
    borderBottomWidth: 1,
  },
  iconContainer: {
    backgroundColor: COLORS.tranparenSecondary,
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
