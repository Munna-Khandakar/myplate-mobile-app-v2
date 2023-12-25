import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import CategoriesCarousel from '../../components/CategoriesCarousel';
import PostCard from '../../components/PostCard';
import usePlateStore from '../../stores/plateStore';
import axios from 'axios';

const HomeScreen = () => {
  const plates = usePlateStore(state => state.plates);
  const storePlates = usePlateStore(state => state.storePlates);

  const getData = async () => {
    try {
      const response = await axios.get(`plates`);
      storePlates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={<CategoriesCarousel />}
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
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: '#fff',
  },
});
