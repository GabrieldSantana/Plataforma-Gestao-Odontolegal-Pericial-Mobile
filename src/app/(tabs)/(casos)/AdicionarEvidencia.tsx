import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import { globalStyles as styles } from '../../../styles/globalStyles';

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function CadastroEvidencia() {
  const [categoria, setCategoria] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [local, setLocal] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  // Inicialização do Geocoder no useEffect
  useEffect(() => {
    const apiKey = Constants.expoConfig?.extra?.googleApiKey;
    console.log('API Key:', apiKey);
    if (!apiKey) {
      console.error('Chave de API do Google não encontrada.');
      Alert.alert('Erro', 'Chave de API do Google não configurada corretamente.');
      return;
    }
    Geocoder.init(apiKey); // Inicializa apenas se a chave existir
  }, []); // Executa apenas uma vez ao montar o componente

  const validarFormatoImagem = (uri: string): boolean => {
    const extensao = uri.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png'].includes(extensao ?? '');
  };

  const solicitarPermissao = async (tipo: 'camera' | 'galeria') => {
    const permission =
      tipo === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert('Permissão negada', `Necessária permissão para acessar a ${tipo}.`);
      return false;
    }
    return true;
  };

  const escolherImagem = async (camera = false) => {
    const tipo = camera ? 'camera' : 'galeria';
    const permitido = await solicitarPermissao(tipo);
    if (!permitido) return;

    const result = camera
      ? await ImagePicker.launchCameraAsync({ quality: 1, mediaTypes: ImagePicker.MediaTypeOptions.Images })
      : await ImagePicker.launchImageLibraryAsync({ quality: 1, mediaTypes: ImagePicker.MediaTypeOptions.Images });

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri;
      if (uri && validarFormatoImagem(uri)) {
        setImageUri(uri);
      } else {
        Alert.alert('Formato inválido', 'Apenas imagens JPEG ou PNG são permitidas.');
      }
    }
  };

  const handleUpload = () => {
    Alert.alert('Anexar', 'Escolha uma opção', [
      { text: 'Galeria', onPress: () => escolherImagem(false) },
      { text: 'Câmera', onPress: () => escolherImagem(true) },
      { text: 'Cancelar', style: 'cancel' },
    ]);
  };

  const buscarCoordenadas = async () => {
    if (!local) return;

    try {
      const json = await Geocoder.from(local);
      const { lat, lng } = json.results[0].geometry.location;
      setCoordinates({ latitude: lat, longitude: lng });
    } catch (error) {
      console.warn('Erro ao buscar coordenadas:', error, 'AdicionarEvidencia.tsx');
      Alert.alert('Erro', 'Não foi possível encontrar o local!!! erro na AdicionarEvidencia.tsx');
      setCoordinates(null);
    }
  };

  const handleSubmit = () => {
    if (!titulo || !descricao || !categoria || !local) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dados = {
      titulo,
      descricao,
      categoria,
      local,
      imagem: imageUri,
      coordenadas: coordinates,
    };

    console.log('Enviando dados:', dados);
    Alert.alert('Sucesso', 'Evidência cadastrada com sucesso!');

    resetForm();
  };

  const resetForm = () => {
    setTitulo('');
    setDescricao('');
    setCategoria('');
    setLocal('');
    setImageUri(null);
    setCoordinates(null);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Cadastro de Evidência</Text>

        <Input label="Título: *" value={titulo} onChangeText={setTitulo} placeholder="Insira o título da evidência" />

        <Input
          label="Descrição: *"
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Insira a descrição da evidência"
          multiline
        />

        <Text style={styles.label}>Categoria: *</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={categoria} onValueChange={setCategoria} style={styles.picker}>
            <Picker.Item label="Selecione a categoria" value="" />
            <Picker.Item label="Radiografia" value="radiografia" />
            <Picker.Item label="Odontograma" value="odontograma" />
            <Picker.Item label="Outro" value="outro" />
          </Picker>
        </View>

        <Text style={styles.label}>Anexo: (opcional)</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
          ) : (
            <>
              <Text style={styles.uploadText}>Você pode anexar uma imagem ou tirar uma foto</Text>
              <Ionicons name="cloud-upload-outline" size={48} color="#333" />
            </>
          )}
        </TouchableOpacity>

        <Input
          label="Local: *"
          value={local}
          onChangeText={setLocal}
          placeholder="Insira o local da evidência"
          onEndEditing={buscarCoordenadas}
        />

        {coordinates && (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinates,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={coordinates} title="Local da Evidência" />
          </MapView>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar Evidência</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  onEndEditing?: () => void;
};

function Input({ label, value, onChangeText, placeholder, multiline = false, onEndEditing }: InputProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && { height: 100, textAlignVertical: 'top' }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        onEndEditing={onEndEditing}
      />
    </>
  );
}