import { TextInput, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { styles } from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Login() {
  let onPress = () => {
    console.log('Clicou em logar');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#fff', '#fff', '#fff', '#05458E']}
        style={styles.gradient}
      >
        <StatusBar
          backgroundColor="transparent" // Usar transparente para o degradê aparecer por trás
          hidden={false}
          
        />
        <Image source={require('../../../assets/logo-gop.png')} 
        />
        <View style={styles.formulario}>
          <Text style={styles.titulo}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#00000066"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#00000066"
          />
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}