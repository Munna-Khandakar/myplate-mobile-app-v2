import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';
import MainActionButton from './MainActionButton';
import useCountryCode from '../hooks/useCountryCode';
import {Blurhash} from 'react-native-blurhash';
import useProfileStore from '../stores/profileStore';

const OrderBottomSheet = ({plate}) => {
  const myAddress = useProfileStore(state => state.myAddress);
  const deliveryCharge = 60;
  const countryCode = useCountryCode();
  const [plateAmount, setPlateAmount] = useState(1);
  const [plateCost, setPlateCost] = useState(0);
  const [maxPlateToOrder, setMaxPlateToOrder] = useState(10);
  const [selectedLocationId, setSelectedLocationId] = useState('1');

  useEffect(() => {
    setPlateCost(parseInt(plate?.price));
    setMaxPlateToOrder(parseInt(plate?.quantity));
  }, []);
  // price calculation by changing plateamount
  useEffect(() => {
    calculatePrice();
  }, [plateAmount]);
  const calculatePrice = () => {
    setPlateCost(
      parseInt(plateAmount) * parseInt(plate?.price) + parseInt(deliveryCharge),
    );
  };
  const PlusButton = () => (
    <TouchableOpacity
      onPress={() => {
        if (plateAmount < maxPlateToOrder) {
          setPlateAmount(prevState => prevState + 1);
        }
      }}
      style={{
        backgroundColor: COLORS.main,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.main,
      }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          width: 50,
          textAlign: 'center',
          color: 'white',
        }}>
        +
      </Text>
    </TouchableOpacity>
  );
  const MinusButton = () => (
    <TouchableOpacity
      onPress={() => {
        if (plateAmount > 1) {
          setPlateAmount(prevState => prevState - 1);
        }
      }}
      style={{
        borderWidth: 2,
        borderColor: COLORS.main,
        borderRadius: 10,
      }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          width: 50,
          textAlign: 'center',
          color: COLORS.main,
        }}>
        -
      </Text>
    </TouchableOpacity>
  );

  const LocationItem = ({id, icon, title, address, onPressHandler}) => {
    return (
      <TouchableOpacity
        onPress={onPressHandler}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
          borderRadius: 10,
          padding: 10,
          backgroundColor:
            selectedLocationId == id ? COLORS.tranparenSecondary : 'white',
          borderEndColor: COLORS.main,
          borderEndWidth: selectedLocationId == id ? 1 : 0,
        }}>
        <Image source={icon} style={{height: 30, width: 30}} />
        <View style={{marginLeft: 5}}>
          <Text
            style={{
              color: COLORS.textColorSecondary,
              fontWeight: 'bold',
            }}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {title}
          </Text>
          <Text
            style={{
              color: COLORS.textColorSecondary,
              marginRight: 25,
            }}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{height: '100%'}}>
      <View style={styles.OrderBottomSheetContainer}>
        <Text
          style={{textAlign: 'center', color: COLORS.main, marginBottom: 5}}>
          Plate Details
        </Text>

        {/* first row */}
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.OrderBottomSheetLeftContainer, {height: 110}]}>
            {plate?.plate_images[0] ? (
              <Image
                style={{
                  borderRadius: 10,
                  resizeMode: 'cover',
                  height: '100%',
                  width: '100%',
                }}
                source={{
                  uri: plate?.plate_images[0],
                }}
              />
            ) : (
              <Blurhash
                blurhash="LGFFaXYk^6#M@-5c,1J5@[or[Q6."
                style={{
                  borderRadius: 10,
                  resizeMode: 'cover',
                  height: '100%',
                  width: '100%',
                }}
              />
            )}
          </View>
          <View style={[styles.OrderBottomSheetRightContainer, {height: 110}]}>
            <Text
              style={{color: COLORS.main, fontSize: 18, fontWeight: 'bold'}}>
              {plate?.plate_name}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{color: COLORS.main}}
                ellipsizeMode="tail"
                numberOfLines={1}>
                from {plate?.postedBy?.name}
              </Text>
              {plate?.postedBy?.myCertification && (
                <Image
                  source={require('../assets/icons/verified.png')}
                  style={{height: 10, width: 10, marginLeft: 5}}
                />
              )}
            </View>
            {/* // TODO::correct the time UI discussion needed */}
            <Text style={{color: COLORS.textColorSecondary}}>
              Estimate Recieving Time:
              {plate?.last_date_to_order == '' &&
              plate?.last_time_to_order == ''
                ? 'Anytime'
                : 'After 3.30 PM'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <MinusButton />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: COLORS.main,
                }}>
                {plateAmount} PLATES
              </Text>
              <PlusButton />
            </View>
          </View>
        </View>
        {/* second row price */}
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <View style={[styles.OrderBottomSheetLeftContainer]}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.main,
              }}>
              Total Cost
            </Text>
          </View>
          <View style={[styles.OrderBottomSheetRightContainer]}>
            <Text
              style={{
                fontSize: 55,
                fontWeight: 'bold',
                color: COLORS.main,
              }}>
              ৳ {plateCost == 0 ? plate?.price : plateCost}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: COLORS.textColorSecondary,
                  textAlign: 'right',
                }}>
                Deliverycharge
              </Text>
              <Text style={{fontWeight: 'bold'}}> ( ৳ {deliveryCharge} ) </Text>
              <Text>included</Text>
            </View>
          </View>
        </View>

        {/* third row location */}
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.OrderBottomSheetLeftContainer]}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: COLORS.main,
              }}>
              Pickup Location
            </Text>
          </View>
          <View style={[styles.OrderBottomSheetRightContainer]}>
            <LocationItem
              id="1"
              icon={require('../assets/icons/location.png')}
              title={'To Current Location'}
              address={'Lat:121.1313 Long: -123.4231'}
              onPressHandler={() => setSelectedLocationId('1')}
            />
            <LocationItem
              id={myAddress.id}
              icon={require('../assets/icons/saved.png')}
              title={'To Saved Address'}
              address={myAddress.body}
              onPressHandler={() => setSelectedLocationId('2')}
            />
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <MainActionButton text="CONFIRM ORDER" pressHandler={() => {}} />
      </View>
    </View>
  );
};

export default OrderBottomSheet;

const styles = StyleSheet.create({
  OrderBottomSheetContainer: {
    marginLeft: 10,
    marginRight: 10,
  },

  OrderBottomSheetLeftContainer: {
    flex: 3,
    height: 100,
    justifyContent: 'center',
  },
  OrderBottomSheetRightContainer: {
    flex: 7,
    marginLeft: 10,
  },
});
