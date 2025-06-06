import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { Portal, Modal, PaperProvider, Button } from 'react-native-paper';

const CardEvidencia = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Icon name="image" size={24} color="#000" style={styles.icon} />
        <Text style={styles.text}>Imagens do local</Text>
        <TouchableOpacity style={styles.menuIcon} onPress={showModal}>
          <Icon name="more-vert" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Opções de Imagens do Local</Text>
          </View>
          <Button
            mode="text"
            onPress={() => {
              console.log('Clicou em Visualizar');
              hideModal();
            }}
            style={styles.modalButton}
          >
            Visualizar
          </Button>
          <Button
            mode="text"
            onPress={() => {
              console.log('Clicou em Excluir');
              hideModal();
            }}
            style={styles.modalButton}
            textColor="#FF0000"
          >
            Excluir
          </Button>
          <Button
            mode="text"
            onPress={hideModal}
            style={styles.modalButton}
          >
            Fechar
          </Button>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  menuIcon: {
    padding: 5,
  },
  modalContainer: {
    backgroundColor: 'pink',
    margin: 20,
    borderRadius: 8,
    position: 'relative',
    top: -50,
  },
  modalTitleContainer: {
    backgroundColor: 'red',
    paddingVertical: 10,
    borderRadius: 6,
    width: '100%',
    },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalButton: {
    marginVertical: 5,
  },
});

export default CardEvidencia;