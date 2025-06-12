import { Tabs, Redirect } from 'expo-router'; // Adicione Redirect
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface Usuario {
  __v: number;
  id?: string;
  nome?: string;
  email?: string;
  cargo?: string;
  cpf?: string;
}

export default function TabLayout() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDadosAdm = async (): Promise<void> => {
    try {
      const json = await AsyncStorage.getItem('usuario');
      if (json === null) {
        setUsuario(null);
      } else {
        const usuarioDados: Usuario = JSON.parse(json);
        setUsuario(usuarioDados);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDadosAdm();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  // Redireciona para (casos)/index.tsx após carregar os dados


  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#111E5F', width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>GOP</Text>
      </View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          headerShown: false,
          tabBarStyle: {
            height: 70,
            paddingBottom: 10,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
          tabBarIconStyle: {
            marginTop: 5,
          },
        }}
      >
        <Tabs.Screen
          name="(casos)"
          options={{
            title: 'Casos',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Dashboard"
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="bar-chart" color={color} />,
          }}
        />
        {usuario?.cargo === 'admin' && (
          <Tabs.Screen
            name="(adm)"
            options={{
              title: 'Admnistrar',
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
            }}
          />
        )}
        <Tabs.Screen
          name="Perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}