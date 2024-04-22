import React from 'react';
import { Modal,View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default UserModal = ({isVisible, onClose, userData}) => {
    const onCloseModal = () => {
        onClose();
      };
    
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={onClose}
        >
          <View style={styles.containerModal}>
            <View style={styles.modalHeader}>
                <Text>Titulo do Modal</Text>
                <TouchableOpacity onPress={onCloseModal}>
                    <Icon name="close" size={30} color='#fff'/>
                </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <Text>{userData.name}</Text>
            </View>

          </View>
        </Modal>
    );
} 

const styles = StyleSheet.create({
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        width: '90%'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000000',
        width: '90%',
        padding: 20,
    }
});