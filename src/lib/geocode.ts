import Geocoder from 'react-native-geocoding';
import Constants from 'expo-constants';

// Acesse a chave de forma segura
const apiKey = Constants.expoConfig?.extra?.googleApiKey;
console.log('API Key (geocode.ts):', apiKey);

if (!apiKey) {
  throw new Error('Chave de API do Google não encontrada. Verifique o app.json.');
}

Geocoder.init(apiKey);

export const buscarCoordenadas = async (local: string) => {
  try {
    const json = await Geocoder.from(local);
    const location = json.results[0].geometry.location;
    return { latitude: location.lat, longitude: location.lng };
  } catch (error) {
    console.warn('Erro ao buscar coordenadas:', error);
    throw new Error('Não foi possível trovar o local...');
  }
};