import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../../../../styles/CadastroNovoCaso.styles";
import { StyleSheet } from 'react-native';

const CadastroNovoCaso = () => {
  const [caso, setCaso] = useState({
    nome: '',
    local: '',
    dataHora: new Date(),
    descricao: '',
    tipo: '',
    perito: 'Usuário Logado',
    anexos: null,
    vitima: null,
  });

  const [vitima, setVitima] = useState({
    cin: '',
    nome: '',
    genero: '',
    idade: '',
    documento: '',
    endereco: '',
    cor: '',
    odontograma: {
      superiorEsquerdo: [''],
      superiorDireito: [''],
      inferiorEsquerdo: [''],
      inferiorDireito: [''],
    },
    anotacoesOdontograma: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [modePicker, setModePicker] = useState<'date' | 'time'>('date');

  const handleFilePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.type !== 'cancel') {
      setCaso((prev) => ({ ...prev, anexos: result }));
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShowPicker(true);
    setModePicker(currentMode);
  };

  const onChangeDateTime = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }
    if (modePicker === 'date') {
      const current = selectedDate || caso.dataHora;
      const newDateTime = new Date(
        current.getFullYear(),
        current.getMonth(),
        current.getDate(),
        caso.dataHora.getHours(),
        caso.dataHora.getMinutes()
      );
      setCaso((prev) => ({ ...prev, dataHora: newDateTime }));
      setModePicker('time');
      setShowPicker(true);
    } else {
      const current = selectedDate || caso.dataHora;
      const newDateTime = new Date(
        caso.dataHora.getFullYear(),
        caso.dataHora.getMonth(),
        caso.dataHora.getDate(),
        current.getHours(),
        current.getMinutes()
      );
      setCaso((prev) => ({ ...prev, dataHora: newDateTime }));
      setShowPicker(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCaso((prev) => ({ ...prev, [field]: value }));
  };

  const handleVitimaChange = (field, value) => {
    setVitima((prev) => ({ ...prev, [field]: value }));
  };

  const handleOdontogramaChange = (regiao, index, value) => {
    setVitima((prev) => {
      const novaRegiao = [...prev.odontograma[regiao]];
      novaRegiao[index] = value;
      return {
        ...prev,
        odontograma: {
          ...prev.odontograma,
          [regiao]: novaRegiao,
        },
      };
    });
  };

  const addOdontogramaItem = (regiao) => {
    setVitima((prev) => {
      const novaRegiao = [...prev.odontograma[regiao], ''];
      return {
        ...prev,
        odontograma: {
          ...prev.odontograma,
          [regiao]: novaRegiao,
        },
      };
    });
  };

  const removeOdontogramaItem = (regiao, index) => {
    setVitima((prev) => {
      const novaRegiao = prev.odontograma[regiao].filter((_, i) => i !== index);
      return {
        ...prev,
        odontograma: {
          ...prev.odontograma,
          [regiao]: novaRegiao,
        },
      };
    });
  };

  const addVitimaToCaso = () => {
    if (!vitima.nome || !vitima.cin) {
      Alert.alert('Erro', 'Preencha pelo menos Nome e CIN da vítima.');
      return;
    }
    setCaso((prev) => ({ ...prev, vitima }));
    setModalVisible(false);
  };

  const getFileName = (fileObj) => {
    if (!fileObj) return null;
    if (fileObj.name) return fileObj.name;
    if (fileObj.uri) {
      const parts = fileObj.uri.split('/');
      return parts[parts.length - 1];
    }
    return 'Arquivo selecionado';
  };

  const handleSubmit = () => {
    const { nome, local, dataHora, tipo, perito, vitima: v } = caso;
    if (!nome || !local || !dataHora || !tipo || !perito || !v) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    console.log('✅ Caso cadastrado:', JSON.stringify(caso, null, 2));
    Alert.alert('Sucesso', 'Caso cadastrado com sucesso!');

    setCaso({
      nome: '',
      local: '',
      dataHora: new Date(),
      descricao: '',
      tipo: '',
      perito: 'Usuário Logado',
      anexos: null,
      vitima: null,
    });

    setVitima({
      cin: '',
      nome: '',
      genero: '',
      idade: '',
      documento: '',
      endereco: '',
      cor: '',
      odontograma: {
        superiorEsquerdo: [''],
        superiorDireito: [''],
        inferiorEsquerdo: [''],
        inferiorDireito: [''],
      },
      anotacoesOdontograma: '',
    });
  };

  const regioes = ['superiorEsquerdo', 'superiorDireito', 'inferiorEsquerdo', 'inferiorDireito'];
  const nomesRegioes = {
    superiorEsquerdo: 'Superior Esquerdo',
    superiorDireito: 'Superior Direito',
    inferiorEsquerdo: 'Inferior Esquerdo',
    inferiorDireito: 'Inferior Direito',
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Cadastro de Novo Caso</Text>

        <Text style={styles.label}>Nome do Caso *</Text>
        <TextInput
          style={styles.input}
          value={caso.nome}
          onChangeText={(text) => handleInputChange('nome', text)}
          placeholder="Digite o nome do caso"
        />

        <Text style={styles.label}>Local *</Text>
        <TextInput
          style={styles.input}
          value={caso.local}
          onChangeText={(text) => handleInputChange('local', text)}
          placeholder="Digite o local do caso"
        />

        <Text style={styles.label}>Data e Hora *</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => showMode('date')}>
          <Text>{caso.dataHora.toLocaleString()}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={caso.descricao}
          onChangeText={(text) => handleInputChange('descricao', text)}
          placeholder="Descrição do caso"
          multiline
        />

        <Text style={styles.label}>Tipo *</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={caso.tipo}
            onValueChange={(itemValue) => handleInputChange('tipo', itemValue)}
          >
            <Picker.Item label="Selecione o tipo" value="" />
            <Picker.Item label="Lesão corporal" value="Lesão corporal" />
            <Picker.Item label="Homicídio" value="Homicídio" />
            <Picker.Item label="Roubo" value="Roubo" />
            <Picker.Item label="Outro" value="Outro" />
          </Picker>
        </View>

        <Text style={styles.label}>Perito *</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={caso.perito}
          editable={false}
        />

        <Text style={styles.label}>Vítima *</Text>
        <TouchableOpacity style={styles.victimContainer} onPress={() => setModalVisible(true)}>
          {caso.vitima ? (
            <Text style={styles.victimTextActive}>{caso.vitima.nome}</Text>
          ) : (
            <Text style={styles.victimText}>Clique para adicionar vítima</Text>
          )}
          <Feather name="user-plus" size={20} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fileButton} onPress={handleFilePicker}>
          <Text style={styles.fileText}>
            {caso.anexos ? getFileName(caso.anexos) : 'Anexar arquivos (opcional)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Salvar Caso</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal da Vítima */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.title}>Cadastrar Vítima</Text>

          <Text style={styles.label}>CIN *</Text>
          <TextInput
            style={styles.input}
            value={vitima.cin}
            onChangeText={(text) => handleVitimaChange('cin', text)}
            placeholder="Número CIN"
          />

          <Text style={styles.label}>Nome *</Text>
          <TextInput
            style={styles.input}
            value={vitima.nome}
            onChangeText={(text) => handleVitimaChange('nome', text)}
            placeholder="Nome da vítima"
          />

          <Text style={styles.label}>Gênero</Text>
          <TextInput
            style={styles.input}
            value={vitima.genero}
            onChangeText={(text) => handleVitimaChange('genero', text)}
            placeholder="Gênero"
          />

          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={styles.input}
            value={vitima.idade}
            onChangeText={(text) => handleVitimaChange('idade', text)}
            placeholder="Idade"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Documento</Text>
          <TextInput
            style={styles.input}
            value={vitima.documento}
            onChangeText={(text) => handleVitimaChange('documento', text)}
            placeholder="Documento de identificação"
          />

          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            value={vitima.endereco}
            onChangeText={(text) => handleVitimaChange('endereco', text)}
            placeholder="Endereço"
          />

          <Text style={styles.label}>Cor</Text>
          <TextInput
            style={styles.input}
            value={vitima.cor}
            onChangeText={(text) => handleVitimaChange('cor', text)}
            placeholder="Cor"
          />

          {/* Odontograma */}
          <Text style={styles.label}>Odontograma</Text>
          {regioes.map((regiao) => (
            <View key={regiao} style={styles.odontogramaRegion}>
              <Text style={styles.odontogramaTitle}>{nomesRegioes[regiao]}</Text>
              {vitima.odontograma[regiao].map((item, index) => (
                <View key={index} style={styles.odontogramaItemContainer}>
                  <TextInput
                    style={styles.odontogramaInput}
                    value={item}
                    onChangeText={(text) => handleOdontogramaChange(regiao, index, text)}
                    placeholder="Detalhe"
                  />
                  <TouchableOpacity
                    onPress={() => removeOdontogramaItem(regiao, index)}
                    disabled={vitima.odontograma[regiao].length === 1}
                    style={{ marginLeft: 5 }}
                  >
                    <Feather
                      name="trash-2"
                      size={20}
                      color={vitima.odontograma[regiao].length === 1 ? '#ccc' : 'red'}
                    />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity onPress={() => addOdontogramaItem(regiao)}>
                <Text style={styles.addOdontogramaText}>+ Adicionar</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.label}>Anotações do Odontograma</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={vitima.anotacoesOdontograma}
            onChangeText={(text) => handleVitimaChange('anotacoesOdontograma', text)}
            multiline
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: '#001F54' }]}
              onPress={addVitimaToCaso}
            >
              <Text style={styles.submitText}>Salvar Vítima</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: '#001F54' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.submitText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {/* DateTime Picker */}
      {showPicker && (
        <DateTimePicker
          value={caso.dataHora}
          mode={modePicker}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDateTime}
        />
      )}
    </View>
  );
};

export default CadastroNovoCaso;
