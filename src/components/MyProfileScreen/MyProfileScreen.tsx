import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import useSWR from 'swr';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {COLORS} from '../../utils/Colors';
import BackButton from '../common/BackButton';
import {getMyProfile} from '../../requests/auth';
import CustomModal from '../common/CustomModal';
import NameChangeForm from './NameChangeForm';

const PROFILE_IMG =
  'https://scontent.fdac99-1.fna.fbcdn.net/v/t39.30808-6/358118255_2558848400949742_2342771989776370285_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeE_JeqQ4kUhMjfnyecnRqG4Hq1rmaP6JO0erWuZo_ok7XU6lkq5qBVkqh88UQhbWywceIelWYrJxHBP6CU6PLpf&_nc_ohc=DGB-NmzOE6AAX8eRgeJ&_nc_ht=scontent.fdac99-1.fna&oh=00_AfAQ9pJx4FXMlbqq97-ubyZPjx2y44MB1S1Pyyt0j-gdUQ&oe=65A5C0BD';

export default function MyProfileScreen() {
  const navigation = useNavigation();
  const {data, isLoading, error} = useSWR('/user/me', getMyProfile);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
    //@ts-ignore
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        //@ts-ignore
      } else if (response.error) {
        //@ts-ignore
        console.log('Image picker error: ', response.error);
      } else {
        //@ts-ignore
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const onFormSubmit = async (data: {username: string}) => {
    setModalVisible(false);
  };

  if (isLoading) return <Text style={{color: COLORS.main}}>Loading...</Text>;
  if (error) return <Text style={{color: COLORS.main}}>Error...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <BackButton />
        </View>

        <View style={{alignSelf: 'center'}}>
          <View style={styles.profileImage}>
            <Image
              source={{
                uri: `${
                  data?.user?.profilePicture
                    ? data?.user?.profilePicture
                    : selectedImage
                    ? selectedImage
                    : PROFILE_IMG
                }`,
              }}
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.active}></View>
          <TouchableOpacity style={styles.add} onPress={openImagePicker}>
            <Image
              source={require('../../assets/icons/add.png')}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.infoContainer]}>
          <Text
            style={[
              styles.text,
              {fontWeight: '200', fontSize: 36, color: COLORS.main},
            ]}>
            {data?.user?.username}
          </Text>
          <Text style={[styles.text, {color: '#AEB5BC', fontSize: 14}]}>
            {data?.user?.phone}
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[
              {alignSelf: 'center', position: 'absolute', top: -15, right: -25},
            ]}>
            <Image
              source={require('../../assets/icons/pencil.png')}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>
              {data?.plateCount}
            </Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1},
            ]}>
            <Text style={[styles.text, {fontSize: 24}]}>45,844</Text>
            <Text style={[styles.text, styles.subText]}>Sold</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>302</Text>
            <Text style={[styles.text, styles.subText]}>Bought</Text>
          </View>
        </View>

        <View style={{marginTop: 32}}>
          <Text
            style={{
              color: COLORS.main,
              fontSize: 15,
              fontWeight: '600',
              marginLeft: 10,
              marginBottom: 10,
            }}>
            Your Recent Posts
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data?.recentPosts &&
              data?.recentPosts.length > 0 &&
              data?.recentPosts.map(item => (
                <View style={styles.mediaImageContainer} key={item._id}>
                  <Image
                    source={{uri: item.images[0]}}
                    style={styles.image}
                    resizeMode="cover"></Image>
                </View>
              ))}
          </ScrollView>
        </View>
        <Text style={[styles.subText, styles.recent]}>Quick Settings</Text>
        <View style={{alignItems: 'flex-start', marginLeft: 10}}>
          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <TouchableOpacity
              onPress={() => {
                //@ts-ignore
                navigation.navigate('MyAddress');
              }}>
              <Text style={{fontWeight: '400'}}>Update your address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomModal
        onClose={() => {
          setModalVisible(false);
        }}
        isOpen={modalVisible}>
        <NameChangeForm
          onFormSubmit={onFormSubmit}
          closeForm={() => setModalVisible(false)}
        />
      </CustomModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  text: {
    fontFamily: 'HelveticaNeue',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: '#AEB5BC',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  active: {
    backgroundColor: '#34FFB9',
    position: 'absolute',
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: COLORS.main,
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: '#41444B',
    position: 'absolute',
    top: '50%',
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.38)',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 10,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: '#CABFAB',
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
