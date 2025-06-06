import { Link, router } from 'expo-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, FlatList, SafeAreaView, View, Alert } from 'react-native';
import { Searchbar, Button, Text, FAB, ActivityIndicator } from 'react-native-paper';
import { CardCaso } from '../../../components/CardCaso';


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
  const [refresh, setRefresh] = useState(false)

  async function fetchCasos(){
    try{
      const response = await axios.get("http://192.168.1.62:3000/casos");
      await setCasos(response.data)
    } catch (erro){
      console.log(erro)
    }
  }

  // executa fetchCasos() toda vez q a variável casos sofrer mudanças
  useEffect(() => {
    fetchCasos()
  }, [casos])

  // if(casos.length === 0) {
  //   Alert.alert('Tem nada');
  //   console.log(casos)
  // }

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

         { !casos || casos.length === 0 ?
          <View style={styles.carregando}>
            <ActivityIndicator size={'large'} theme={{colors: {primary: '#1A4D77'}}} />
            <Text variant='titleMedium' style={styles.textCarregando}>Carregando casos ...</Text>
          </View>
         : 
          <FlatList
            data={casos}
            renderItem={({ item }) => <CardCaso title={item.title} dateRegister={item.dataDeRegistro} vitima={item.vitima} responsavel={item.responsavel} casoRota={item.id}/>}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true)
              console.log('finalizou refresh')
              fetchCasos()
              console.log('finalizou')
              setRefresh(false)
            }}
          />
        }
        
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

  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },

  textCarregando: {
    color: 'darkblue'
  }
});