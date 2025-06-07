import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface OdontogramaInputProps {
  regiao: string;
  items: string[];
  onChange: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

const OdontogramaInput: React.FC<OdontogramaInputProps> = ({
  regiao,
  items,
  onChange,
  onAdd,
  onRemove,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{regiao}</Text>
      {items.map((item, idx) => (
        <View key={idx} style={styles.row}>
          <TextInput
            placeholder={`Item ${idx + 1}`}
            value={item}
            onChangeText={(text) => onChange(idx, text)}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => onRemove(idx)} style={styles.btnRemove}>
            <Feather name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={onAdd}>
        <Text style={styles.addBtn}>+ Adicionar item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 18 },
  title: { fontWeight: 'bold', marginBottom: 8, fontSize: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
  },
  btnRemove: { marginLeft: 8 },
  addBtn: { color: '#007bff' },
});

export default OdontogramaInput;
