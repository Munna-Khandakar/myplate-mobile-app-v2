import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CategoriesCarousel from '../../components/CategoriesCarousel';
import PostCard from '../../components/PostCard';
import {COLORS} from '../../utils/Colors';
import usePlateStore from '../../stores/plateStore';
import {getInitialPlates} from '../../requests/plates';
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const HomeScreen = () => {
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[1]);
  const plates = usePlateStore(state => state.plates);
  const storePlates = usePlateStore(state => state.storePlates);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const data = await getInitialPlates();
    storePlates([...data]);
  };
  let content;

  if (plates.length < 1) {
    content = <ActivityIndicator size="small" color={COLORS.main} />;
  } else {
    content = plates.map((plate, i) => <PostCard key={i} plate={plate} />);
  }

  return (
    <View style={styles.mainContainer}>
      {/* {content} */}

      <FlatList
        ListHeaderComponent={
          <>
            {/* <StatusBar
              backgroundColor={COLORS.backgroundColor}
              barStyle={statusBarStyle}
            /> */}
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <CategoriesCarousel />
          </>
        }
        data={plates}
        renderItem={plate => (
          <PostCard plate={plate.item} key={plate.item?.id} />
        )}
        keyExtractor={plate => plate.index}
      />
      <View
        style={{
          marginBottom: 150,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>We are at the end</Text>
        <Image
          source={require('../../assets/downloading.png')}
          style={{height: 300, width: 300, resizeMode: 'stretch'}}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#fff',
  },
});
