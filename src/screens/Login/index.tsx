import { TextInput, Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';

export function Login() {
  return (
    <LinearGradient
      colors={['#fff', '#fff', '#fff', '#05458E']}
      style={styles.container}
    >
      <Image source={require('../../../assets/logo-gop.png')} />
      <View style={styles.formulario}>
        <Text style={styles.titulo}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="CPF"
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          placeholderTextColor='black'
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}