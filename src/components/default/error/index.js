import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ErrorPopup = ({ isVisible, onClose, errorData }) => {
  const onClosePopup = () => {
    onClose();
  };

  console.log(errorData);

  const renderErrorMessage = () => {
    if (typeof errorData === 'string') {
      // Se a mensagem de erro for uma string simples
      return <Text style={styles.errorMessage}>{errorData}</Text>;
    } else if (Array.isArray(errorData)) {
      // Se a mensagem de erro for um array
      return errorData.map((error, index) => (
        <Text key={index} style={styles.errorMessage}>
          {error}
        </Text>
      ));
    } else if (typeof errorData === 'object' && errorData !== null) {
      // Se a mensagem de erro for um objeto
      return (
        <Text style={styles.errorMessage}>
          {JSON.stringify(errorData)}
        </Text>
      );
    } else {
      return null;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.popup}>
          <View style={styles.headerPopup}>
            <TouchableOpacity onPress={onClosePopup}>
              <Icon name="close" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            {renderErrorMessage()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  headerPopup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom: 20,
  },
  popup: {
    backgroundColor: '#FF6347',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%'
  },
  errorMessage: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16
  }
});

export default ErrorPopup;
