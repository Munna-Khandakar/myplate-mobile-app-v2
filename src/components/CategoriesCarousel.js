import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/Colors';
import {useState} from 'react';

const data = [
  {
    id: 1,
    type: 'Breakfast',
    slug: 'breakfast',
    icon: require('../assets/icons/cup.png'),
  },
  {
    id: 2,
    type: 'Lunch',
    slug: 'lunch',
    icon: require('../assets/icons/fried-rice.png'),
  },
  {
    id: 3,
    type: 'Dinner',
    slug: 'dinner',
    icon: require('../assets/icons/dinner.png'),
  },
  {
    id: 4,
    type: 'Side Dish',
    slug: 'side_dish',
    icon: require('../assets/icons/nachos.png'),
  },
  {
    id: 5,
    type: 'Frozen',
    slug: 'frozen',
    icon: require('../assets/icons/cooler.png'),
  },
];

const CategoriesCarousel = ({onPressHandler = () => {}}) => {
  const [active, setActive] = useState(1);

  const CategoryItem = ({item}) => {
    const pressHandler = id => {
      setActive(id);
      onPressHandler(item);
    };
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          {
            borderColor: `${
              active == item?.id ? COLORS.main : COLORS.tranparenSecondary
            }`,
          },
        ]}
        onPress={() => pressHandler(item?.id)}>
        <Image source={item.icon} style={styles.categoryIcon} />
        <Text style={{textAlign: 'center', color: COLORS.main, fontSize: 10}}>
          {item.type}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <CategoryItem item={item} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesCarousel;

const styles = StyleSheet.create({
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    marginTop: 5,
    height: 50,
    width: 70,
    borderRadius: 10,
    borderWidth: 2,
  },
  categoryIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
