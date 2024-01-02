import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {UseFormReturn} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../../../utils/Colors';
import TitleWithSubtitle from '../../../components/TitleWithSubtitle';
import {HostPlateType} from '../../../types/HostPlateType';

type DateScreenProps = {
  form: UseFormReturn<HostPlateType, any, undefined>;
};

const Screen4 = (props: DateScreenProps) => {
  const {form} = props;
  const {setValue, watch} = form;

  return (
    <View>
      {!watch('canOrderAnytime') && (
        <View>
          <TitleWithSubtitle
            title={`Last time to order`}
            subtitle={`After this time, no cleint can place order and you need to deliver your plate as early as possible after this time`}
          />
          <DatePicker
            date={watch('lastTimeToOrder')}
            onDateChange={(date: Date) => {
              setValue('lastTimeToOrder', date);
            }}
            androidVariant="nativeAndroid"
            textColor={COLORS.main}
          />
        </View>
      )}

      <TouchableOpacity
        style={{margin: 10, flexDirection: 'row'}}
        onPress={() => setValue('canOrderAnytime', !watch('canOrderAnytime'))}>
        <Image
          source={
            watch('canOrderAnytime')
              ? require('../../../assets/icons/active/24-hours.png')
              : require('../../../assets/icons/24-hours.png')
          }
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />
        <Text
          style={{
            color: COLORS.main,
            fontWeight: 'bold',
            marginLeft: 10,
            fontSize: 15,
          }}>
          Can Order Any Time
        </Text>
      </TouchableOpacity>
      {watch('canOrderAnytime') && (
        <Text
          style={{
            color: COLORS.main,
            marginLeft: 10,
            fontSize: 15,
          }}>
          Client can order anytime and you have to deliver the plate as soon as
          possible
        </Text>
      )}
    </View>
  );
};

export default Screen4;

const styles = StyleSheet.create({});
