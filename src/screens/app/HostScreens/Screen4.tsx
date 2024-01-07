import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Switch,
} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {Controller, UseFormReturn} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../../../utils/Colors';
import TitleWithSubtitle from '../../../components/TitleWithSubtitle';
import {HostPlateType} from '../../../types/HostPlateType';

type DateScreenProps = {
  form: UseFormReturn<HostPlateType, any, undefined>;
};

const Screen4 = (props: DateScreenProps) => {
  const {form} = props;
  const {control, watch} = form;

  return (
    <View>
      <Controller
        name={'lastTimeToOrder'}
        control={control}
        rules={{
          required: {value: true, message: 'Please select pickup location'},
        }}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <View style={{width: '100%', minHeight: 150}}>
            <TitleWithSubtitle
              title={`Last time to order`}
              subtitle={`After this time, no cleint can place order and you need to deliver your plate as early as possible after this time`}
            />
            <DatePicker
              date={watch('lastTimeToOrder')}
              onDateChange={(date: Date) => {
                onChange(date);
              }}
              androidVariant="nativeAndroid"
              textColor={COLORS.main}
            />
            {error && <Text style={{color: 'red'}}>{error.message}</Text>}
          </View>
        )}
      />

      <Controller
        name={'canOrderAnytime'}
        control={control}
        render={({field: {onChange, value}, fieldState: {error}}) => (
          <View style={{width: '100%', paddingLeft: 10}}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: COLORS.main,
                marginTop: 10,
                marginBottom: 10,
              }}>
              All Time Available ?
            </Text>
            <Switch
              trackColor={{false: '#767577', true: COLORS.main}}
              value={value}
              onValueChange={onChange}
            />
            {value && (
              <Text
                style={{
                  color: COLORS.main,
                  marginTop: 10,
                  fontSize: 15,
                }}>
                Client can order anytime and you have to deliver the plate as
                soon as possible
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Screen4;

const styles = StyleSheet.create({});
