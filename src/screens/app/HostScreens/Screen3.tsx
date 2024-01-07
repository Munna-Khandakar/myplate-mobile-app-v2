import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Controller, UseFormReturn} from 'react-hook-form';
import {COLORS} from '../../../utils/Colors';
import AddressPicker from '../../../components/common/AddressPicker';
import {HostPlateType} from '../../../types/HostPlateType';

type LocationScreenProps = {
  form: UseFormReturn<HostPlateType, any, undefined>;
};

const Screen3 = (props: LocationScreenProps) => {
  const {form} = props;
  const {control, watch} = form;

  return (
    <View>
      <Text
        style={{
          color: COLORS.main,
          marginLeft: 10,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Select Pickup Location
      </Text>
      <View style={styles.locationContainer}>
        <Controller
          name={'address'}
          control={control}
          rules={{
            required: {value: true, message: 'Please select pickup location'},
          }}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <View style={{width: '100%', minHeight: 150}}>
              <AddressPicker
                selectedId={watch('address')}
                onSelect={address => {
                  onChange(address._id);
                }}
                height={250}
              />
              {error && <Text style={{color: 'red'}}>{error.message}</Text>}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  locationContainer: {
    margin: 10,
  },
  locationItem: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.main,
  },
});
