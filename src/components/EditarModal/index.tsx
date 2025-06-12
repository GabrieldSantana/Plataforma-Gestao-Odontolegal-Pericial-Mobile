import { Text, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import axios, { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";

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

interface PropsEditarModal {
  idEditarModal?: string;
  conteudo?: Evidencia | Vitima | null | undefined;
  onSave?: (data: Evidencia | Vitima) => void;
}

export function EditarModal({ idEditarModal, conteudo, onSave }: PropsEditarModal) {
  const [formData, setFormData] = useState<Evidencia | Vitima | null>(conteudo || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
    console.log(`Campo ${field} alterado para:`, value);
  };

  // Corrigir type guard para Evidencia
  const isEvidencia = (data: Evidencia | Vitima): data is Evidencia => 'nomeArquivo' in data;
  const isVitima = (data: Evidencia | Vitima): data is Vitima => 'NIC' in data;

  const handleSave = async () => {
    if (!formData || !idEditarModal) {
      Alert.alert("Erro", "Nenhum dado ou ID disponível para salvar.");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Erro", "Token de autenticação não encontrado.");
        setLoading(false);
        return;
      }

      const apiUrl = isEvidencia(formData)
        ? `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/evidencias/${idEditarModal}`
        : `https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/vitimas/${idEditarModal}`;

      // Corrigir mapeamento de cleanedFormData
      const cleanedFormData = isEvidencia(formData)
        ? {
            nomeArquivo: formData.nomeArquivo,
            descricao: formData.descricao,
            arquivoId: formData.arquivoId, // Ajuste conforme esperado pela API
          }
        : {
            NIC: formData.NIC,
            nome: formData.nome,
            cpf: formData.cpf,
            endereco: formData.endereco,
            etnia: formData.etnia,
            anotacaoAnatomica: formData.anotacaoAnatomica,
            casoId: formData.casoId,
            genero: formData.genero,
            idade: formData.idade,
          };

      console.log("Enviando dados:", cleanedFormData);

      const response = await axios.put(apiUrl, cleanedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Dados salvos com sucesso:", response.data);
      Alert.alert("Sucesso", "Informações editadas e salvas com sucesso");
      if (onSave) {
        onSave(formData as Evidencia | Vitima);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Erro ao salvar:", axiosError);

      if (axiosError.response && axiosError.response.status === 401) {
        Alert.alert("Erro", "Falha na autenticação. Verifique o token ou faça login novamente.");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao salvar os dados. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return <Text style={styles.errorText}>Nenhum conteúdo para editar</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {isEvidencia(formData) ? (
        <View>
          <Text variant="headlineSmall" style={styles.label}>Nome do Arquivo:</Text>
          <TextInput
            value={formData.nomeArquivo ?? ""}
            onChangeText={(text) => handleChange('nomeArquivo', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Descrição:</Text>
          <TextInput
            value={formData.descricao ?? ""}
            onChangeText={(text) => handleChange('descricao', text)}
            style={styles.input}
            multiline
          />
        </View>
      ) : isVitima(formData) ? (
        <View>
          <Text variant="headlineSmall" style={styles.label}>NIC:</Text>
          <TextInput
            value={formData.NIC ?? ""}
            onChangeText={(text) => handleChange('NIC', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Nome:</Text>
          <TextInput
            value={formData.nome ?? ""}
            onChangeText={(text) => handleChange('nome', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>CPF:</Text>
          <TextInput
            value={formData.cpf ?? ""}
            onChangeText={(text) => handleChange('cpf', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Endereço:</Text>
          <TextInput
            value={formData.endereco ?? ""}
            onChangeText={(text) => handleChange('endereco', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Etnia:</Text>
          <TextInput
            value={formData.etnia ?? ""}
            onChangeText={(text) => handleChange('etnia', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Descrição anatômica:</Text>
          <TextInput
            value={formData.anotacaoAnatomica ?? ""}
            onChangeText={(text) => handleChange('anotacaoAnatomica', text)}
            style={styles.input}
            multiline
          />
        </View>
      ) : (
        <Text style={styles.errorText}>Tipo de conteúdo inválido</Text>
      )}
      <Button
        mode="contained"
        onPress={handleSave}
        loading={loading}
        disabled={loading || !formData}
        style={styles.saveButton}
        buttonColor="#1A4D77"
      >
        Salvar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  label: {
    color: '#111E5F',
    marginVertical: 6,
    fontWeight: '600',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    color: '#C51B1B',
    textAlign: 'center',
    marginTop: 20,
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 6,
  },
});