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
    status: string;
  }

  const [searchQuery, setSearchQuery] = useState('');
  const [casos, setCasos] = useState<Caso[]>([]);
  const [filteredCasos, setFilteredCasos] = useState<Caso[]>([]);
  const [refresh, setRefresh] = useState(false);

  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  async function fetchCasos() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('Token não encontrado');
        return;
      }

      const response = await axios.get("https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/casos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const casosMapeados: Caso[] = response.data.casos.reverse().map((caso: any) => ({
        id: caso._id,
        title: caso.nome,
        dataDeRegistro: new Date(caso.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric'
        }),
        responsavel: caso.peritoResponsavel?.nome ?? 'Desconhecido',
        vitima: caso.vitima ?? '',
        descricao: caso.descricao ?? '',
        status: caso.status ?? 'Em andamento',
      }));

      setCasos(casosMapeados);
      setFilteredCasos(casosMapeados);
    } catch (erro) {
      console.error('Erro ao buscar casos:', erro);
    }
  }

  useEffect(() => {
    let filtered = casos;

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(caso =>
        caso.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(caso =>
        caso.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredCasos(filtered);
  }, [searchQuery, statusFilter, casos]);

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
          mode="bar"
          style={{
            width: 335,
            height: 55,
            backgroundColor: 'transparent',
            margin: 'auto',
            borderRadius: 10,
            borderBlockColor: '#00000046',
            borderWidth: 1.5
          }}
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
          onPress={() => setShowFilterOptions(!showFilterOptions)}
        >
          Filtrar
        </Button>

        {/* Filtros em coluna */}
        {showFilterOptions && (
          <View style={styles.filterButtonsContainer}>
            {['Em andamento', 'Finalizado', 'Arquivado'].map((status) => (
              <Button
                key={status}
                mode={statusFilter === status ? 'contained' : 'outlined'}
                onPress={() =>
                  setStatusFilter(statusFilter === status ? null : status)
                }
                style={styles.filterButton}
                labelStyle={styles.filterButtonLabel}
                contentStyle={styles.filterButtonContent}
              >
                {status}
              </Button>
            ))}
          </View>
        )}

        {!filteredCasos || filteredCasos.length === 0 ? (
          <View style={styles.carregando}>
            {casos.length === 0 ? (
              <>
                <ActivityIndicator size={'large'} theme={{ colors: { primary: '#1A4D77' } }} />
                <Text variant='titleMedium' style={styles.textCarregando}>Carregando casos ...</Text>
              </>
            ) : (
              <Text variant='titleMedium' style={styles.textCarregando}>Nenhum caso encontrado</Text>
            )}
          </View>
        ) : (
          <FlatList
            data={filteredCasos}
            renderItem={({ item }) => (
              <CardCaso
                title={item.title}
                dateRegister={item.dataDeRegistro}
                vitima={item.vitima}
                responsavel={item.responsavel}
                casoRota={item.id}
                status={item.status}
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
    paddingVertical: 15,
    color: '#111E5F',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10, 
    marginLeft: 20,
    marginBottom: 15,
  },
  filterButton: {
    width: 165,
  },
  filterButtonLabel: {
    textAlign: 'center',
  },
  filterButtonContent: {
    paddingVertical: 4,
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
