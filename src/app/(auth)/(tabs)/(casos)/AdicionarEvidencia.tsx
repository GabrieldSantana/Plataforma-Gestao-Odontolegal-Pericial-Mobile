import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appbar } from 'react-native-paper';
import { router } from 'expo-router';

import { globalStyles as styles } from '../../../../styles/globalStyles';

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function CadastroEvidencia() {
  const [categoria, setCategoria] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    const configurarGeolocalizacao = async () => {
      const apiKey = Constants.expoConfig?.extra?.googleApiKey;
      if (!apiKey) {
        Alert.alert('Erro', 'Chave de API do Google não configurada corretamente.');
        return;
      }

      Geocoder.init(apiKey);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permissão de localização é necessária para mostrar o mapa.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log('Localização atual:\n', JSON.stringify({
        localizacao: {
          type: 'Point',
          coordinates: [longitude, latitude],
        }
      }, null, 4));

      setCoordinates({ latitude, longitude });
    };

    configurarGeolocalizacao();
  }, []);

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

  const handleSubmit = async () => {
    if (!titulo || !descricao || !categoria || !coordinates || !imageUri) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios e anexe uma imagem.');
      return;
    }

    try {
      const casoId = await AsyncStorage.getItem('casoId');
      const token = await AsyncStorage.getItem('token');

      if (!casoId) {
        Alert.alert('Erro', 'ID do caso não encontrado.');
        return;
      }

      const formData = new FormData();

      formData.append('casoId', casoId);
      formData.append('tituloEvidencia', titulo);
      formData.append('tipoEvidencia', categoria);
      formData.append('descricao', descricao);

      formData.append('localizacao', JSON.stringify({
        type: 'Point',
        coordinates: [coordinates.longitude, coordinates.latitude],
      }));

      const fileName = imageUri.split('/').pop() ?? 'imagem.jpg';
      let fileType = 'image/jpeg';
      if (fileName.toLowerCase().endsWith('.png')) fileType = 'image/png';

      formData.append('arquivo', {
        uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
        name: fileName,
        type: fileType,
      } as any);

      const apiUrl = 'https://plataforma-gestao-analise-pericial-b2a1.onrender.com/api/evidencias';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na API:', response.status, errorText);
        throw new Error('Erro ao enviar a evidência.');
      }

      Alert.alert('Sucesso', 'Evidência cadastrada com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Falha ao cadastrar evidência:', error);
      Alert.alert('Erro', 'Falha ao cadastrar a evidência.');
    }
  };

  const resetForm = () => {
    setTitulo('');
    setDescricao('');
    setCategoria('');
    setImageUri(null);
    setCoordinates(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Appbar.Header style={{ backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0, marginTop: -30, marginBottom: -10, height: 50, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Appbar.BackAction onPress={() => router.back()} color="#001F54" />
        <Appbar.Content title="Cadastro de Evidência" titleStyle={{ color: '#001F54' }} />
      </Appbar.Header>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.container}>
          <Input label="Título: *" value={titulo} onChangeText={setTitulo} placeholder="Insira o título da evidência" />
          <Input label="Descrição: *" value={descricao} onChangeText={setDescricao} placeholder="Insira a descrição da evidência" multiline />

          <Text style={styles.label}>Categoria: *</Text>
          <View style={styles.pickerContainer}>
            <Picker selectedValue={categoria} onValueChange={setCategoria} style={styles.picker}>
              <Picker.Item label="Selecione a categoria" value="" />
              <Picker.Item label="Radiografia" value="radiografia" />
              <Picker.Item label="Odontograma" value="odontograma" />
              <Picker.Item label="Outro" value="outro" />
            </Picker>
          </View>

          <Text style={styles.label}>Anexo (imagem obrigatória): *</Text>
          <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
            ) : (
              <>
                <Text style={styles.uploadText}>Anexe uma imagem ou tire uma foto</Text>
                <Ionicons name="cloud-upload-outline" size={48} color="#333" />
              </>
            )}
          </TouchableOpacity>

          {coordinates && (
            <>
              <Text style={styles.label}>Local:</Text>
              <Text style={styles.input}>
                Latitude: {coordinates.latitude.toFixed(6)} | Longitude: {coordinates.longitude.toFixed(6)}
              </Text>
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
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar Evidência</Text>
          </TouchableOpacity>

          <StatusBar style="auto" />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

type InputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
};

function Input({ label, value, onChangeText, placeholder, multiline = false }: InputProps) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && { height: 100, textAlignVertical: 'top' }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
      />
    </>
  );
}
