import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image, ImageSourcePropType} from 'react-native';
import Toast from 'react-native-toast-message';
import {useForm} from 'react-hook-form';
import Screen3 from './HostScreens/Screen3';
import Screen4 from './HostScreens/Screen4';
import HostCarousel from './HostScreens/HostCarousel';
import {COLORS} from '../../utils/Colors';
import SecondaryActionButton from '../../components/SecondaryActionButton';
import MainActionButton from '../../components/MainActionButton';
import {getCategory} from '../../requests/category';
import {SimpleInputsForm} from './HostScreens/SimpleInputsForm';
import {DetailsAndImageForm} from './HostScreens/DetailsAndImageForm';

interface DataItem {
  text: string;
  image: ImageSourcePropType;
  firstScreen?: boolean;
  lastScreen?: boolean;
}

type DataMap = Record<number, DataItem>;

const DATA_MAP: DataMap = {
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
    lastScreen: true,
  },
};

const HostScreen = () => {
  const [screen, setScreen] = useState(0);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      const data = await getCategory();
      setCategory(data);
    }

    fetchCategory();
  }, []);

  const nextScreen = () => {
    setScreen(s => s + 1);
  };
  const prevScreen = () => {
    setScreen(s => s - 1);
  };
  const showToast = (type: string, text1: string, text2: string) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };
  const form = useForm({});
  const {watch} = form;

  console.log('from HS==>', watch());

  const renderScreen = () => {
    if (screen == 0) return <HostCarousel form={form} category={category} />;
    if (screen == 1) return <SimpleInputsForm form={form} />;
    if (screen == 2) return <DetailsAndImageForm form={form} />;
    if (screen == 3) return <Screen3 />;
    if (screen == 4) return <Screen4 />;
  };

  const renderBanner = () => {
    return (
      <View style={styles?.bannerContainer}>
        <Text style={styles?.bannerText}>{DATA_MAP[screen]?.text}</Text>
        <Image source={DATA_MAP[screen]?.image} style={styles?.bannerImage} />
      </View>
    );
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
        <View>
          {renderBanner()}
          {renderScreen()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginBottom: 30,
          }}>
          {!DATA_MAP[screen]?.firstScreen && (
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
