import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface PickerSelectProps {
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
}

export const PickerSelect: React.FC<PickerSelectProps> = ({ selectedValue, onValueChange }) => (
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      <Picker.Item label="Selecione a categoria" value="" />
      <Picker.Item label="Radiografia" value="radiografia" />
      <Picker.Item label="Odontograma" value="odontograma" />
      <Picker.Item label="Outro" value="outro" />
    </Picker>
  </View>
);

const styles = StyleSheet.create({
  pickerContainer: { borderWidth: 1, borderColor: '#999', borderRadius: 5, overflow: 'hidden', backgroundColor: '#fff' },
  picker: { height: 50, width: '100%' },
});
