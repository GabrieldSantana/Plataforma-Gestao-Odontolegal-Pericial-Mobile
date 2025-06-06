import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  onEndEditing?: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label, value, onChangeText, placeholder, multiline = false, onEndEditing
}) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && { height: 80 }]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      onEndEditing={onEndEditing}
    />
  </>
);

const styles = StyleSheet.create({
  label: { fontWeight: 'bold', marginTop: 10, marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 5, padding: 10, backgroundColor: '#fff' },
});
