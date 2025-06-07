import React from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

interface InputFieldProps {
  label?: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  editable?: boolean;
  style?: object;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  multiline = false,
  keyboardType = 'default',
  editable = true,
  style,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
        editable={editable}
        style={[styles.input, multiline && styles.multiline, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { marginBottom: 6, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: 'white',
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
});

export default InputField;
