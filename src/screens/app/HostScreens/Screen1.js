import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../utils/Colors';
import CustomeInputFiled from '../../../components/CustomeInputFiled';
import CategoriesCarousel from '../../../components/CategoriesCarousel';
import MainActionButton from '../../../components/MainActionButton';
import TitleWithSubtitle from '../../../components/TitleWithSubtitle';
import usePlateStore from '../../../stores/plateStore';
import {useEffect} from 'react';

// last_date_to_order,
// last_time_to_order,
// description,
// own_delivery_system,
// all_time_available,
// discount_price,
// price,
// plate_category,
// plate_name,
// quantity,
// in_stock,
// location,

const Screen1 = ({nextScreen}) => {
  const newPlate = usePlateStore(state => state.newPlate);
  const storeNewPlate = usePlateStore(state => state.storeNewPlate);
  const [carouselItem, setCarouselItem] = useState();

  // useEffect(() => {
  //   console.log(newPlate);
  // }, []);
  // setting plate_category
  // useEffect(() => {
  //   console.log('....');
  //   console.log(carouselItem);
  //   // setData(prev => ({
  //   //   ...prev,
  //   //   plate_category: carouselItem?.slug,
  //   // }));
  // }, [carouselItem]);
  return (
    <View>
      {/* input section */}
      <View>
        {/* select plate category section */}

        <CustomeInputFiled
          icon={require('../../../assets/icons/food-name.png')}
          text="Enter Your Plate Name"
          value={newPlate?.plate_name}
          action={txt => {
            storeNewPlate({...newPlate, plate_name: txt});
          }}
        />
        <CustomeInputFiled
          icon={require('../../../assets/icons/taka.png')}
          text="Enter Your Plate Price"
          keyborardType={'number-pad'}
          value={newPlate?.price}
          action={txt => {
            storeNewPlate({...newPlate, price: txt});
          }}
        />
        {/* plate amount section */}
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
                Number(newPlate?.quantity) > 1 &&
                  storeNewPlate({
                    ...newPlate,
                    quantity: Number(newPlate?.quantity) - 1,
                  });
              }}>
              <Text style={{fontSize: 25, color: COLORS.main, marginLeft: 10}}>
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
              {newPlate?.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                storeNewPlate({
                  ...newPlate,
                  quantity: Number(newPlate?.quantity) + 1,
                });
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
      </View>
      {/* <View style={{flexDirection: 'row', width: '100%'}}>
        <MainActionButton text={`Next →`} pressHandler={nextScreen} />
      </View> */}
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({});
