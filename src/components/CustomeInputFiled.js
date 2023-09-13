import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';

const CustomeInputFiled = ({icon, text, action, keyborardType, value}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={{height: 25, width: 25}} />
      </View>
      <TextInput
        style={styles.inputStyle}
        placeholder={text}
        placeholderTextColor={COLORS.main}
        selectionColor={COLORS.main}
        keyboardType={keyborardType ? keyborardType : 'default'}
        onChangeText={action}
        value={value}
      />
    </View>
  );
};

export default CustomeInputFiled;

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    height: 40,
    borderBottomColor: COLORS.tranparenSecondary,
    borderBottomWidth: 1,
  },
  iconContainer: {
    backgroundColor: COLORS.tranparenSecondary,
    height: 40,
    width: 40,
    margin: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
