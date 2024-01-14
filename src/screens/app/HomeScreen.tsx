import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import CategoriesCarousel from '../../components/CategoriesCarousel';
import PostCard from '../../components/PostCard';

import {COLORS} from '../../utils/Colors';
import PlateSkeletons from '../../components/skeleton/PlateSkeleton';
import CategoryCardSkeleton from '../../components/skeleton/CategoryCardSkeleton';

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
    return <PlateSkeletons />;
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={<CategoriesCarousel />}
        data={data?.plates}
        renderItem={({item}) => (
          <PostCard plate={item} host={item.host} key={item._id} />
        )}
        keyExtractor={plate => plate._id}
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
