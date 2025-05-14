import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 100,
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


