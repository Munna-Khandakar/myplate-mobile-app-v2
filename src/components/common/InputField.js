import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from '../../utils/Colors';

const InputField = ({
  label,
  error = false,
  errorMessage = '',
  isPassword = false,
  togglePasswordVisibility = null,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible(prev => !prev);
    if (togglePasswordVisibility) {
      togglePasswordVisibility(isPasswordVisible);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={{position: 'relative'}}>
        <TextInput
          style={styles.textInput}
          placeholderTextColor={COLORS.main}
          selectionColor={COLORS.main}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={handlePasswordVisibilityToggle}>
            {isPasswordVisible ? (
              <Image
                source={require('../../assets/eye-on.png')}
                style={styles.eyeIcon}
              />
            ) : (
              <Image
                source={require('../../assets/eye-off.png')}
                style={styles.eyeIcon}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
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
    color: COLORS.main,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  eyeIcon: {
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    marginRight: 5,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
