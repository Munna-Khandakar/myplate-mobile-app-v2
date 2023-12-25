import React from 'react';
import {FlatList, View} from 'react-native';
import {Controller, FieldValues, UseFormReturn} from 'react-hook-form';
import TitleWithSubtitle from '../../../components/TitleWithSubtitle';
import CategoryItem from './CategoryItem';

import {CategoryItemType} from '../../../types/CategoryItemType';

type HostCarouselProps = {
  form: UseFormReturn<FieldValues, any, undefined>;
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
          <FlatList
            data={category}
            renderItem={({item}) => (
              <CategoryItem
                key={item._id}
                item={item}
                selected={watch('category') == item._id}
                onPress={() => {
                  setValue('category', item._id);
                }}
              />
            )}
            keyExtractor={item => item._id}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          />
        )}
      />
    </View>
  );
};

export default HostCarousel;
