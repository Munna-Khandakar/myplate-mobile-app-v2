import {Modal, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../utils/Colors';

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const CustomModal = (props: CustomModalProps) => {
  const {isOpen = false, onClose, children} = props;
  const [modalVisible, setModalVisible] = useState(isOpen);

  useEffect(() => {
    setModalVisible(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setModalVisible(!modalVisible);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}>
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 10,
    width: '90%',
    backgroundColor: COLORS.tranparenSecondary,
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
});
