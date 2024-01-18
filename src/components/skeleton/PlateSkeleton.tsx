import React, {Fragment} from 'react';
import {Dimensions, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLORS} from '../../utils/Colors';

const windowWidth = Dimensions.get('window').width;

const HeaderSkeleton = () => (
  <SkeletonPlaceholder backgroundColor={COLORS.tranparenSecondary}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width: 60, height: 60, borderRadius: 50}} />
      <View style={{marginStart: 10}}>
        <View style={{width: 260, height: 20, borderRadius: 10}} />
        <View
          style={{width: 160, height: 15, borderRadius: 10, marginTop: 5}}
        />
      </View>
    </View>
  </SkeletonPlaceholder>
);

const PostBodySkeleton = () => (
  <SkeletonPlaceholder backgroundColor={COLORS.tranparenSecondary}>
    <View style={{marginTop: 20}}>
      <View style={{height: 20, borderRadius: 10}} />
      <View style={{height: 20, borderRadius: 10, marginTop: 5}} />
      <View
        style={{width: '80%', height: 20, borderRadius: 10, marginTop: 5}}
      />
      <View style={{height: 250, borderRadius: 10, marginTop: 15}} />
    </View>
  </SkeletonPlaceholder>
);

const PlateSkeleton = () => {
  return (
    <View style={{padding: 10}}>
      <HeaderSkeleton />
      <PostBodySkeleton />
    </View>
  );
};

const PlateSkeletons = () => {
  return (
    <>
      <PlateSkeleton />
      <PlateSkeleton />
      <PlateSkeleton />
    </>
  );
};

export default PlateSkeletons;
