import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { TextInput, Text, View, Image, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function logar() {
    try {
      const resposta = await fetch('https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok || !dados.token || !dados.usuario) {
        alert(dados.erro || 'E-mail ou senha incorretos.');
        return;
      }

      // Salvar token
      await AsyncStorage.setItem('token', dados.token);

      // Remover senha e salvar usuário
      const { senha: _, ...usuarioSemSenha } = dados.usuario || {};
      await AsyncStorage.setItem('usuario', JSON.stringify(usuarioSemSenha));

      // Navegar para a tela principal
      router.replace('/(auth)/(tabs)/(casos)');

    } catch (err) {
      console.error('Erro na requisição:', err);
      alert('Erro de conexão. Verifique sua internet ou tente novamente mais tarde.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F2F4FF" hidden={false} />
      <Image source={require('../../assets/logo-gop.png')} />
      <View style={styles.formulario}>
        <Text style={styles.titulo}>Loginn</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#00000066"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#00000066"
          value={senha}
          secureTextEntry
          onChangeText={setSenha}
        />
        <TouchableOpacity style={styles.button} onPress={logar}>
          <Text style={styles.textButton}>Loginn</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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