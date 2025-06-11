import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import styles from '../../../../src/styles/perfil.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
// Interface para os dados do usuário
interface Usuario {
  __v: number;
  id?: string;
  nome?: string;
  email?: string;
  cargo?: string;
  cpf?: string;
}

export default function Perfil() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Função para buscar dados do perfil
  const fetchDadosPerfil = async (): Promise<void> => {
    try {
      const json = await AsyncStorage.getItem('usuario');
      if (json === null) {
        setUsuario(null);
        return;
      }
      const usuarioDados: Usuario = JSON.parse(json);
      setUsuario(usuarioDados);
    } catch (error) {
      console.error('Erro ao buscar dados do perfil:', error);
      setUsuario(null);
      Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
    }
  };

  // Função de logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      router.replace('/index.tsx'); // Ajustado para '/', assumindo que é a tela de login
      Alert.alert('Sucesso', 'Você foi deslogado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchDadosPerfil();
  }, []);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}

      {/* Imagem de Perfil */}
      <View style={styles.profileImageContainer}>
        <View>
             <FontAwesome size={80} name="user-circle-o" color='#999999' />
        </View>
        
        <Text style={styles.name}>{usuario?.nome || 'Carregando...'}</Text>
      </View>

      {/* Informações do Usuário */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.label}>CPF</Text>
          <Text style={styles.value}>{usuario?.cpf || '-'}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.value}>{usuario?.email || '-'}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.label}>Cargo</Text>
          <Text style={styles.value}>{usuario?.cargo || '-'}</Text>
        </View>
      </View>

      {/* Botão de Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}