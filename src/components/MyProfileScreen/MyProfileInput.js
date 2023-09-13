import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

import {COLORS} from '../../utils/Colors';

const MyProfileInput = ({
  label,
  onChangeText = () => {},
  value,
  edit = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <Text style={{paddingVertical: 2, fontWeight: '600'}}>{label}</Text>
        <TextInput
          onChangeText={onChangeText}
          value={value}
          style={[styles.input, {backgroundColor: edit ? 'white' : '#B2BEB5'}]}
          editable={edit}
        />
      </View>
    </View>
  );
};

export default MyProfileInput;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: COLORS.tranparenSecondary,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  icon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.main,
    paddingVertical: 10,
    borderRadius: 5,
    color: COLORS.main,
    paddingLeft: 5,
  },
});
