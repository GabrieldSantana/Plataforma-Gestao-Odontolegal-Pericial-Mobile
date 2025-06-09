import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#001F54',
    borderBottomWidth: 2,
    borderBottomColor: '#001F54',
    paddingBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  uploadText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#001F54',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
