import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    alignItems: 'center',
  },

  gradient: {
    flex: 1, // O degradê preenche todo o SafeAreaView
    width: '100%', // Garante que o degradê ocupe a largura total
    height: '100%',
    paddingTop: 120,
    alignItems: 'center', // Centraliza o conteúdo
  },


  formulario: {
    marginTop: 90,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    paddingHorizontal: 20,
  },

  titulo: {
    fontWeight: 'bold',
    color: '#133756',
    fontSize: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#00000066',
    width: 300,
    padding: 15,
    color: '#000',
    borderRadius: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#111E5F',
    padding: 15,
    width: 220,
    borderRadius: 10,
  },

  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});