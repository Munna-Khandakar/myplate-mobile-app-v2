import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/Colors';

const MenuItem = ({title, subTitle, icon, pressHandler}) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <View style={styles.menuItemContainer}>
        <View
          style={{
            borderRadius: 50,
            padding: 10,
            backgroundColor: COLORS.tranparenSecondary,
          }}>
          <Image source={icon} style={{height: 25, width: 25}} />
        </View>
        <View style={styles.menuItemText}>
          <Text style={styles.MenuItemTitle}>{title}</Text>
          <Text style={styles.MenuItemSubTitle}>{subTitle}</Text>
          <View style={styles.SingleLine} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menuItemContainer: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 10,
    width: '100%',
  },
  MenuItemTitle: {
    fontSize: 15,
    color: COLORS.main,
  },
  MenuItemSubTitle: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  SingleLine: {
    width: '100%',
    borderBottomColor: COLORS.tranparenSecondary,
    borderBottomWidth: 1,
    marginTop: 10,
  },
});
