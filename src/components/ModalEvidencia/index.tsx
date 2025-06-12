import { Portal, Text, Modal, Button } from "react-native-paper";
import { StyleSheet, View, ViewStyle, Image, ActivityIndicator, ScrollView, Alert } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditarModal } from "../EditarModal";

interface Evidencia {
  _id?: string;
  tituloEvidencia?: string;
  descricao?: string;
  nomeArquivo?: string;
  tipoArquivo?: string;
  tipoEvidencia?: string;
  criadoEm?: string;
  coletadoPor?: string;
}

interface Odontograma {
  superiorEsquerdo: string[];
  superiorDireito: string[];
  inferiorEsquerdo: string[];
  inferiorDireito: string[];
}

interface Vitima {
  odontograma?: Odontograma;
  _id: string;
  casoId: string;
  nome: string;
  genero: string;
  idade: number;
  cpf: string;
  endereco: string;
  etnia: string;
  anotacaoAnatomica: string;
  createdAt: string;
  NIC: string;
  __v: number;
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
  const [gerandoLaudo, setGerandoLaudo] = useState(false);
  const id = caminho;

  const containerStyle: ViewStyle = {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    height: 560,
    width: 350,
    marginHorizontal: 'auto',
    borderRadius: 8,
  };

  const fetchDadosModal = async () => {
    const token = await AsyncStorage.getItem('token');

    if (tipo === 'Evidencia') {
      const apiUrl = `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/evidencias/${id}`;
      try {
        setLoading(true);
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const evidenciaData = response.data.evidencia;
        console.log('Dados da evidência recebidos:', evidenciaData); // Log para depuração
        setEvidencia(evidenciaData);
        setError(null);
      } catch (err) {
        setError('Falha ao buscar evidência');
        console.error('Erro ao buscar evidência:', err);
      } finally {
        setLoading(false);
      }
    } else {
      const apiUrl = `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/vitimas/${id}`;
      try {
        setLoading(true);
        const response = await axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVitima(response.data.vitima || response.data);
        setError(null);
      } catch (err) {
        setError('Falha ao buscar vítima');
        console.error('Erro ao buscar vítima:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteArquivo = async () => {
    const token = await AsyncStorage.getItem('token');

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
              const apiUrl = `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/evidencias/${id}`;
              try {
                setLoading(true);
                await axios.delete(apiUrl, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                });
                setEvidencia(null);
                setError(null);
                hideModal();
                onDeleteSuccess?.();
              } catch (err) {
                setError('Falha ao excluir evidência');
                console.error('Erro ao excluir evidência:', err);
              } finally {
                setLoading(false);
              }
            } else {
              const apiUrl = `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/vitimas/${id}`;
              try {
                setLoading(true);
                await axios.delete(apiUrl, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  }
                });
                setVitima(null);
                setError(null);
                hideModal();
                onDeleteSuccess?.();
              } catch (err) {
                setError('Falha ao excluir vítima');
                console.error('Erro ao excluir vítima:', err);
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

  const gerarLaudo = async () => {
    setGerandoLaudo(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const usuarioString = await AsyncStorage.getItem('usuario');
      if (!token || !usuarioString) {
        console.error('Token ou usuário não encontrado');
        Alert.alert('Erro', 'Token ou informações do usuário não encontrados.');
        return;
      }

      const usuario = JSON.parse(usuarioString);
      const usuarioId = usuario._id;

      if (!evidencia) {
        console.error('Evidência não carregada');
        Alert.alert('Erro', 'Evidência não carregada.');
        return;
      }

      if (!evidencia._id) {
        console.error('ID da evidência não disponível');
        Alert.alert('Erro', 'ID da evidência não disponível.');
        return;
      }

      const titulo = evidencia.tituloEvidencia || 'Laudo Forense'; // Fallback para título
      console.log('Gerando laudo com dados:', { evidenciaId: evidencia._id, titulo, peritoResponsavel: usuarioId }); // Log para depuração

      const response = await axios.post(
        'https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/laudos/',
        {
          evidenciaId: evidencia._id,
          titulo,
          peritoResponsavel: usuarioId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Laudo gerado com sucesso:', response.data);
      Alert.alert('Sucesso', 'Laudo gerado com sucesso!');
      await fetchDadosModal();
    } catch (erro: any) {
      console.error('Erro ao gerar laudo:', erro.response?.data || erro.message);
      Alert.alert('Erro', 'Não foi possível gerar o laudo. Tente novamente.');
    } finally {
      setGerandoLaudo(false);
    }
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
                disabled={editarHabilitado || gerandoLaudo || loading}
                loading={gerandoLaudo}
                onPress={gerarLaudo}
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
              <ScrollView>
                <Text variant="headlineSmall" style={styles.title}>Título:</Text>
                <Text style={styles.text}>{evidencia?.tituloEvidencia || 'Sem título'}</Text>

                <Text variant="headlineSmall" style={styles.title}>Descrição:</Text>
                <Text style={styles.text}>{evidencia?.descricao || 'Sem descrição'}</Text>

                <Text variant="headlineSmall" style={styles.title}>Tipo de Evidência:</Text>
                <Text style={styles.text}>{evidencia?.tipoEvidencia || 'Não informado'}</Text>

                <Text variant="headlineSmall" style={styles.title}>ID do Coletor:</Text>
                <Text style={styles.text}>{evidencia?.coletadoPor || 'Não informado'}</Text>

                <Text variant="headlineSmall" style={styles.title}>Imagem anexada:</Text>
                {evidencia?.nomeArquivo ? (
                  <Image
                    source={{ uri: `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/uploads/${evidencia.nomeArquivo}` }}
                    style={styles.imagem}
                    resizeMode="contain"
                  />
                ) : (
                  <Text>Esta evidência não tem imagem</Text>
                )}
              </ScrollView>
            )}

            <View style={styles.botoes}>
              <Button 
                icon={editarHabilitado ? 'menu-left-outline' : 'pencil'} 
                mode="contained" 
                style={styles.botao}
                buttonColor={editarHabilitado ? '#4c7aa0' : '#1A4D77'}
                contentStyle={{ flexDirection: 'row-reverse' }}
                onPress={toggleEditar}
              >
                {editarHabilitado ? 'Voltar' : 'Editar'}
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
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#1A4D77" />
                  </View>
                ) : error ? (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Button onPress={fetchDadosModal}>Tentar novamente</Button>
                  </View>
                ) : vitima ? (
                  <>
                    <Text variant="headlineSmall" style={styles.title}>NIC:</Text>
                    <Text style={styles.text}>{vitima.NIC || 'Sem NIC'}</Text>

                    <Text variant="headlineSmall" style={styles.title}>Nome:</Text>
                    <Text style={styles.text}>{vitima.nome || 'Sem nome'}</Text>

                    <Text variant="headlineSmall" style={styles.title}>Gênero:</Text>
                    <Text style={styles.text}>{vitima.genero || 'Sem gênero'}</Text>

                    <Text variant="headlineSmall" style={styles.title}>Idade:</Text>
                    <Text style={styles.text}>{vitima.idade || 'Sem idade'}</Text>

                    <Text variant="headlineSmall" style={styles.title}>CPF:</Text>
                    <Text style={styles.text}>{vitima.cpf || 'Sem CPF'}</Text>

                    <Text variant="headlineSmall" style={styles.title}>Endereço:</Text>
                    <Text style={styles.text}>{vitima.endereco || 'Sem endereço'}</Text>

                    <Text variant="headlineSmall" style={styles.title}>Etnia:</Text>
                    <Text style={styles.text}>{vitima.etnia || 'Sem etnia'}</Text>

                    <Text variant="headlineSmall" style={styles.title}>Anotação Anatômica:</Text>
                    <Text style={styles.text}>{vitima.anotacaoAnatomica || 'Sem anotação'}</Text>

                    <Text variant="headlineSmall" style={styles.title}>Odontograma:</Text>
                    <ScrollView horizontal>
                      <View style={styles.odontogramaContainer}>
                        <Text>Superior Esquerdo: {vitima.odontograma?.superiorEsquerdo.join(', ') || 'N/A'}</Text>
                        <Text>Superior Direito: {vitima.odontograma?.superiorDireito.join(', ') || 'N/A'}</Text>
                        <Text>Inferior Esquerdo: {vitima.odontograma?.inferiorEsquerdo.join(', ') || 'N/A'}</Text>
                        <Text>Inferior Direito: {vitima.odontograma?.inferiorDireito.join(', ') || 'N/A'}</Text>
                      </View>
                    </ScrollView>
                  </>
                ) : (
                  <Text>Nenhuma vítima encontrada.</Text>
                )}
              </ScrollView>
            )}

            <View style={styles.botoes}>
              <Button 
                icon={editarHabilitado ? 'menu-left-outline' : 'pencil'} 
                mode="contained" 
                style={styles.botao}
                buttonColor={editarHabilitado ? '#4c7aa0' : '#1A4D77'}
                contentStyle={{ flexDirection: 'row-reverse' }}
                onPress={toggleEditar}
              >
                {editarHabilitado ? 'Voltar' : 'Editar'}
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
    paddingBottom: 15,
  },
  containerVitima: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  btnSair: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 3,
    marginRight: 3,
  },
  header: {
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
  },
  imagem: {
    height: 250,
    width: '100%',
    marginVertical: 10,
    borderRadius: 8,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  botao: {
    flex: 1,
    marginHorizontal: 5,
  },
  loadingContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  errorContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  odontogramaContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
  },
});