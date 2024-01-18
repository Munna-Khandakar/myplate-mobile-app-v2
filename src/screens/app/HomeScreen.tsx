import {Text, FlatList, View} from 'react-native';
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
    <View>
      <FlatList
        ListHeaderComponent={
          <CategoriesCarousel onPressHandler={onPressHandler} />
        }
        ListHeaderComponentStyle={{marginVertical: 10}}
        ItemSeparatorComponent={() => (
          <View style={{height: 10, backgroundColor: 'transparent'}} />
        )}
        data={data?.plates}
        renderItem={({item}) => (
          <PostCard plate={item} host={item.host} key={item._id} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={plate => plate._id}
      />
      {isLoading && <PlateSkeletons />}
    </View>
  );
};

export default HomeScreen;
