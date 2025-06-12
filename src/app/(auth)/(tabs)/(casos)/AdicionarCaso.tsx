import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';   // <-- import router do expo-router
import { Ionicons } from '@expo/vector-icons'; // ícone seta voltar
import styles from '../../../../styles/CadastroNovoCaso.styles';

const CadastroNovoCaso = () => {
  const [caso, setCaso] = useState({
    nome: '',
    local: '',
    dataHora: new Date(),
    descricao: '',
    tipo: '',
    peritoResponsavel: '',
  });

  const [showPicker, setShowPicker] = useState(false);
  const [modePicker, setModePicker] = useState<'date' | 'time'>('date');

  useEffect(() => {
    const carregarPerito = async () => {
      try {
        const usuarioStr = await AsyncStorage.getItem('usuario');
        if (usuarioStr) {
          const usuario = JSON.parse(usuarioStr);
          setCaso((prev) => ({ ...prev, peritoResponsavel: usuario._id }));
        }
      } catch (err) {
        Alert.alert('Erro', 'Erro ao carregar usuário logado.');
      }
    };

    carregarPerito();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setCaso((prev) => ({ ...prev, [field]: value }));
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShowPicker(true);
    setModePicker(currentMode);
  };

  const onChangeDateTime = (event: any, selectedDate: Date | undefined) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }

    if (modePicker === 'date' && selectedDate) {
      const newDate = selectedDate;
      const newDateTime = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        caso.dataHora.getHours(),
        caso.dataHora.getMinutes()
      );
      setCaso((prev) => ({ ...prev, dataHora: newDateTime }));
      setModePicker('time');
      setShowPicker(true);
    } else if (selectedDate) {
      const newTime = selectedDate;
      const newDateTime = new Date(
        caso.dataHora.getFullYear(),
        caso.dataHora.getMonth(),
        caso.dataHora.getDate(),
        newTime.getHours(),
        newTime.getMinutes()
      );
      setCaso((prev) => ({ ...prev, dataHora: newDateTime }));
      setShowPicker(false);
    }
  };

  const handleSubmit = async () => {
    const { nome, local, dataHora, tipo, peritoResponsavel } = caso;

    if (!nome || !local || !dataHora || !tipo || !peritoResponsavel) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado.');
        return;
      }

      const response = await fetch(
        'https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/casos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nome,
            local,
            dataHora: dataHora.toISOString(),
            descricao: caso.descricao,
            tipo,
            peritoResponsavel,
          }),
        }
      );

      if (response.ok) {
        Alert.alert('Sucesso', 'Caso cadastrado com sucesso!');
        setCaso({
          nome: '',
          local: '',
          dataHora: new Date(),
          descricao: '',
          tipo: '',
          peritoResponsavel: '',
        });
      } else {
        const erro = await response.json();
        Alert.alert('Erro', erro.message || 'Erro ao cadastrar o caso.');
      }
    } catch (err) {
      Alert.alert('Erro', 'Erro na comunicação com o servidor.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar alinhado com o título */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#001F54" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro de Novo Caso</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
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
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => showMode('date')}
          activeOpacity={0.7}
        >
          <Text>{caso.dataHora.toLocaleString()}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={caso.dataHora}
            mode={modePicker}
            display="default"
            onChange={onChangeDateTime}
          />
        )}

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
            <Picker.Item label="Lesão Corporal" value="Lesão Corporal" />
            <Picker.Item
              label="Identificação por Arcos Dentais"
              value="Identificação por Arcos Dentais"
            />
            <Picker.Item
              label="Exame de Marcas de Mordida"
              value="Exame de Marcas de Mordida"
            />
            <Picker.Item label="Coleta de DNA" value="Coleta de DNA" />
          </Picker>
        </View>

        <Text style={styles.label}>Perito Responsável *</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={caso.peritoResponsavel}
          editable={false}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.7}
        >
          <Text style={styles.submitText}>Salvar Caso</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CadastroNovoCaso;
