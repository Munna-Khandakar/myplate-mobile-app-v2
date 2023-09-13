import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';

const Navbar = () => {
  return (
    <>
      <View style={styles.navItemContainer}>
        <TouchableOpacity>
          <Image
            source={require('../assets/icons/direction.png')}
            style={styles.navItem}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/icons/more.png')}
            style={styles.navItem}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/icons/delivery-man.png')}
            style={styles.navItem}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/icons/video.png')}
            style={styles.navItem}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/icons/menu.png')}
            style={styles.navItem}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 5,
          marginLeft: 10,
          marginRight: 10,
          borderBottomWidth: 1,
          borderBottomColor: COLORS.secondary,
        }}></View>
    </>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
