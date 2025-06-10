import { Text, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import axios from "axios";
import { useState } from "react";

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

interface PropsEditarModal {
  idEditarModal?: string;
  conteudo?: Evidencia | Vitima | null | undefined;
  onSave?: (data: Evidencia | Vitima) => void; // Callback para notificar o pai após salvamento
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

  const handleSave = async () => {
    if (!formData || !idEditarModal) {
      Alert.alert("Erro", "Nenhum dado ou ID disponível para salvar.");
      return;
    }

    setLoading(true);
    try {
      const apiUrl = 'titulo' in formData
        ? `http://192.168.1.62:3000/evidencias/${idEditarModal}`
        : `http://192.168.1.62:3000/vitimas/${idEditarModal}`;
      
      await axios.put(apiUrl, formData);
      console.log("Dados salvos com sucesso:", formData);
      if (onSave) {
        onSave(formData as Evidencia | Vitima); // Notifica o pai com os dados salvos
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Falha ao salvar os dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!conteudo) {
    return <Text style={styles.errorText}>Nenhum conteúdo para editar</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {('titulo' in conteudo && conteudo.titulo !== undefined) ? (
        <View>
          <Text variant="headlineSmall" style={styles.label}>Título:</Text>
          <TextInput
            value={formData && 'titulo' in formData ? formData.titulo || "" : ""}
            onChangeText={(text) => handleChange('titulo', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Descrição:</Text>
          <TextInput
            value={formData && 'descricao' in formData ? formData.descricao || "" : ""}
            onChangeText={(text) => handleChange('descricao', text)}
            style={styles.input}
            multiline
          />
        </View>
      ) : ('NIC' in conteudo && conteudo.NIC !== undefined) ? (
        <View>
          <Text variant="headlineSmall" style={styles.label}>NIC:</Text>
          <TextInput
            value={formData && 'NIC' in formData ? formData.NIC || "" : ""}
            onChangeText={(text) => handleChange('NIC', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Nome:</Text>
          <TextInput
            value={formData && 'nome' in formData ? formData.nome || "" : ""}
            onChangeText={(text) => handleChange('nome', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>CPF:</Text>
          <TextInput
            value={formData && 'cpf' in formData ? formData.cpf || "" : ""}
            onChangeText={(text) => handleChange('cpf', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Endereço:</Text>
          <TextInput
            value={formData && 'endereco' in formData ? formData.endereco || "" : ""}
            onChangeText={(text) => handleChange('endereco', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Etnia:</Text>
          <TextInput
            value={formData && 'etnia' in formData ? formData.etnia || "" : ""}
            onChangeText={(text) => handleChange('etnia', text)}
            style={styles.input}
          />
          <Text variant="headlineSmall" style={styles.label}>Descrição anatômica:</Text>
          <TextInput
            value={formData && 'anotacaoAnatomica' in formData ? formData.anotacaoAnatomica || "" : ""}
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