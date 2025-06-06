import { Link, router } from 'expo-router';
import axios from 'axios';
import { StyleSheet, FlatList, SafeAreaView, View, Alert } from 'react-native';
import { Text } from 'react-native-paper';


export default function AdicionarCaso(){

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text variant="headlineMedium">Tela adicionar caso</Text>
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