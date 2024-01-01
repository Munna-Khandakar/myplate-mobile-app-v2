import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {AddressType} from '../../types/AddressType';
import {COLORS} from '../../utils/Colors';

const DATA: AddressType[] = [
  {
    _id: '656a0e805f8ebe981c526584',
    description:
      'Mirpur DOHS,Dhaka 2  Clicking this, myplate delivery system will not deliver your plate.',
    title: 'DOHS Office',
  },
  {
    _id: '656af7b3ff1b1fe701b31481',
    description: 'Mirpur DOHS',
    title: 'New Office',
  },
  {
    _id: '6590fdadc0adecba57c4e593',

    description: 'Mirpur DOHS,Dhaka 2',
    title: 'Office 2 Test',
  },
  {
    _id: '656a0e805f8ebe981c5265841',
    description: 'Mirpur DOHS,Dhaka 2',
    title: 'DOHS Office',
  },
  {
    _id: '656af7b3ff1b1fe701b314811',
    description: 'Mirpur DOHS',
    title: 'New Office',
  },
  {
    _id: '6590fdadc0adecba57c4e5931',
    description: 'Mirpur DOHS,Dhaka 2',
    title: 'Office 2 Test',
  },
];

type AddressPickerProps = {
  onSelect: (address: AddressType) => void;
  selectedId?: string;
  height?: number;
};

const AddressPicker = (props: AddressPickerProps) => {
  const {onSelect, selectedId = '', height = 180} = props;
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [selectedId]);

  const onClick = (address: AddressType) => {
    onSelect(address);
  };
  return (
    <View style={{height: height}}>
      <FlatList
        key={key}
        data={DATA}
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
