import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12, // leve espaço lateral
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },

  label: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 12,
    color: '#333',
  },

  input: {
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
  },

  regiaoContainer: {
    marginTop: 20,
  },

  denteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    marginHorizontal: 12,
  },

  remover: {
    color: 'red',
    marginLeft: 8,
  },

  adicionar: {
    color: '#007AFF',
    marginTop: 4,
    marginHorizontal: 12,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 12,
  },

  btn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#001F54',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  victimContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginHorizontal: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: '#fff',
  },

  victimText: {
    flex: 1,
    color: '#999',
    fontSize: 16,
  },

  victimTextActive: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
});
