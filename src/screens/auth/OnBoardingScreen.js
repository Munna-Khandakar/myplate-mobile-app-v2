/**
 * Onboarding Screen
 * - Munna Khandakar
 *
 * Here some images and text will be shown only on the initial loading
 * 103 create Onboading Screen
 * 06/10/2022
 */

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  SafeAreaView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import OnBoardingItem from '../../components/OnBoardingItem';
import OnBoardingPaginator from '../../components/OnBoardingPaginator';
import OnBoardingNextButton from '../../components/OnBoardingNextButton';
const data = [
  {
    id: 1,
    title: 'Cook and Share',
    description: 'Compressing objects: 100% (100/100), done. ',
    image: require('../../assets/onboarding/chef.gif'),
  },
  {
    id: 2,
    title: 'Cook and Share',
    description:
      'jects: 100% (112/112), 386.96 KiB | 14.33 MiB/s, done. Total 112-reused 0',
    image: require('../../assets/onboarding/cooking.gif'),
  },
  {
    id: 3,
    title: 'Cook and Share',
    description:
      'Compressing objects: 100% (100/100)MiB/s, done. Total 112 (delta 0), reused 0 (delta 0), pack-reused 0',
    image: require('../../assets/onboarding/order.gif'),
  },
];
const OnBoardingScreen = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < data.length - 1) {
      slideRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      // after last step
      navigation.navigate('HomeScreen');
      // console.log('last item');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={data}
          renderItem={({item}) => <OnBoardingItem item={item} />}
          horizontal
          // showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      <OnBoardingPaginator data={data} scrollX={scrollX} />
      <OnBoardingNextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / data.length)}
      />
    </SafeAreaView>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
