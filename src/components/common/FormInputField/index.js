import {View, Text, Image, TextInput} from 'react-native';
import React from 'react';
import {COLORS} from '../../../utils/Colors';

const FormInputField = ({
  icon,
  placeholder,
  onChangeHandlar,
  value,
  secureTextEntry = false,
  children,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      <Image
        source={icon}
        style={{
          height: 20,
          width: 20,
          resizeMode: 'stretch',
          marginRight: 5,
        }}
      />
      <TextInput
        placeholder={placeholder}
        style={{flex: 1, paddingVertical: 0, color: COLORS.main}}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeHandlar}
      />
      {children && children}
    </View>
  );
};

export default FormInputField;
