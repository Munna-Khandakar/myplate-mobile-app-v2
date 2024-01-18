import React from 'react';
import {Dimensions, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const windowWidth = Dimensions.get('window').width;
const width = windowWidth / 3 - 15;

const CategoryCardSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: width, height: 150, borderRadius: 10}} />
        <View style={{width: width, height: 150, borderRadius: 10}} />
        <View style={{width: width, height: 150, borderRadius: 10}} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default CategoryCardSkeleton;
