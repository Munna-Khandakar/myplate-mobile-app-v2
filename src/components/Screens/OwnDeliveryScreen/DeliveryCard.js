import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/Colors';
import MainActionButton from '../../MainActionButton';

export default function DeliveryCard({order}) {
  // vibrate is platform specific. default is 400ms
  const vibrate = () => {
    Vibration.vibrate(5);
  };

  return (
    <View style={styles.DeliveryCardContainer}>
      <View
        style={{
          padding: 10,
        }}>

        <View style={styles.DeliveryCardRow}>
          <Image
            source={require('../../../assets/icons/location.png')}
            style={styles.DeliveryCardIcon}
          />
          <Text style={styles.DeliveryCardText}>
            {order?.order_user?.name || '-'},{'\n'}
            {order?.delivery_address || '-'}
            {'\n'}
            {order?.order_user?.phone || '-'}
          </Text>
        </View>
        <View style={styles.DeliveryCardRow}>
          <Image
            source={require('../../../assets/icons/taka.png')}
            style={styles.DeliveryCardIcon}
          />
          <Text style={styles.DeliveryCardText}>
            {order?.total_price || '-'} BDT{'\n'}(delivery charge includded )
          </Text>
        </View>
        <View style={styles.DeliveryCardRow}>
          <Image
            source={require('../../../assets/icons/time-left.png')}
            style={styles.DeliveryCardIcon}
          />
          <Text style={styles.DeliveryCardText}>
            {order?.plate_info?.all_time_available
              ? `as early as possible`
              : `${order?.plate_info?.last_date_to_order},${order?.plate_info?.last_date_to_order}`}
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <MainActionButton text={`Complete Delivery`} pressHandler={vibrate} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  DeliveryCardContainer: {
    borderBottomColor: COLORS.tranparenSecondary,
    borderBottomWidth: 1,
    borderTopColor: COLORS.tranparenSecondary,
    borderTopWidth: 1,
    marginBottom: 10,
  },
  DeliveryCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  DeliveryCardId: {
    fontSize: 15,
    color: COLORS.main,
    textAlign: 'center',
  },
  DeliveryCardIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  DeliveryCardUserIcon: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 10,
  },
  DeliveryCardText: {
    fontSize: 15,
    color: COLORS.main,
    textAlign: 'auto',
    flex: 1,
  },
});
