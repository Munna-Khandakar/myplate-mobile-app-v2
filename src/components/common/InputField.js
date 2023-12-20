import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const InputField = ({label, error = false, errorMessage = '', ...rest}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.textInput} {...rest} />
      {error && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
