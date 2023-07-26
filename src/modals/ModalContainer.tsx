import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';

interface PropTypes {
  open?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const ModalContainer: React.FC<PropTypes> = ({ open, children, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={onClose}
    >
      <View style={styles.content}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 10,
  },
});

export default ModalContainer;
