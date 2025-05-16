import { Text, View, TextInput } from 'react-native';
import { styles } from './styles';

interface InputFieldProps {
  label: string,
  placeholder: string,
}

export function InputField({ label, placeholder }: InputFieldProps) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput placeholder={placeholder} />
    </View>
  );
}