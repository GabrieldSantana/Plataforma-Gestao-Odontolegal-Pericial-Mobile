import { router } from 'expo-router';
import { TextInput, Text, View, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  function logar(){
    router.navigate("/(tabs)/VisualizacaoCasos");
    console.log('login feito')
  }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar
            backgroundColor="#F2F4FF" // Usar transparente para o degradê aparecer por trás
            hidden={false}
          
        />
        <Image source={require('../../assets/logo-gop.png')} 
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
          <TouchableOpacity style={styles.button} onPress={logar}>
            <Text style={styles.textButton}>Login</Text>
          </TouchableOpacity>

        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    alignItems: 'center',
    backgroundColor: "#F2F4FF",
  },

  formulario: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    paddingHorizontal: 20,
  },

  titulo: {
    fontWeight: 'bold',
    color: '#133756',
    fontSize: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#00000066',
    width: 300,
    padding: 15,
    color: '#000',
    borderRadius: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#111E5F',
    padding: 15,
    width: 220,
    borderRadius: 10,
  },

  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});