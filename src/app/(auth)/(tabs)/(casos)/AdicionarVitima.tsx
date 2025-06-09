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

import style from '../../../../styles/vitima.styles';

interface Odontograma {
  superiorEsquerdo: string[];
  superiorDireito: string[];
  inferiorEsquerdo: string[];
  inferiorDireito: string[];
}

interface Vitima {
  cin: string;
  nome: string;
  genero?: string;
  idade?: string;
  documento?: string;
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
  documento: '',
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

  const salvar = () => {
    if (!vitima.cin || !vitima.nome) {
      Alert.alert('Erro', 'CIN e Nome são obrigatórios.');
      return;
    }

    const jsonVitima = JSON.stringify(vitima, null, 2);
    console.log('✅ Vítima cadastrada:', jsonVitima);
    Alert.alert('Sucesso', 'Vítima cadastrada com sucesso!');

    setVitima(vitimaInicial);
  };

  return (
    <>
      <SafeAreaView style={{ backgroundColor: 'white' }}>
        <Appbar.Header style={{ backgroundColor: 'white', elevation: 4 }}>
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

          <Text style={style.label}>Documento</Text>
          <TextInput
            style={style.input}
            value={vitima.documento}
            onChangeText={(t) => atualizarCampo('documento', t)}
          />

          <Text style={style.label}>Endereço</Text>
          <TextInput
            style={style.input}
            value={vitima.endereco}
            onChangeText={(t) => atualizarCampo('endereco', t)}
          />

          <Text style={style.label}>Cor</Text>
          <TextInput
            style={style.input}
            value={vitima.cor}
            onChangeText={(t) => atualizarCampo('cor', t)}
          />

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

          <TouchableOpacity style={[style.btn, style.saveBtn]} onPress={salvar}>
            <Text style={style.btnText}>Cadastrar Vítima</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CadastrarVitima;
