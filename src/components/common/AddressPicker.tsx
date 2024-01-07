import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {AddressType} from '../../types/AddressType';
import {COLORS} from '../../utils/Colors';
import useSWR from 'swr';
import {getAddress} from '../../requests/address';

type AddressPickerProps = {
  onSelect: (address: AddressType) => void;
  selectedId?: string;
  height?: number;
};

const AddressPicker = (props: AddressPickerProps) => {
  const {onSelect, selectedId = '', height = 180} = props;
  const [key, setKey] = useState(0);
  const {data, error, isLoading, mutate} = useSWR<AddressType[]>(
    'address',
    getAddress,
  );

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [selectedId]);

  const onClick = (address: AddressType) => {
    onSelect(address);
  };

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator size="small" color={COLORS.main} />;
  }

  return (
    <View style={{height: height}}>
      <FlatList
        key={key}
        data={data}
        renderItem={({item}) => {
          const isSelected = item._id == selectedId;

          return (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                {
                  backgroundColor: isSelected ? '#ccc' : '',
                },
              ]}
              onPress={() => {
                onClick(item);
              }}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.main,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.main,
  },
});

export default AddressPicker;
