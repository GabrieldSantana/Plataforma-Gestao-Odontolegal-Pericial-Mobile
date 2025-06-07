import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Cabeçalho personalizado */}
      <View style={{ backgroundColor: '#111E5F', width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>GOP</Text>
      </View>
      {/* Tabs */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'blue',
          headerShown: false, // Oculta o cabeçalho padrão das abas
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