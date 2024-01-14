import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HeaderSkeleton = () => (
  <SkeletonPlaceholder>
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
  <SkeletonPlaceholder>
    <View style={{marginTop: 20}}>
      <View style={{width: '95%', height: 20, borderRadius: 10}} />
      <View
        style={{width: '95%', height: 20, borderRadius: 10, marginTop: 5}}
      />
      <View
        style={{width: '70%', height: 20, borderRadius: 10, marginTop: 5}}
      />
      <View
        style={{width: '95%', height: 250, borderRadius: 10, marginTop: 15}}
      />
    </View>
  </SkeletonPlaceholder>
);

const PlateSkeleton = () => {
  return (
    <View
      style={{
        margin: 10,
        padding: 10,
      }}>
      <HeaderSkeleton />
      <PostBodySkeleton />
    </View>
  );
};

const PlateSkeletons = () => {
  return (
    <View>
      <PlateSkeleton />
      <PlateSkeleton />
      <PlateSkeleton />
    </View>
  );
};

export default PlateSkeletons;
