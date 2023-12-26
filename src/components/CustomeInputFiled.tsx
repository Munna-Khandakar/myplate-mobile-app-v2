import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardTypeOptions,
} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';

type CustomeInputFiledProps = {
  icon: string;
  text: string;
  action?: () => void;
  value: string;
};
const CustomeInputFiled = (props: CustomeInputFiledProps) => {
  const {icon, text, action, value} = props;
  const image = React.useMemo(
    () => require('./../assets/icons/food-name.png'),
    [icon],
  );

  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>
        <Image source={image} style={{height: 25, width: 25}} />
      </View>
      <TextInput
        style={styles.inputStyle}
        placeholder={text}
        placeholderTextColor={COLORS.main}
        selectionColor={COLORS.main}
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
