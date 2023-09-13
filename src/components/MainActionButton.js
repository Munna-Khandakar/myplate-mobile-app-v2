import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../utils/Colors';

const MainActionButton = ({text, pressHandler}) => {
  const [loading, setLoading] = useState(false);
  const onPressHandler = async () => {
    setLoading(true);
    Vibration.vibrate(1);
    await pressHandler();
    setLoading(false);
  };
  return (
    <TouchableOpacity style={styles.ButtonContainer} onPress={onPressHandler}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.ButtonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default MainActionButton;

const styles = StyleSheet.create({
  ButtonContainer: {
    margin: 10,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
