import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../utils/Colors';
import MainActionButton from '../../../components/MainActionButton';
import SecondaryActionButton from '../../../components/SecondaryActionButton';
import TitleWithSubtitle from '../../../components/TitleWithSubtitle';
import DatePicker from 'react-native-date-picker';
import usePlateStore from '../../../stores/plateStore';

const Screen4 = () => {
  const [date, setDate] = useState(new Date());
  const newPlate = usePlateStore(state => state.newPlate);
  const storeNewPlate = usePlateStore(state => state.storeNewPlate);

  return (
    <View>
      {/* time input section */}
      {!newPlate?.all_time_available && (
        <View>
          <TitleWithSubtitle
            title={`Last time to order`}
            subtitle={`After this time, no cleint can place order and you need to deliver your plate as early as possible after this time`}
          />
          <DatePicker
            date={date}
            onDateChange={setDate}
            androidVariant="nativeAndroid"
            textColor={COLORS.main}
          />
        </View>
      )}

      {/* custom radio button */}
      <TouchableOpacity
        style={{margin: 10, flexDirection: 'row'}}
        onPress={() =>
          storeNewPlate({
            ...newPlate,
            all_time_available: !newPlate?.all_time_available,
          })
        }>
        <Image
          source={
            newPlate?.all_time_available
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
      {newPlate?.all_time_available && (
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
