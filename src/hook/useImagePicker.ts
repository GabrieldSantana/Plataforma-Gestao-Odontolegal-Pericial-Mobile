import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { validarFormato } from '../lib/validate';
import {buscarCoordenadas} from '../lib/geocode'

export const useImagePicker = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const escolherImagem = async (camera = false) => {
    let result: ImagePicker.ImagePickerResult;

    if (camera) {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permissão negada', 'Necessária permissão para usar a câmera.');
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    } else {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert('Permissão negada', 'Necessária permissão para acessar a galeria.');
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });
    }

    if (!result.canceled) {
      const uri = result.assets && result.assets.length > 0 ? result.assets[0].uri : (result as any).uri;
      if (!validarFormato(uri)) {
        Alert.alert('Formato inválido', 'Apenas imagens JPEG ou PNG são permitidas.');
        return;
      }
      setImageUri(uri);
    }
  };

  return { imageUri, setImageUri, escolherImagem };
};
