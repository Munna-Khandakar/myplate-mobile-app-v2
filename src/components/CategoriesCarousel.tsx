import {FlatList, Text, View} from 'react-native';
import React, {useState} from 'react';
import useSWR from 'swr';
import {getCategory} from '../requests/category';
import {CategoryItemType} from '../types/CategoryItemType';
import CategoryItemChip from './CategoryItemChip';
import CategoryItemChipSkeleton from './skeleton/CategoryItemChipSkeleton';

type CategoriesCarouselProps = {
  onPressHandler: (item: CategoryItemType) => void;
};

const CategoriesCarousel = (props: CategoriesCarouselProps) => {
  const {onPressHandler} = props;
  const [selectedItem, setSelectedItem] = useState('');
  const {data, isLoading} = useSWR<CategoryItemType[]>('category', getCategory);

  const onClickItem = (item: CategoryItemType) => {
    onPressHandler(item);
    if (item._id == selectedItem) {
      setSelectedItem('');
    } else {
      setSelectedItem(item._id);
    }
  };

  if (isLoading) {
    return <CategoryItemChipSkeleton />;
  }

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <CategoryItemChip
          item={item}
          isSelected={item?._id == selectedItem}
          onClick={onClickItem}
        />
      )}
      keyExtractor={item => item._id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default CategoriesCarousel;
