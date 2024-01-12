import {StyleSheet, View, FlatList, Animated, SafeAreaView} from 'react-native';
import React, {useState, useRef} from 'react';
import OnBoardingItem from '../../components/OnBoardingItem';
import OnBoardingPaginator from '../../components/OnBoardingPaginator';
import OnBoardingNextButton from '../../components/OnBoardingNextButton';
import {useNavigation} from '@react-navigation/native';

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
const OnBoardingScreen = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  //@ts-ignore
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < data.length - 1) {
      //@ts-ignore
      slideRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      //@ts-ignore
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          data={data}
          renderItem={({item}) => <OnBoardingItem item={item} />}
          horizontal
          pagingEnabled
          bounces={false}
          //@ts-ignore
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
