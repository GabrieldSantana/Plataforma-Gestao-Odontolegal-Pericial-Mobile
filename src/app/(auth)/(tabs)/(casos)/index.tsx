import { Link, router } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import { Searchbar, Button, Text, FAB, ActivityIndicator } from 'react-native-paper';
import { CardCaso } from '../../../../components/CardCaso';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Casos() {
  interface Caso {
    id: string;
    title: string;
    dataDeRegistro: string;
    responsavel: string;
    vitima: string;
    descricao?: string;
  }


  const [searchQuery, setSearchQuery] = useState('');
  const [casos, setCasos] = useState<Caso[]>([]);
  const [refresh, setRefresh] = useState(false);

  async function fetchCasos() {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.log('Token não encontrado');
        return;
      }

      const response = await axios.get("https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/casos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const casosMapeados: Caso[] = response.data.casos.map((caso: any) => ({
        id: caso._id,
        title: caso.nome,
        dataDeRegistro: new Date(caso.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        responsavel: caso.peritoResponsavel?.nome ?? 'Desconhecido',
        vitima: caso.vitima ?? '', // Se tiver esse campo no futuro
        descricao: caso.descricao ?? '',
      }));

      setCasos(casosMapeados);
    } catch (erro) {
      console.error('Erro ao buscar casos:', erro);
    }
  }

  useEffect(() => {
    fetchCasos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbarContainer}>
        <Searchbar
          placeholder="Pesquise um caso"
          onChangeText={setSearchQuery}
          value={searchQuery}
          mode="view"
        />
      </View>
      <View style={styles.contentContainer}>
        <Text variant="headlineMedium" style={styles.titulo}>
          Visualização dos Casos
        </Text>

        <Button
          style={styles.btnFiltrar}
          icon="filter"
          mode="outlined"
          onPress={() => console.log('Botão filtrar acionado')}
        >
          Filtrar
        </Button>

        {!casos || casos.length === 0 ? (
          <View style={styles.carregando}>
            <ActivityIndicator size={'large'} theme={{ colors: { primary: '#1A4D77' } }} />
            <Text variant='titleMedium' style={styles.textCarregando}>Carregando casos ...</Text>
          </View>
        ) : (
          <FlatList
            data={casos}
            renderItem={({ item }) => (
              <CardCaso
                title={item.title}
                dateRegister={item.dataDeRegistro}
                vitima={item.vitima}
                responsavel={item.responsavel}
                casoRota={item.id}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            refreshing={refresh}
            onRefresh={async () => {
              setRefresh(true);
              await fetchCasos();
              setRefresh(false);
            }}
          />
        )}

        <FAB
          icon="plus"
          style={styles.fab}
          label='Adicionar caso'
          color='white'
          onPress={() => router.navigate("./AdicionarCaso")}
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
    marginLeft: 20,
    width: 100,
    marginBottom: 12,
  },
  titulo: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#111E5F',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 30,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1A4D77',
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  textCarregando: {
    color: 'darkblue',
  }
});
