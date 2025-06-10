import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import { Appbar } from 'react-native-paper';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Picker } from '@react-native-picker/picker';

import style from '../../../../styles/vitima.styles';

interface Odontograma {
  superiorEsquerdo: string[];
  superiorDireito: string[];
  inferiorEsquerdo: string[];
  inferiorDireito: string[];
}

interface Vitima {
  cin?: string;
  nome: string;
  genero?: string;
  idade?: string;
  cpf?: string;
  endereco?: string;
  cor?: string;
  odontograma: Odontograma;
  anotacoesOdontograma?: string;
}

const vitimaInicial: Vitima = {
  cin: '',
  nome: '',
  odontograma: {
    superiorEsquerdo: [''],
    superiorDireito: [''],
    inferiorEsquerdo: [''],
    inferiorDireito: [''],
  },
  genero: '',
  idade: '',
  cpf: '',
  endereco: '',
  cor: '',
  anotacoesOdontograma: '',
};

const regioes: { chave: keyof Odontograma; label: string }[] = [
  { chave: 'superiorEsquerdo', label: 'Superior Esquerdo' },
  { chave: 'superiorDireito', label: 'Superior Direito' },
  { chave: 'inferiorEsquerdo', label: 'Inferior Esquerdo' },
  { chave: 'inferiorDireito', label: 'Inferior Direito' },
];

const coresOpcoes = [
  'Branca',
  'Preta',
  'Parda',
  'Amarela',
  'Indígena',
  'Não identificado',
];

const CadastrarVitima = () => {
  const [vitima, setVitima] = useState<Vitima>(vitimaInicial);

  const atualizarCampo = (campo: keyof Vitima, valor: string) => {
    setVitima((prev) => ({ ...prev, [campo]: valor }));
  };

  const atualizarDente = (regiao: keyof Odontograma, index: number, valor: string) => {
    const novaRegiao = [...vitima.odontograma[regiao]];
    novaRegiao[index] = valor;
    setVitima((prev) => ({
      ...prev,
      odontograma: {
        ...prev.odontograma,
        [regiao]: novaRegiao,
      },
    }));
  };

  const adicionarDente = (regiao: keyof Odontograma) => {
    setVitima((prev) => ({
      ...prev,
      odontograma: {
        ...prev.odontograma,
        [regiao]: [...prev.odontograma[regiao], ''],
      },
    }));
  };

  const removerDente = (regiao: keyof Odontograma, index: number) => {
    setVitima((prev) => ({
      ...prev,
      odontograma: {
        ...prev.odontograma,
        [regiao]: prev.odontograma[regiao].filter((_, i) => i !== index),
      },
    }));
  };

  const salvar = async () => {
    if (!vitima.nome) {
      Alert.alert('Erro', 'O nome é obrigatório.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const casoId = await AsyncStorage.getItem('casoId'); // busca o caso ativo

      if (!token || !casoId) {
        Alert.alert('Erro', 'Token ou Caso ID não encontrados.');
        return;
      }

      const response = await fetch('https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/vitimas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          casoId,
          nome: vitima.nome,
          genero: vitima.genero,
          idade: vitima.idade ? parseInt(vitima.idade, 10) : undefined,
          cpf: vitima.cpf,
          endereco: vitima.endereco,
          etnia: vitima.cor,
          anotacaoAnatomia: vitima.anotacoesOdontograma,
          odontograma: vitima.odontograma,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        Alert.alert('Erro ao salvar', data?.message || 'Erro desconhecido');
        return;
      }

      Alert.alert('Sucesso', 'Vítima cadastrada com sucesso!');
      setVitima(vitimaInicial);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a vítima.');
    }
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <Appbar.Header style={{
          backgroundColor: 'transparent',
          elevation: 0,           // Remove sombra Android
          shadowOpacity: 0,       // Remove sombra iOS
          marginTop: -30,          // Remove padding extra iOS
          marginBottom: 0,
          height: 50,
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <Appbar.BackAction onPress={() => router.back()} color="#001F54" />
          <Appbar.Content title="Cadastro de Vítima" titleStyle={{ color: '#001F54' }} />
        </Appbar.Header>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={style.container}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          {/* Campos do formulário */}
          <Text style={style.label}>CIN*</Text>
          <TextInput
            style={style.input}
            value={vitima.cin}
            onChangeText={(t) => atualizarCampo('cin', t)}
          />

          <Text style={style.label}>Nome*</Text>
          <TextInput
            style={style.input}
            value={vitima.nome}
            onChangeText={(t) => atualizarCampo('nome', t)}
          />

          <Text style={style.label}>Gênero</Text>
          <TextInput
            style={style.input}
            value={vitima.genero}
            onChangeText={(t) => atualizarCampo('genero', t)}
          />

          <Text style={style.label}>Idade</Text>
          <TextInput
            style={style.input}
            keyboardType="numeric"
            value={vitima.idade}
            onChangeText={(t) => atualizarCampo('idade', t)}
          />

          <Text style={style.label}>CPF</Text>
          <TextInput
            style={style.input}
            value={vitima.cpf}
            onChangeText={(t) => atualizarCampo('cpf', t)}
            keyboardType="numeric"
            maxLength={11}
          />

          <Text style={style.label}>Endereço</Text>
          <TextInput
            style={style.input}
            value={vitima.endereco}
            onChangeText={(t) => atualizarCampo('endereco', t)}
          />

          <Text style={style.label}>Cor</Text>
          <View style={[style.input, { padding: 0 }]}>
            <Picker
              selectedValue={vitima.cor}
              onValueChange={(itemValue) => atualizarCampo('cor', itemValue)}
              mode="dropdown"
            >
              <Picker.Item label="Selecione a cor" value="" />
              {coresOpcoes.map((cor) => (
                <Picker.Item key={cor} label={cor} value={cor} />
              ))}
            </Picker>
          </View>

          {regioes.map(({ chave, label }) => (
            <View key={chave} style={style.regiaoContainer}>
              <Text style={style.label}>{label}</Text>
              {vitima.odontograma[chave].map((valor, i) => (
                <View key={i} style={style.denteRow}>
                  <TextInput
                    style={[style.input, { flex: 1 }]}
                    value={valor}
                    onChangeText={(t) => atualizarDente(chave, i, t)}
                  />
                  <TouchableOpacity onPress={() => removerDente(chave, i)}>
                    <Text style={style.remover}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity onPress={() => adicionarDente(chave)}>
                <Text style={style.adicionar}>+ Adicionar</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={style.label}>Anotações do Odontograma</Text>
          <TextInput
            style={[style.input, { height: 100, marginBottom: 20 }]}
            multiline
            value={vitima.anotacoesOdontograma}
            onChangeText={(t) => atualizarCampo('anotacoesOdontograma', t)}
          />

          <TouchableOpacity style={[style.btn]} onPress={salvar}>
            <Text style={style.btnText}>Cadastrar Vítima</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CadastrarVitima;
