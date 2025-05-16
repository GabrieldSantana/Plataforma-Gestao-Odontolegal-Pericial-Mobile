import {Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { FormContainer } from '../../components/FormContainer';
import { InputField } from '../../components/InputField';


export function CadastroNovoCaso() {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar
            backgroundColor="#111E5F"
            hidden={false}     
        />
        <View>
          {/* Formulario */}
          <FormContainer title="Cadastre novo caso">
            <InputField label="Título*" placeholder="Digite o título do caso"/>

            <InputField label="Local*" placeholder="Digite o local do caso"/>

            <InputField label="Descrição*" placeholder="Digite a descrição do caso"/>

          </FormContainer>
        </View>
    </SafeAreaView>
  );
}
