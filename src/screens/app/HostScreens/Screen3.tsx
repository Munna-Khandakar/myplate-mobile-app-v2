import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UseFormReturn} from 'react-hook-form';
import {COLORS} from '../../../utils/Colors';
import AddressPicker from '../../../components/common/AddressPicker';
import {HostPlateType} from '../../../types/HostPlateType';

type LocationScreenProps = {
  form: UseFormReturn<HostPlateType, any, undefined>;
};

const Screen3 = (props: LocationScreenProps) => {
  const {form} = props;
  const {setValue, watch} = form;

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
        <AddressPicker
          selectedId={watch('address')?._id}
          onSelect={address => {
            setValue('address', address);
          }}
          height={250}
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
