import { Stack } from 'expo-router';

export default function CasosLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Casos',headerShown: false }}
      />
      <Stack.Screen
        name="caso/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}