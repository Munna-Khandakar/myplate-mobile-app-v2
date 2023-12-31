import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import CategoriesCarousel from '../../components/CategoriesCarousel';
import PostCard from '../../components/PostCard';
import axios from 'axios';
import useSWR from 'swr';
import {COLORS} from '../../utils/Colors';

const HomeScreen = () => {
  const getPlate = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };
  const {data, error, isLoading, mutate} = useSWR(
    'plates?populate=host&limit=10&page=1',
    getPlate,
  );

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator color={COLORS.main} />;
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={<CategoriesCarousel />}
        data={data?.plates}
        renderItem={({item}) => (
          <PostCard plate={item} host={item.host} key={item.id} />
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
  mainContainer: {},
});
