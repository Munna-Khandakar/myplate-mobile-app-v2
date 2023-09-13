import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../utils/Colors';
import MainActionButton from '../../../components/MainActionButton';
import SecondaryActionButton from '../../../components/SecondaryActionButton';
import TitleWithSubtitle from '../../../components/TitleWithSubtitle';
import usePlateStore from '../../../stores/plateStore';

const Screen2 = ({nextScreen, prevScreen}) => {
  const newPlate = usePlateStore(state => state.newPlate);
  const storeNewPlate = usePlateStore(state => state.storeNewPlate);
  return (
    <View>
      {/* input section */}
      <View>
        {/* input plate description */}
        <View style={{flexDirection: 'row'}}>
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
          <TextInput
            style={styles.inputStyle}
            placeholder={'Enter Your Plate Description'}
            placeholderTextColor={COLORS.main}
            selectionColor={COLORS.main}
            keyboardType="default"
            multiline={true}
            value={newPlate?.description}
            onChangeText={txt => {
              storeNewPlate({...newPlate, description: txt});
            }}
          />
        </View>
        {/* image upload*/}
        <TitleWithSubtitle
          title={`Upload Image`}
          subtitle={`Don't upload any downloaded image`}
        />
        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: COLORS.secondary,
              padding: 10,
              width: 120,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/icons/camera.png')}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
            <Text
              style={{
                color: 'white',
                marginLeft: 10,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Upload
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={{flexDirection: 'row', width: '100%'}}>
        <SecondaryActionButton text={`← Back`} pressHandler={prevScreen} />
        <MainActionButton text={`Next →`} pressHandler={nextScreen} />
      </View> */}
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    height: 140,
    borderColor: COLORS.tranparenSecondary,
    borderWidth: 1,
    marginRight: 10,
    marginTop: 10,
  },
});
