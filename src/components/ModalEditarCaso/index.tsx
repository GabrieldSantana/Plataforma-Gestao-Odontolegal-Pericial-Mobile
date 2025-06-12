import { Portal, Modal, Text, TextInput, Button } from "react-native-paper";
import { Alert, ScrollView, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definindo a interface para as props do componente
interface ModalProps {
  visibleEditar: boolean;
  hideModal?: () => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  idCaso: string | string[];
  casoInfo?: Caso;
}

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

// Usando React.FC para tipar o componente
export const ModalEditarCaso: React.FC<ModalProps> = ({
  visibleEditar,
  hideModal,
  idCaso,
  casoInfo
}) => {
  const [formData, setFormData] = useState({
    nome: casoInfo?.nome || '',
    local: casoInfo?.local || '',
    descricao: casoInfo?.descricao || '',
    tipo: casoInfo?.tipo || '',
    status: casoInfo?.status || ''
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const containerStyle: ViewStyle = {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 25,
    height: 530,
    width: 350,
    marginHorizontal: "auto",
    borderRadius: 8,
  };

  async function putCaso() {
    const validStatuses = ["Em andamento", "Arquivado", "Finalizado"];
    if (!validStatuses.includes(formData.status.trim())) {
      Alert.alert(
        'Erro',
        'O status deve ser "Em andamento", "Arquivado" ou "Finalizado".'
      );
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const usuarioString = await AsyncStorage.getItem('usuario');
    let peritoId: string | undefined;

    if (usuarioString) {
      try {
        const usuario = JSON.parse(usuarioString);
        peritoId = usuario._id;
      } catch (error) {
        console.error('Erro ao parsear usuario do AsyncStorage:', error);
      }
    }

    if (!peritoId) {
      Alert.alert('Erro', 'ID do perito não encontrado');
      return;
    }

    const casoId = Array.isArray(idCaso) ? idCaso[0] : idCaso;
    const apiUrl = `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/casos/${casoId}`;

    const payload = {
      nome: formData.nome.trim(),
      local: formData.local.trim(),
      descricao: formData.descricao.trim(),
      tipo: formData.tipo.trim(),
      status: formData.status.trim(),
      dataHora: casoInfo?.dataHora || '', // Usa o valor original de casoInfo
      peritoResponsavel: peritoId
    };

    try {
      const response = await axios.put(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      Alert.alert('Sucesso', 'Caso atualizado com sucesso!');
      hideModal?.();
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Falha ao enviar dados editados';
      Alert.alert('Erro', errorMessage);
      console.error('Erro na requisição:', {
        status: err.response?.status,
        message: err.response?.data,
        headers: err.response?.headers,
        requestData: payload,
        url: apiUrl
      });
    }
  }

  return (
    <Portal>
      <Modal
        visible={visibleEditar}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <ScrollView style={{ gap: 10 }}>
          <Text variant="titleLarge" style={{ marginBottom: 15 }}>
            Editar Caso
          </Text>

          <Text variant="titleSmall" style={{ marginBottom: 5 }}>
            Nome
          </Text>
          <TextInput
            value={formData.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
            style={{ marginBottom: 10 }}
            mode="outlined"
          />

          <Text variant="titleSmall" style={{ marginBottom: 5 }}>
            Local
          </Text>
          <TextInput
            value={formData.local}
            onChangeText={(text) => handleInputChange('local', text)}
            style={{ marginBottom: 10 }}
            mode="outlined"
          />

          <Text variant="titleSmall" style={{ marginBottom: 5 }}>
            Descrição
          </Text>
          <TextInput
            value={formData.descricao}
            onChangeText={(text) => handleInputChange('descricao', text)}
            style={{ marginBottom: 10 }}
            mode="outlined"
            multiline
            numberOfLines={4}
          />

          <Text variant="titleSmall" style={{ marginBottom: 5 }}>
            Tipo
          </Text>
          <TextInput
            value={formData.tipo}
            onChangeText={(text) => handleInputChange('tipo', text)}
            style={{ marginBottom: 10 }}
            mode="outlined"
          />

          <Text variant="titleSmall" style={{ marginBottom: 5 }}>
            Status
          </Text>
          <TextInput
            value={formData.status}
            onChangeText={(text) => handleInputChange('status', text)}
            style={{ marginBottom: 10 }}
            mode="outlined"
            placeholder="Em andamento, Arquivado ou Finalizado"
          />

          <Text variant="titleSmall" style={{ marginBottom: 5 }}>
            Data e Hora
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              marginBottom: 10,
              padding: 10,
              backgroundColor: '#f5f5f5',
              borderRadius: 4,
              color: '#000'
            }}
          >
            {casoInfo?.dataHora || 'Não informado'}
          </Text>

          <Button
            mode="contained"
            onPress={putCaso}
            style={{ marginTop: 10 }}
          >
            Salvar
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};