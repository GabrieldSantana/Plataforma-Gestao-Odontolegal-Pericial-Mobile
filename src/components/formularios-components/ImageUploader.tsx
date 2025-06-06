import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ImageUploaderProps {
  imageUri: string | null;
  onPress: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ imageUri, onPress }) => (
  <TouchableOpacity style={styles.uploadBox} onPress={onPress}>
    {imageUri ? (
      <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
    ) : (
      <>
        <Text style={styles.uploadText}>Você pode anexar uma imagem ou tirar uma foto</Text>
        <Ionicons name="cloud-upload-outline" size={48} color="#333" />
      </>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  uploadBox: { borderWidth: 1, borderColor: '#999', borderRadius: 5, padding: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginTop: 5 },
  uploadText: { textAlign: 'center', marginBottom: 10, color: '#333' },
  uploadedImage: { width: 200, height: 200, marginTop: 10, borderRadius: 10 },
});
