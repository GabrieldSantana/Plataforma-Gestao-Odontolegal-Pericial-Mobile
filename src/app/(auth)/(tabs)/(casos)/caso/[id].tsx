import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Caso() {
  interface Caso {
    _id: string;
    nome: string;
    local: string;
    descricao: string;
    tipo: string;
    status: string;
    dataHora?: string;
    createdAt: string;
    peritoResponsavel: {
      nome: string;
      email: string;
    };
  }

  const { id } = useLocalSearchParams();
  const [caso, setCaso] = useState<Caso | null>(null);
  const [carregando, setCarregando] = useState(true);


    async function fetchCaso() {
    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
        console.error('Token não encontrado');
        return;
        }

        const response = await axios.get(
        `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/casos/${id}`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

        setCaso(response.data); 
    } catch (erro: any) {
        console.error('Erro ao buscar caso:', erro.response?.data || erro.message);
    } finally {
        setCarregando(false);
    }
    }


  useEffect(() => {
    fetchCaso();
  }, []);

  if (carregando || !caso) {
    return (
      <SafeAreaProvider>
        <Appbar.Header mode="small">
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title="Carregando..." />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1A4D77" />
          <Text>Carregando dados do caso...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
    <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={caso?.nome || 'Detalhes do Caso'} />
    </Appbar.Header>

    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{caso?.nome}</Text>

        <Text style={styles.label}>Local:</Text>
        <Text style={styles.value}>{caso?.local}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{caso?.descricao}</Text>

        <Text style={styles.label}>Tipo:</Text>
        <Text style={styles.value}>{caso?.tipo}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{caso?.status}</Text>

        <Text style={styles.label}>Data e Hora:</Text>
        <Text style={styles.value}>
        {caso?.dataHora ? new Date(caso.dataHora).toLocaleString() : 'N/A'}
        </Text>

        <Text style={styles.label}>Perito Responsável:</Text>
        <Text style={styles.value}>{caso?.peritoResponsavel?.nome} ({caso?.peritoResponsavel?.email})</Text>
    </ScrollView>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    color: '#1A4D77',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
    backgroundColor: '#1A4D77',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
});
