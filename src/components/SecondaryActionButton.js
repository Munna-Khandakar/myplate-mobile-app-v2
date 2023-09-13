import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';

const SecondaryActionButton = ({text, pressHandler}) => {
  return (
    <TouchableOpacity style={styles.ButtonContainer} onPress={pressHandler}>
      <Text style={styles.ButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryActionButton;

const styles = StyleSheet.create({
  ButtonContainer: {
    margin: 10,
    borderRadius: 10,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.main,
    borderWidth: 1,
    flex: 1,
  },
  ButtonText: {
    color: COLORS.main,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
