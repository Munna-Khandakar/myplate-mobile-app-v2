import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Controller, UseFormReturn} from 'react-hook-form';
import TitleWithSubtitle from '../../../components/TitleWithSubtitle';
import CategoryItem from './CategoryItem';
import {CategoryItemType} from '../../../types/CategoryItemType';
import {HostPlateType} from '../../../types/HostPlateType';

type HostCarouselProps = {
  form: UseFormReturn<HostPlateType, any, undefined>;
  category: CategoryItemType[];
};

const HostCarousel = (props: HostCarouselProps) => {
  const {form, category} = props;
  const {control, setValue, watch} = form;

  return (
    <View>
      <TitleWithSubtitle
        title={`Select Category`}
        subtitle={`Select the category that suits your plate most →`}
      />

      <Controller
        name={'category'}
        control={control}
        rules={{
          required: {value: true, message: 'Please Select a Category'},
        }}
        render={() => (
          <View style={styles.container}>
            {category.map(item => (
              <CategoryItem
                key={item._id}
                item={item}
                selected={watch('category') == item._id}
                onPress={() => {
                  setValue('category', item._id);
                }}
              />
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default HostCarousel;
