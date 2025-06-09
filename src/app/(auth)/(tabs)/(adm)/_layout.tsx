import { Stack } from 'expo-router';

export default function AdmLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Administrar',headerShown: false }}
      />
      <Stack.Screen
        name="AdicionarUsuarios"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}