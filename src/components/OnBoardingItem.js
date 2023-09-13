import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';

const OnBoardingItem = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    // height: 500,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 10,
    color: COLORS.main,
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: COLORS.secondary,
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
