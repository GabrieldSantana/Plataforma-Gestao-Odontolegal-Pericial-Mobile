import {Text, View, ScrollView, TextInput } from 'react-native';
import { styles } from './styles'
import { InputField } from '../InputField';

interface FormContainerProps{
    title: string,
    children: React.ReactNode,
}

export function FormContainer({title, children}: FormContainerProps) {
  return (
    <ScrollView>
        <Text style={styles.nomeFormulario}>{title}</Text>
        {children}
    </ScrollView>
  );
}
