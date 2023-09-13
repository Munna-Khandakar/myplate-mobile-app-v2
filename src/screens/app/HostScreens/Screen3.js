import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/Colors';
import usePlateStore from '../../../stores/plateStore';

const Screen3 = () => {
  const newPlate = usePlateStore(state => state.newPlate);
  const storeNewPlate = usePlateStore(state => state.storeNewPlate);
  return (
    <View>
      {/* map location input section */}
      <View>
        <Text
          style={{
            color: COLORS.main,
            marginLeft: 10,
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Select Pickup Location
        </Text>
        <View style={styles.locationContainer}>
          <TouchableOpacity style={styles.locationItem}>
            <Text>Saved Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.locationItem}>
            <Text>Google Map</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* have own delivery system */}
      <TouchableOpacity
        style={{
          margin: 10,
          flexDirection: 'row',
        }}
        onPress={() =>
          storeNewPlate({
            ...newPlate,
            own_delivery_system: !newPlate?.own_delivery_system,
          })
        }>
        <Image
          source={
            newPlate?.own_delivery_system
              ? require('../../../assets/icons/active/delivery-man.png')
              : require('../../../assets/icons/delivery-man.png')
          }
          style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            color: COLORS.main,
            fontWeight: 'bold',
            marginLeft: 10,
            fontSize: 15,
          }}>
          Have Own Delivery System
        </Text>
      </TouchableOpacity>
      {newPlate?.own_delivery_system && (
        <Text
          style={{
            color: COLORS.main,
            marginLeft: 10,
            fontSize: 15,
          }}>
          Clicking this, myplate delivery system will not deliver your plate.
        </Text>
      )}
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  locationItem: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.main,
  },
});
