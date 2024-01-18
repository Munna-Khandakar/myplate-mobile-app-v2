import React from 'react';
import {Dimensions, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLORS} from '../../utils/Colors';

const windowWidth = Dimensions.get('window').width;
const width = windowWidth / 5 - 15;

const CategoryItemChipSkeleton = () => {
  return (
    <SkeletonPlaceholder backgroundColor={COLORS.tranparenSecondary}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginLeft: 10,
        }}>
        <View style={{width: width, height: 40, borderRadius: 8}} />
        <View style={{width: width, height: 40, borderRadius: 8}} />
        <View style={{width: width, height: 40, borderRadius: 8}} />
        <View style={{width: width, height: 40, borderRadius: 8}} />
        <View style={{width: width, height: 40, borderRadius: 8}} />
      </View>
    </SkeletonPlaceholder>
  );
};

export default CategoryItemChipSkeleton;
