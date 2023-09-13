import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';

const TitleWithSubtitle = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default TitleWithSubtitle;

const styles = StyleSheet.create({
  container: {marginTop: 10, marginBottom: 10},
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.main,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.main,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
});
