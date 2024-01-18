import {Text, FlatList} from 'react-native';
import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import CategoriesCarousel from '../../components/CategoriesCarousel';
import PostCard from '../../components/PostCard';
import PlateSkeletons from '../../components/skeleton/PlateSkeleton';
import {CategoryItemType} from '../../types/CategoryItemType';

const HomeScreen = () => {
  const getPlate = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };
  const {data, error, isLoading} = useSWR(
    'plates?populate=host&limit=10&page=1',
    getPlate,
  );

  const onPressHandler = (item: CategoryItemType) => {
    console.log(item);
  };

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <FlatList
      ListHeaderComponent={
        <CategoriesCarousel onPressHandler={onPressHandler} />
      }
      data={data?.plates}
      renderItem={
        isLoading
          ? () => <PlateSkeletons />
          : ({item}) => (
              <PostCard plate={item} host={item.host} key={item._id} />
            )
      }
      showsVerticalScrollIndicator={false}
      keyExtractor={plate => plate._id}
    />
  );
};

export default HomeScreen;
