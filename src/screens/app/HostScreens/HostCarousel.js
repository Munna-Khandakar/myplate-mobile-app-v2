import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {COLORS} from '../../../utils/Colors';
import {CategoriesCarouselItems} from '../../../utils/CategoriesCarouselItems';
import TitleWithSubtitle from '../../../components/TitleWithSubtitle';
import usePlateStore from '../../../stores/plateStore';

const windowWidth = Dimensions.get('window').width;
const HostCarousel = () => {
  const newPlate = usePlateStore(state => state.newPlate);
  const storeNewPlate = usePlateStore(state => state.storeNewPlate);

  const CategoryItem = ({item}) => {
    const pressHandler = params => {
      storeNewPlate({...newPlate, category: params});
    };
    return (
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          {
            borderColor: `${
              newPlate?.category?.id == item?.id
                ? COLORS.main
                : COLORS.tranparenSecondary
            }`,
          },
        ]}
        onPress={() =>
          pressHandler({id: item?.id, type: item?.type, slug: item?.slug})
        }>
        <Image source={item.icon} style={styles.categoryIcon} />
        <Text style={{textAlign: 'center', color: COLORS.main, fontSize: 15}}>
          {item.type}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TitleWithSubtitle
        title={`Select Category`}
        subtitle={`Select the category that suits your plate most →`}
      />
      <FlatList
        data={CategoriesCarouselItems}
        renderItem={({item}) => <CategoryItem item={item} />}
        keyExtractor={item => item.id}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
        }}
      />
    </View>
  );
};

export default HostCarousel;

const styles = StyleSheet.create({
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginLeft: 10,
    marginTop: 5,
    height: 100,
    width: windowWidth / 3 - 15,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'rgba(56, 44, 44, 0.1)',
  },
  categoryIcon: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
});
