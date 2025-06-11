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
    _id: string;
    casoId: string;
    arquivoId: string;
    nomeArquivo: string;
    tipoArquivo: string;
    tipoEvidencia: string;
    descricao: string;
    createdAt: string;
    __v: number;
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

  interface PropsCardEvidencia {
    nome: string;
    abrirModal: () => void;
    updateIdModel: (id: string) => void;
    updateTipo: (tipo: string) => void;
  }

  const { id } = useLocalSearchParams();
  const [caso, setCaso] = useState<Caso | null>(null);
  const [state, setState] = useState<State>({ open: false });
  const [evidencias, setEvidencias] = useState<Evidencia[]>([]);
  const [vitimas, setVitimas] = useState<Vitima[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [idModal, setIdModal] = useState('');
  const [tipo, setTipo] = useState('Evidencia');

  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);
  const mostrarModal = () => setVisibleModal(true);
  const fecharModal = () => setVisibleModal(false);

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

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
    }
  }

  async function fetchEvidencias() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }
      console.log('Buscando evidências para casoId:', id);
      const response = await axios.get(`https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/evidencias?casoId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Resposta da API de evidências:', response.data);
      setEvidencias(response.data.evidencias || []); // 🔧 Correção aqui
    } catch (erro: any) {
      console.error('Erro ao buscar evidências:', erro.response?.data || erro.message);
    }
  }


  async function fetchVitimas() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }
      const response = await axios.get(`https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/vitimas?casoId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVitimas(response.data.vitimas || []);
    } catch (erro: any) {
      console.error('Erro ao buscar vítimas:', erro.response?.data || erro.message);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchCaso(), fetchEvidencias(), fetchVitimas()]);
    } catch (erro) {
      console.error('Erro ao atualizar:', erro);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    console.log('ID do caso:', id); // Debug the id
    AsyncStorage.setItem('casoId', id as string);
    const fetchData = async () => {
      setCarregando(true);
      try {
        await Promise.all([fetchCaso(), fetchEvidencias(), fetchVitimas()]);
      } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
      } finally {
        setCarregando(false);
      }
    };
    fetchData();
    return () => {
      AsyncStorage.removeItem('casoId');
    };
  }, [id]);

  useEffect(() => {
    console.log('Evidências atualizadas:', evidencias); // Debug updated state
  }, [evidencias]);

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
            visible={visibleMenu}
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
            <Text style={styles.label}>Descrição:</Text>
            <Text style={styles.description}>{caso.descricao}</Text>

            <View style={{ marginTop: 16 }}>
              <Text style={styles.label}>Evidências</Text>
              <View style={{ paddingTop: 10 }}>
                {evidencias.length > 0 ? (
                  evidencias.map((evidencia) => (
                    <CardEvidencia
                      key={evidencia._id}
                      nome={evidencia.nomeArquivo}
                      abrirModal={mostrarModal}
                      updateIdModel={() => setIdModal(evidencia._id)}
                      updateTipo={() => setTipo('Evidencia')}
                    />
                  ))
                ) : (
                  <Text style={styles.value}>Nenhuma evidência disponível</Text>
                )}
              </View>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={styles.label}>Vítimas</Text>
              <View style={{ paddingTop: 10 }}>
                {vitimas.length > 0 ? (
                  vitimas.map((vitima) => (
                    <CardEvidencia
                      key={vitima._id}
                      nome={vitima.nome}
                      abrirModal={mostrarModal}
                      updateIdModel={() => setIdModal(vitima._id)}
                      updateTipo={() => setTipo('Vitima')}
                    />
                  ))
                ) : (
                  <Text style={styles.value}>Nenhuma vítima disponível</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>

        <Portal>
          <FAB.Group
            open={state.open}
            visible
            color="white"
            fabStyle={{ backgroundColor: '#1A4D77' }}
            style={styles.fab}
            backdropColor="rgba(255, 255, 255, 0.9)"
            icon={state.open ? 'note' : 'plus'}
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