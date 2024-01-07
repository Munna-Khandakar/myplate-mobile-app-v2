import React, {Fragment, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageSourcePropType,
  ScrollView,
} from 'react-native';
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
import {
  HOST_PLATE_DEFAULT_VALUES,
  HostPlateType,
} from '../../types/HostPlateType';
import PostCard from '../../components/PostCard';
import {UserType} from '../../types/UserTypes';
import axios from 'axios';

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

  const form = useForm<HostPlateType>({
    defaultValues: HOST_PLATE_DEFAULT_VALUES,
    mode: 'all',
  });
  const {
    trigger,
    watch,
    setValue,
    handleSubmit,
    formState: {errors},
  } = form;

  useEffect(() => {
    async function fetchCategory() {
      const data = await getCategory();
      if (data.length > 0) {
        setValue('category', data[0]._id);
        setCategory(data);
      }
    }
    fetchCategory();
  }, []);

  const host: UserType = {
    username: 'Munna',
    email: 'aacnsa',
    phone: '+880163224',
    isVerified: false,
    profileImage:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  };

  const onSubmit = async (data: HostPlateType) => {
    console.log('form submit handler');
    const plate = {...data, price: parseInt(data.price)};

    const res = await axios.post('/plates', plate);
    console.log(res);
  };
  //console.log('erorrs from Host =>', errors);

  const nextScreen = async () => {
    if (screen == 0) {
      await trigger('category');
      if (errors.category) {
        return;
      } else {
        setScreen(s => s + 1);
      }
    }

    if (screen == 1) {
      await trigger('title');
      await trigger('price');
      await trigger('quantity');
      if (errors.title || errors.price || errors.quantity) {
        return;
      } else {
        setScreen(s => s + 1);
      }
    }

    if (screen == 2) {
      await trigger('description');
      await trigger('image');

      if (errors.description || errors.image) {
        return;
      } else {
        setScreen(s => s + 1);
      }
    }
    if (screen == 3) {
      await trigger('address');
      console.log(errors);
      if (errors.address) {
        return;
      } else {
        setScreen(s => s + 1);
      }
    }

    if (screen == 4) {
      await trigger('lastTimeToOrder');
      if (errors.lastTimeToOrder) {
        return;
      } else {
        setScreen(s => s + 1);
      }
    }
  };
  const prevScreen = () => {
    setScreen(s => s - 1);
  };

  const renderForms = () => {
    return (
      <Fragment>
        <View style={screen == 0 ? {} : styles.hidden}>
          <HostCarousel form={form} category={category} />
        </View>
        <View style={screen == 1 ? {} : styles.hidden}>
          <SimpleInputsForm form={form} />
        </View>
        <View style={screen == 2 ? {} : styles.hidden}>
          <DetailsAndImageForm form={form} />
        </View>
        <View style={screen == 3 ? {} : styles.hidden}>
          <Screen3 form={form} />
        </View>
        <View style={screen == 4 ? {} : styles.hidden}>
          <Screen4 form={form} />
        </View>
        <View style={screen == 5 ? {} : styles.hidden}>
          <PostCard plate={watch()} host={host} />
        </View>
      </Fragment>
    );
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
      <View
        style={{
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          {DATA_MAP[screen] && renderBanner()}
          {renderForms()}
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
          {screen == 5 ? (
            <MainActionButton
              text={`Post`}
              pressHandler={handleSubmit(onSubmit)}
            />
          ) : (
            <MainActionButton text={`Next →`} pressHandler={nextScreen} />
          )}
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
  hidden: {
    opacity: 0,
    width: 0,
    height: 0,
  },
});
