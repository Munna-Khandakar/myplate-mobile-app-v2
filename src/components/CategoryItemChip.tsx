import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {CategoryItemType} from '../types/CategoryItemType';
import {COLORS} from '../utils/Colors';

type CategoryItemChipProps = {
  item: CategoryItemType;
  isSelected: boolean;
  onClick: (item: CategoryItemType) => void;
};

const CategoryItemChip = (props: CategoryItemChipProps) => {
  const {item, isSelected = false, onClick} = props;

  return (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        {
          borderColor: `${
            isSelected ? COLORS.main : COLORS.tranparenSecondary
          }`,
          borderWidth: isSelected ? 2 : 1,
        },
      ]}
      onPress={() => {
        onClick(item);
      }}>
      <Text
        style={{
          textAlign: 'center',
          color: COLORS.main,
          fontSize: 10,
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryItemChip;

const styles = StyleSheet.create({
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    height: 40,
    borderRadius: 8,
  },
});
