import { Portal, Text, Modal, Button } from "react-native-paper";
import { StyleSheet, View, ViewStyle, Image, ActivityIndicator, ScrollView, Alert} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { EditarModal } from "../EditarModal";

interface Evidencia {
  id?: number;
  titulo?: string;
  descricao?: string;
  imageUrl?: string;
}

interface Vitima {
  NIC?: string;
  nome?: string;
  genero?: 'masculino' | 'feminino';
  idade?: number;
  cpf?: string;
  endereco?: string;
  etnia?: string;
  anotacaoAnatomica?: string;
  odontograma: {
    superiorEsquerdo?: string[];
    superiorDireito?: string[];
    inferiorEsquerdo?: string[];
    inferiorDireito?: string[];
  };
}

interface ModalProps {
  visibleModal: boolean;
  hideModal: () => void;
  content?: string;
  caminho?: string;
  tipo?: string;
  onDeleteSuccess?: () => void;
}

export default function ModalEvidencia({ visibleModal, hideModal, caminho, tipo, onDeleteSuccess }: ModalProps) {
  const [evidencia, setEvidencia] = useState<Evidencia | null>(null);
  const [vitima, setVitima] = useState<Vitima | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editarHabilitado, setEditarHabilitado] = useState(false);
  const id = caminho;

  const containerStyle: ViewStyle = {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    height: 530,
    width: 350,
    marginHorizontal: 'auto',
    borderRadius: 8,
  };

  const fetchDadosModal = async () => {
    if (tipo === 'Evidencia') {
      const apiUrl = `http://192.168.1.62:3000/evidencias/${id}`;
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setEvidencia(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch evidencia');
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      const apiUrl = `http://192.168.1.62:3000/vitimas/${id}`;
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setVitima(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch vitima');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteArquivo = async () => {
    Alert.alert(
      'Confirmação',
      `Tem certeza que deseja excluir este ${tipo?.toLowerCase()}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            if (tipo === 'Evidencia') {
              const apiUrl = `http://192.168.1.62:3000/evidencias/${id}`;
              try {
                setLoading(true);
                await axios.delete(apiUrl);
                console.log('Evidência deletada:', evidencia);
                setEvidencia(null);
                setError(null);
                hideModal();
                onDeleteSuccess?.();
              } catch (err) {
                setError('Failed to delete evidencia');
                console.error(err);
              } finally {
                setLoading(false);
              }
            } else {
              const apiUrl = `http://192.168.1.62:3000/vitimas/${id}`;
              try {
                setLoading(true);
                await axios.delete(apiUrl);
                console.log('Vítima deletada:', vitima);
                setVitima(null);
                setError(null);
                hideModal();
                onDeleteSuccess?.();
              } catch (err) {
                setError('Failed to delete vitima');
                console.error(err);
              } finally {
                setLoading(false);
              }
            }
          },
        },
      ],
    );
  };

  const toggleEditar = () => {
    setEditarHabilitado(!editarHabilitado);
    fetchDadosModal();
  };

  useEffect(() => {
    if (visibleModal) {
      fetchDadosModal();
      setEditarHabilitado(false);
    }
  }, [visibleModal]);

  return (
    <Portal>
      <Modal
        visible={visibleModal}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {tipo === "Evidencia" ? (
          <View style={styles.container}>
            <View style={styles.btnSair}>
              <Button 
                icon="close" 
                onPress={hideModal}
                textColor="#1A4D77"
              >
                Sair
              </Button>
            </View>

            <View style={styles.header}>
              <Text variant="headlineMedium" style={styles.headerText}>{tipo}</Text>
              <Button 
                icon="clipboard-list" 
                mode="contained"
                style={{ borderRadius: 6, marginTop: 10 }}
                buttonColor="#1A4D77"
                disabled={editarHabilitado}
                onPress={() => console.log('Botão gerar laudo pressionado')}
              >
                Gerar Laudo
              </Button>
            </View>

            {editarHabilitado ? (
              <EditarModal idEditarModal={id} conteudo={evidencia} />
            ) : loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1A4D77" />
              </View>
            ) : error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Button onPress={fetchDadosModal}>Tentar novamente</Button>
              </View>
            ) : (
              <View>
                <Text variant="headlineSmall" style={styles.title}>Título:</Text>
                <Text style={styles.text}>{evidencia?.titulo || 'Sem título'}</Text>
                <Text variant="headlineSmall" style={styles.title}>Descrição:</Text>
                <Text style={styles.text}>{evidencia?.descricao || 'Sem descrição'}</Text>
                <Text variant="headlineSmall" style={styles.title}>Imagem anexada:</Text>
                {evidencia?.imageUrl ? (
                  <Image 
                    source={{ uri: evidencia.imageUrl }} 
                    style={styles.imagem}
                    resizeMode="contain"
                  />
                ) : (
                  <Text>Esta evidência não tem imagem</Text>
                )}
              </View>
            )}

            <View style={styles.botoes}>
              <Button 
                icon="pencil" 
                mode="contained" 
                style={styles.botao}
                buttonColor="#1A4D77"
                contentStyle={{ flexDirection: 'row-reverse' }}
                onPress={toggleEditar}
              >
                {editarHabilitado ? 'Salvar' : 'Editar'}
              </Button>

              <Button 
                icon="trash-can" 
                mode="contained" 
                style={styles.botao}
                buttonColor="#C51B1B"
                contentStyle={{ flexDirection: 'row-reverse' }}
                onPress={deleteArquivo}
                disabled={editarHabilitado}
              >
                Excluir
              </Button>
            </View>
          </View>
        ) : (
          <View style={styles.containerVitima}>
            <View style={styles.header}>
              <Text variant="headlineMedium" style={styles.headerText}>{tipo}</Text>
              <Button 
                icon="close" 
                onPress={hideModal}
                textColor="#1A4D77"
              >
                Sair
              </Button>
            </View>

            {editarHabilitado ? (
              <EditarModal idEditarModal={id} conteudo={vitima} />
            ) : (
              <ScrollView>
                <Text variant="headlineSmall" style={styles.title}>NIC:</Text>
                <Text style={styles.text}>{vitima?.NIC || 'Sem NIC'}</Text>
                <Text variant="headlineSmall" style={styles.title}>Nome:</Text>
                <Text style={styles.text}>{vitima?.nome || 'Sem nome'}</Text>
                <Text variant="headlineSmall" style={styles.title}>CPF:</Text>
                <Text style={styles.text}>{vitima?.cpf || 'Sem cpf'}</Text>
                <Text variant="headlineSmall" style={styles.title}>Endereço:</Text>
                <Text style={styles.text}>{vitima?.endereco || 'Sem endereço'}</Text>
                <Text variant="headlineSmall" style={styles.title}>Etnia:</Text>
                <Text style={styles.text}>{vitima?.etnia || 'Sem etnia'}</Text>
                <Text variant="headlineSmall" style={styles.title}>Descrição anatômica:</Text>
                <Text style={styles.text}>{vitima?.anotacaoAnatomica || 'Sem descrição'}</Text>
                
                <Text variant="headlineSmall" style={styles.title}>Odontograma:</Text>
                <Text variant="bodyLarge" style={styles.title}>Superior Direito:</Text>
                <Text style={styles.text}>{vitima?.odontograma.superiorDireito?.join(', ') || '(Sem dados)'}</Text>
                <Text variant="bodyLarge" style={styles.title}>Superior Esquerdo:</Text>
                <Text style={styles.text}>{vitima?.odontograma.superiorEsquerdo?.join(', ') || '(Sem dados)'}</Text>
                <Text variant="bodyLarge" style={styles.title}>Inferior Direito:</Text>
                <Text style={styles.text}>{vitima?.odontograma.inferiorDireito?.join(', ') || '(Sem dados)'}</Text>
                <Text variant="bodyLarge" style={styles.title}>Inferior Esquerdo:</Text>
                <Text style={styles.text}>{vitima?.odontograma.inferiorEsquerdo?.join(', ') || '(Sem dados)'}</Text>
              </ScrollView>
            )}

            <View style={styles.botoes}>
              <Button 
                icon="pencil" 
                mode="contained" 
                style={styles.botao}
                buttonColor="#1A4D77"
                contentStyle={{ flexDirection: 'row-reverse' }}
                onPress={toggleEditar}
              >
                {editarHabilitado ? 'Salvar' : 'Editar'}
              </Button>

              <Button 
                icon="trash-can" 
                mode="contained" 
                style={styles.botao}
                buttonColor="#C51B1B"
                contentStyle={{ flexDirection: 'row-reverse' }}
                onPress={deleteArquivo}
                disabled={editarHabilitado}
              >
                Excluir
              </Button>
            </View>
          </View>
        )}
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerVitima: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  btnSair: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginRight: -12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#111E5F',
  },
  title: {
    color: '#111E5F',
    marginVertical: 6,
    fontWeight: '600',
  },
  text: {
    color: '#333',
    marginBottom: 12,
  },
  imagem: {
    width: '100%',
    height: 120,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 24,
    paddingBottom: 16,
  },
  botao: {
    borderRadius: 6,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    color: '#C51B1B',
    textAlign: 'center',
  },
});