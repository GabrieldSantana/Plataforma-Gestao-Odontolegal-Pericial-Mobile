// ... imports permanecem iguais ...
import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, RefreshControl } from 'react-native';
import { Appbar, FAB, Portal, PaperProvider, Menu, Divider, Text, Modal, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardEvidencia from '../../../../../components/CardEvidencia';
import ModalEvidencia from '../../../../../components/ModalEvidencia';

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

  interface State {
    open: boolean;
  }

  interface Evidencia {
    id: string;
    titulo: string;
    descricao: string;
    imageUrl: string;
  }

  interface PropsCardEvidencia {
    updateIdModel: (id: string | number) => void;
    updateTipo: string;
    // Outras props...
  }
  interface Vitima {
    _id: string;
    NIC: string;
    nome: string;
    genero: 'Feminino' | 'Masculino';
    idade: number;
    cpf: string;
    endereco: string;
    etnia: string;
    odontograma: any;
    anotacaoAnatomia: string;
  }


  const { id } = useLocalSearchParams();
  const [caso, setCaso] = useState<Caso | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [state, setState] = useState<State>({ open: false });
  const [visible, setVisible] = useState(false);
  const [vitimas, setVitimas] = useState<Vitima[] | null>(null);
  const [refreshing, setRefreshing] = useState(false); // Estado para recarregamento

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const mostrarModal = () => setVisibleModal(true);
  const fecharModal = () => setVisibleModal(false);

  const [idModal, setIdModal] = useState('');

  const guardarIdModal = (id: string) => setIdModal(id);

  const [tipo, setTipo] = useState("Evidencia");

  async function fetchCaso() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }
      
      const response = await axios.get(`https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/casos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCaso(response.data);
    } catch (erro: any) {
      console.error('Erro ao buscar caso:', erro.response?.data || erro.message);
    } finally {
      setCarregando(false);
    }
  }

  async function fetchVitimas() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const apiUrl = `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/vitimas?casoId=${id}`;
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVitimas(response.data.vitimas);
    } catch (erro: any) {
      console.error('Erro ao buscar vítimas:', erro.response?.data || erro.message);

    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchEvidencias(), fetchVitimas()]);
    setRefreshing(false);
  };

  useEffect(() => {
    AsyncStorage.setItem('casoId', id as string);
    fetchCaso();
  }, []);

  useEffect(() => {
    fetchEvidencias();
    fetchVitimas();
    return () => {
      AsyncStorage.removeItem('casoId');
    };
  }, []);


  useEffect(() => {
    guardarIdModal(idModal);
  }, [idModal]);

  if (carregando || !caso) {
    return (
      <SafeAreaProvider>
        <PaperProvider>
          <Appbar.Header mode="small">
            <Appbar.BackAction onPress={() => router.back()} />
            <Appbar.Content title="Carregando..." />
          </Appbar.Header>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1A4D77" />
            <Text>Carregando dados do caso...</Text>
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Appbar.Header mode="small">
          <Appbar.BackAction onPress={() => router.back()} />
          <Appbar.Content title={caso.nome} />
          <Menu
            style={{ top: 20, zIndex: 1000 }}
            visible={visible}
            elevation={3}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
          >
            <Menu.Item onPress={() => {}} title="Gerar relatório" />
            <Menu.Item onPress={() => {}} title="Editar caso" />
            <Divider />
          </Menu>
        </Appbar.Header>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#1A4D77']} />
          }
        >
          <View style={styles.casoInfoContainer}>
            <Text style={styles.title} variant="headlineSmall">{caso.nome}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={styles.label}>Status:</Text>
                <Text style={styles.value}>{caso.status}</Text>
                <Text style={styles.label}>Local:</Text>
                <Text style={styles.value}>{caso.local}</Text>
                <Text style={styles.label}>Tipo:</Text>
                <Text style={styles.value}>{caso.tipo}</Text>
                <Text style={styles.label}>Data e Hora:</Text>
                <Text style={styles.value}>
                  {caso.dataHora ? new Date(caso.dataHora).toLocaleString() : 'N/A'}
                </Text>
                <Text style={styles.label}>Perito Responsável:</Text>
                <Text style={styles.value}>
                  {caso.peritoResponsavel.nome} ({caso.peritoResponsavel.email})
                </Text>
              </View>
            </View>

            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.description}>{caso.descricao}</Text>

            <View style={{ marginTop: 16 }}>
              <Text style={styles.label}>Evidências</Text>
              <View style={{ paddingTop: 10 }}>

                {[1, 2].map((_, index) => (
                  <CardEvidencia
                    key={index}
                    nome={`Evidência visual ${index + 1}`}
                    abrirModal={mostrarModal}
                    updateIdModel={() => guardarIdModal(`fake-id-${index}`)}
                    updateTipo={() => setTipo("Evidencia")}
                  />
                ))}

              </View>
            </View>
            <View style={{ marginTop: 16 }}>
              <Text style={styles.label}>Vítimas</Text>
              <View style={{ paddingTop: 10 }}>
                {vitimas && vitimas.length > 0 ? (
                vitimas.map((vitima, index) => (
                  <View
                    key={vitima._id}
                    style={{
                      marginBottom: 24,
                      padding: 16,
                      backgroundColor: '#f9f9f9',
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: '#ddd',
                    }}
                  >
                    <Text style={[styles.label, { fontSize: 18, marginBottom: 8 }]}>
                      Vítima {index + 1}
                    </Text>

                    <Text style={styles.label}>Nome:</Text>
                    <Text style={styles.value}>{vitima.nome}</Text>

                    <Text style={styles.label}>NIC:</Text>
                    <Text style={styles.value}>{vitima.NIC}</Text>

                    <Text style={styles.label}>Gênero:</Text>
                    <Text style={styles.value}>{vitima.genero}</Text>

                    <Text style={styles.label}>Idade:</Text>
                    <Text style={styles.value}>{vitima.idade}</Text>

                    <Text style={styles.label}>CPF:</Text>
                    <Text style={styles.value}>{vitima.cpf}</Text>

                    <Text style={styles.label}>Endereço:</Text>
                    <Text style={styles.value}>{vitima.endereco}</Text>

                    <Text style={styles.label}>Etnia:</Text>
                    <Text style={styles.value}>{vitima.etnia}</Text>

                    <Text style={styles.label}>Anotação de Anatomia:</Text>
                    <Text style={styles.value}>{vitima.anotacaoAnatomia}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.value}>Nenhuma vítima disponível</Text>
              )}


            <View style={{ marginTop: 16 }}>
              <Text style={styles.label}>Vítimas</Text>
              <View style={{ paddingTop: 10 }}>
                {vitimas ? (
                  vitimas.map((vitima) => (
                    <CardEvidencia
                      key={vitima.id}
                      nome={vitima.nome}
                      abrirModal={mostrarModal}
                      updateIdModel={() => guardarIdModal(vitima.id)}
                      updateTipo={() => setTipo("Vitima")}
                    />
                  ))
                ) : (
                  <Text>Nenhuma evidência disponível</Text>
                )}

              </View>
            </View>
          </View>
        </ScrollView>

        <Portal>
          <FAB.Group
            open={open}
            visible
            color="white"
            fabStyle={{ backgroundColor: '#1A4D77' }}
            style={styles.fab}
            backdropColor="rgba(255, 255, 255, 0.9)"
            icon={open ? 'note' : 'plus'}
            actions={[
              {
                icon: 'pencil',
                label: 'Adicionar vítima',
                onPress: () => router.navigate('../AdicionarVitima'),
                style: { backgroundColor: '#1A4D77' },
                color: 'white',
              },
              {
                icon: 'pen',
                label: 'Adicionar evidência',
                onPress: () => router.navigate('../AdicionarEvidencia'),
                style: { backgroundColor: '#1A4D77' },
                color: 'white',
              },
            ]}
            onStateChange={onStateChange}
          />
        </Portal>

        <ModalEvidencia visibleModal={visibleModal} hideModal={fecharModal} caminho={idModal} tipo={tipo} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  casoInfoContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 80,
    paddingLeft: 30,
    zIndex: -1,
    width: '95%',
  },
  title: {
    fontWeight: 'bold',
    color: '#111E5F',
    marginBottom: 12,
    textAlign: 'left',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
    color: '#1A4D77',
  },
  value: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'justify',
    color: '#333',
  },
  fab: {
    margin: 16,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
});
