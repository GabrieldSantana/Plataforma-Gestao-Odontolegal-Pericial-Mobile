import {Text, View, StyleSheet } from 'react-native';
import { Login } from './src/screens/Login';
import {CadastroNovoCaso} from './src/screens/CadastroNovoCaso';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Login /> */}
      <CadastroNovoCaso />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
