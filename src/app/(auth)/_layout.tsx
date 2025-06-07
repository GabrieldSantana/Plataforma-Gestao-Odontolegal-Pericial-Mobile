import { Redirect, Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthLayout() {
  const [isAutenticado, setIsAutenticado] = useState<null | boolean>(null);

  useEffect(() => {
    const verificarToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsAutenticado(!!token); // true se existir
    };

    verificarToken();
  }, []);

  if (isAutenticado === null) return null; // ou loading...

  if (!isAutenticado) return <Redirect href="/" />; // redireciona para login

  return <Slot />; // Renderiza as rotas protegidas
}
