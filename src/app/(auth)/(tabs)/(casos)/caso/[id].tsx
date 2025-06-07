import { router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Appbar, FAB, Portal, PaperProvider, Menu, Divider, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardEvidencia from '../../../../../components/CardEvidencia';

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

  const { id } = useLocalSearchParams();
  const [caso, setCaso] = useState<Caso | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [state, setState] = useState<State>({ open: false });
  const [visible, setVisible] = useState(false);

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
          <Appbar.Content title={caso.nome} titleMaxFontSizeMultiplier={1} />
          <Menu
            style={{ top: 20, zIndex: 1000 }}
            visible={visible}
            elevation={3}
            onDismiss={closeMenu}
            anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
          >
            <Menu.Item
              onPress={() => {
                console.log('CLICOU NO BOTÃO GERAR RELATÓRIO');
                closeMenu();
              }}
              title="Gerar relatório"
            />
            <Menu.Item
              onPress={() => {
                console.log('CLICOU NO BOTÃO DE EDITAR CASO');
                closeMenu();
              }}
              title="Editar caso"
            />
            <Divider />
          </Menu>
        </Appbar.Header>

        <ScrollView>
          <View style={styles.casoInfoContainer}>
            <Text style={styles.title} variant="headlineSmall">
              {caso.nome}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
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
            
            <View style={{marginTop: 16}}>
                <Text style={styles.label}>Evidências</Text>
                <View style={{paddingTop: 10}}>
                    <CardEvidencia />
                    <CardEvidencia />
                    <CardEvidencia />
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
                onPress: () => console.log('Botão adicionar vítima ativado'),
                style: { backgroundColor: '#1A4D77' },
                color: 'white',
                size: 'medium',
              },
              {
                icon: 'pen',
                label: 'Adicionar evidência',
                onPress: () => router.navigate('../AdicionarEvidencia'),
                style: { backgroundColor: '#1A4D77' },
                color: 'white',
                size: 'medium',
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // Lógica adicional quando o FAB está aberto, se necessário
              }
            }}
          />
        </Portal>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  casoInfoContainer: {
    flex: 1,
    paddingTop: 20,
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
    color: '#1A4D77', // Mantido do seu código original para consistência
  },
  value: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333', // Mantido do seu código original
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'justify',
    color: '#333', // Seguindo o padrão do value
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