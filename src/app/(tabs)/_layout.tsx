import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

export default function TabLayout() {
  return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#111E5F', width: '100%', height: 60}}>
            <Text style={{color: 'white'}}>GOV</Text>
        </View>
        <Tabs>
            <Tabs.Screen name="VisualizacaoCasos" options={{headerShown: false}}/>
            <Tabs.Screen name="Dashboard" options={{headerShown: false}}/>
            <Tabs.Screen name="Perfil" options={{headerShown: false}}/>
        </Tabs>
      </View>
     
  );
}