import { Portal, Modal, Text, TextInput, Button } from "react-native-paper";
import { Alert, ScrollView, ViewStyle, View } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';

interface ModalProps {
  visibleEditar: boolean;
  hideModal?: () => void;
  contentContainerStyle?: ViewStyle;
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

export const ModalEditarCaso: React.FC<ModalProps> = ({
  visibleEditar,
  hideModal,
  idCaso,
  casoInfo
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    local: '',
    descricao: '',
    tipo: '',
    status: ''
  });

  useEffect(() => {
    if (casoInfo) {
      setFormData({
        nome: casoInfo.nome || '',
        local: casoInfo.local || '',
        descricao: casoInfo.descricao || '',
        tipo: casoInfo.tipo || '',
        status: casoInfo.status || ''
      });
    }
  }, [casoInfo]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const containerStyle: ViewStyle = {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 25,
    height: 580,
    width: 350,
    alignSelf: "center",
    borderRadius: 8,
  };

  async function putCaso() {
    const validStatuses = ["Em andamento", "Arquivado", "Finalizado"];
    if (!validStatuses.includes(formData.status.trim())) {
      Alert.alert('Erro', 'O status deve ser "Em andamento", "Arquivado" ou "Finalizado".');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const usuarioString = await AsyncStorage.getItem('usuario');

      if (!token || !usuarioString) throw new Error('Usuário ou token ausente');

      const usuario = JSON.parse(usuarioString);
      const peritoId = usuario._id;

      const casoId = Array.isArray(idCaso) ? idCaso[0] : idCaso;
      const apiUrl = `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/casos/${casoId}`;

      const payload = {
        ...formData,
        nome: formData.nome.trim(),
        local: formData.local.trim(),
        descricao: formData.descricao.trim(),
        tipo: formData.tipo.trim(),
        status: formData.status.trim(),
        dataHora: casoInfo?.dataHora || '',
        peritoResponsavel: peritoId
      };

      await axios.put(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      Alert.alert('Sucesso', 'Caso atualizado com sucesso!');
      hideModal?.();

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Erro ao atualizar caso';
      Alert.alert('Erro', errorMessage);
      console.error('Erro ao atualizar caso:', err);
    }
  }

  const tipoList = [
    "Lesão Corporal",
    "Identificação por Arcos Dentais",
    "Exame de Marcas de Mordida",
    "Coleta de DNA",
  ];

  const statusList = [
    "Em andamento",
    "Arquivado",
    "Finalizado",
  ];

  return (
    <Portal>
      <Modal
        visible={visibleEditar}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <ScrollView>
          <Text variant="titleLarge" style={{ marginBottom: 15 }}>
            Editar Caso
          </Text>

          {/* Nome */}
          <Text variant="titleSmall" style={{ marginBottom: 5 }}>Nome</Text>
          <TextInput
            value={formData.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
            style={{ marginBottom: 10 }}
            mode="outlined"
          />

          {/* Local */}
          <Text variant="titleSmall" style={{ marginBottom: 5 }}>Local</Text>
          <TextInput
            value={formData.local}
            onChangeText={(text) => handleInputChange('local', text)}
            style={{ marginBottom: 10 }}
            mode="outlined"
          />

          {/* Descrição */}
          <Text variant="titleSmall" style={{ marginBottom: 5 }}>Descrição</Text>
          <TextInput
            value={formData.descricao}
            onChangeText={(text) => handleInputChange('descricao', text)}
            style={{ marginBottom: 10 }}
            mode="outlined"
            multiline
            numberOfLines={4}
          />

          {/* Tipo (Picker) */}
          <Text variant="titleSmall" style={{ marginBottom: 5 }}>Tipo</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#a3a3a3',
              borderRadius: 4,
              marginBottom: 10,
              overflow: 'hidden',
            }}
          >
            <Picker
              selectedValue={formData.tipo}
              onValueChange={(itemValue) => handleInputChange('tipo', itemValue)}
              mode="dropdown"
            >
              <Picker.Item label="Selecione o tipo" value="" />
              {tipoList.map((tipo) => (
                <Picker.Item key={tipo} label={tipo} value={tipo} />
              ))}
            </Picker>
          </View>

          {/* Status (Picker) */}
          <Text variant="titleSmall" style={{ marginBottom: 5 }}>Status</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#a3a3a3',
              borderRadius: 4,
              marginBottom: 10,
              overflow: 'hidden',
            }}
          >
            <Picker
              selectedValue={formData.status}
              onValueChange={(itemValue) => handleInputChange('status', itemValue)}
              mode="dropdown"
            >
              <Picker.Item label="Selecione o status" value="" />
              {statusList.map((status) => (
                <Picker.Item key={status} label={status} value={status} />
              ))}
            </Picker>
          </View>

          {/* Data e Hora */}
          <Text variant="titleSmall" style={{ marginBottom: 5 }}>Data e Hora</Text>
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

          {/* Botão de Salvar */}
          <Button mode="contained" onPress={putCaso} style={{ marginTop: 10 }}>
            Salvar
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};
