import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {CategoryItemType} from '../../../types/CategoryItemType';
import {COLORS} from '../../../utils/Colors';
import {UseFormSetValue} from 'react-hook-form';

type CategoryItemProps = {
  selected?: boolean;
  item: CategoryItemType;
};
const windowWidth = Dimensions.get('window').width;

const CategoryItem = (props: any) => {
  const {selected, item, ...rest} = props;

  return (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        {
          borderColor: `${selected ? COLORS.main : COLORS.tranparenSecondary}`,
        },
      ]}
      {...rest}>
      <Image
        source={require('./../../../assets/icons/nachos.png')}
        style={styles.categoryIcon}
      />
      <Text style={{textAlign: 'center', color: COLORS.main, fontSize: 15}}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItem;

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
