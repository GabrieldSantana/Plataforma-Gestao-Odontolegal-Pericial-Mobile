import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { Portal, Modal, PaperProvider, Button } from 'react-native-paper';

interface PropsCardEvidencia{
  nome: string,
  abrirModal: () => void
  updateIdModel: () => void
  updateTipo: () => void
}


const CardEvidencia = ({nome, abrirModal, updateIdModel, updateTipo}: PropsCardEvidencia) => {

  function updateCard(){
    updateIdModel()
    updateTipo()
  }

  return (
    <PaperProvider>
      
        <View style={styles.container}>
          <Icon name="image" size={24} color="#000" style={styles.icon} />
          <Text style={styles.text}>{nome}</Text>
          <TouchableOpacity style={styles.menuIcon} onPress={abrirModal} onPressIn={updateCard}>
            <Icon name="more-vert" size={24} color="#111E5F" />
          </TouchableOpacity>
        </View>
      

      
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
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