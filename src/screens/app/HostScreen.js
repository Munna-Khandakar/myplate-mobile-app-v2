import {StyleSheet, View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import Screen1 from './HostScreens/Screen1';
import Screen2 from './HostScreens/Screen2';
import Screen3 from './HostScreens/Screen3';
import Screen4 from './HostScreens/Screen4';
import Toast from 'react-native-toast-message';
import HostCarousel from './HostScreens/HostCarousel';
import {COLORS} from '../../utils/Colors';
import SecondaryActionButton from '../../components/SecondaryActionButton';
import MainActionButton from '../../components/MainActionButton';

const HostScreen = () => {
  const [screen, setScreen] = useState(0);
  const [canOrderAnyTime, setCanOrderAnyTime] = useState(false);
  const [haveOwnDeliverySystem, setHaveOwnDeliverySystem] = useState(false);
  const nextScreen = () => {
    setScreen(s => s + 1);
  };
  const prevScreen = () => {
    setScreen(s => s - 1);
  };
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };
  const Screens = () => {
    if (screen == 0) return <HostCarousel />;
    if (screen == 1)
      return <Screen1 nextScreen={nextScreen} prevScreen={prevScreen} />;
    if (screen == 2)
      return <Screen2 nextScreen={nextScreen} prevScreen={prevScreen} />;
    if (screen == 3)
      return (
        <Screen3
          nextScreen={nextScreen}
          prevScreen={prevScreen}
          haveOwnDeliverySystem={haveOwnDeliverySystem}
          setHaveOwnDeliverySystem={setHaveOwnDeliverySystem}
        />
      );
    if (screen == 4)
      return (
        <Screen4
          nextScreen={nextScreen}
          prevScreen={prevScreen}
          canOrderAnyTime={canOrderAnyTime}
          setCanOrderAnyTime={setCanOrderAnyTime}
          showToast={showToast}
          setScreen={setScreen}
        />
      );
  };

  const dataMap = {
    0: {
      text: 'Give plate details and start hosting your plate → ',
      image: require('../../assets/host-plate-1.png'),
      firstScreen: true,
    },
    1: {
      text: 'Give your plate details and start → ',
      image: require('../../assets/host-plate-1.png'),
    },
    2: {
      text: 'Add some descriptions of your plate → ',
      image: require('../../assets/host-plate-2.png'),
    },
    3: {
      text: 'Add pickup location and other stuffs → ',
      image: require('../../assets/diveryman.png'),
    },
    4: {
      text: 'Pick your convenient time to deliver → ',
      image: require('../../assets/time.png'),
      lastScreen: 'false',
    },
  };
  return (
    <View style={{height: '100%'}}>
      <Toast />
      <View
        style={{
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        {/* banner section */}
        <View>
          <View style={styles?.bannerContainer}>
            <Text style={styles?.bannerText}>{dataMap[0]?.text}</Text>
            <Image source={dataMap[0]?.image} style={styles?.bannerImage} />
          </View>
          <Screens />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          {!dataMap[screen]?.firstScreen && (
            <SecondaryActionButton text={`← Back`} pressHandler={prevScreen} />
          )}

          <MainActionButton text={`Next →`} pressHandler={nextScreen} />
        </View>
      </View>
    </View>
  );
};

export default HostScreen;

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  bannerText: {
    color: COLORS.main,
    fontSize: 20,
    flex: 1,
  },
  bannerImage: {
    height: 100,
    width: 100,
    flex: 1,
    resizeMode: 'contain',
  },
});
