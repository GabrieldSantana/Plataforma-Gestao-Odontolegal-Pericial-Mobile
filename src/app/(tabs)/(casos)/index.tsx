import { Link, router } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, FlatList, SafeAreaView, View, Alert } from 'react-native';
import { Searchbar, Button, Text, FAB } from 'react-native-paper';
import { CardCaso } from '../../../components/CardCaso';

export const DATA = [
  {
    id: '1',
    title: 'Identificação de vítima',
    dataDeRegistro: '12/02/2023',
    responsavel: 'Dr Marcos Silva',
    vitima: 'Geovane Correia',
    descricao: 'djfhakljfashflkdsjfh'
  },
  {
    id: '2',
    title: 'Mordida forense em agressão',
    dataDeRegistro: '25/03/2021',
    responsavel: 'Dr Marcos Silva',
    vitima: 'Ket Silva',
  },
  {
    id: '3',
    title: 'Marcas de mordida em casos de abuso infantil',
    dataDeRegistro: '14/01/2022',
    responsavel: 'Dr Marcos Silva',
    vitima: 'Alice',
  },
  {
    id: '4',
    title: 'Reconhecimento de cadáver no Ibura',
    dataDeRegistro: '11/12/2024',
    responsavel: 'Dr Marcos Silva',
    vitima: 'João Gabriel',
  },
  {
    id: '5',
    title: 'Agressão doméstica',
    dataDeRegistro: '11/12/2024',
    responsavel: 'Dr Marcos Silva',
    vitima: 'Rhuan',
  },
];

export default function Casos() {
    interface Caso {
        id: string;
        title: string;
        dataDeRegistro: string;
        responsavel: string;
        vitima: string;
        descricao?: string; // Opcional, já que nem todos os objetos têm essa propriedade
    }

  const [searchQuery, setSearchQuery] = useState('');
  const [casos, setCasos] = useState<Caso[]>([]);


  const fetchCasos = async () => {
  try {
    const response = await axios.get('http://192.168.1.62:3000/casos', { timeout: 10000 });
    const data: Caso[] = Array.isArray(response.data)
      ? response.data
      : response.data.casos && Array.isArray(response.data.casos)
      ? response.data.casos
      : [];
    setCasos(data);
    console.log('API encontrada, dados processados:', data);
    if (data.length === 0) {
      Alert.alert('Aviso', 'Nenhum caso retornado pela API.');
    }
  } catch (error) {
    console.error('Erro ao buscar casos:', error);
    setCasos([]);
    Alert.alert('Erro', 'Falha ao carregar os casos: ' + (error as Error).message);
  }
};
  useEffect(() => {
    fetchCasos();}, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Searchbar
          placeholder="Pesquise um caso"
          onChangeText={setSearchQuery}
          value={searchQuery}
          mode="view"
        />
        <Button
          style={styles.btnFiltrar}
          icon="filter"
          mode="outlined"
          onPress={() => console.log('Botão de filtro pressionado')}
        >
          Filtrar
        </Button>
      </View>
      <View style={styles.contentContainer}>
        <Text variant="headlineMedium" style={styles.titulo}>
          Visualização dos Casos
        </Text>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <CardCaso title={item.title} dateRegister={item.dataDeRegistro} vitima={item.vitima} responsavel={item.responsavel} casoRota={item.id}/>}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />
         <FAB
            icon="plus"
            style={styles.fab}
            label='Adicionar caso'
            color='white'
            onPress={() => console.log('Botão de adicionar caso acionado')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  navbarContainer: {
    paddingHorizontal: 12,
    paddingTop: 20,
    gap: 20,
  },
  btnFiltrar: {
    width: 100,
  },
  titulo: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#111E5F',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1, // Garante que o contêiner ocupe o espaço restante
  },
  flatListContent: {
    paddingBottom: 30, // Espaço extra no final da lista
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1A4D77',
  },
});