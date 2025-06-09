import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12, // leve espaço lateral
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001F54',
  },

  label: {
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 12,
    fontWeight: '600',
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

  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },

  disabledInput: {
    backgroundColor: '#eee',
    color: '#888',
  },

  picker: {
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },

  dateButton: {
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    marginBottom: 10,
  },

  submitButton: {
    marginTop: 24,
    marginHorizontal: 12,
    backgroundColor: '#001F54',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
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
  fileButton: {
    borderWidth: 1,
    borderColor: '#007bff',
    padding: 12,
    borderRadius: 4,
    marginHorizontal: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  fileText: {
    color: '#007bff',
  },

  modalContainer: {
    flex: 1,
    padding: 20,
  },
  odontogramaRegion: {
    marginBottom: 15,
  },
  odontogramaTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  odontogramaItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  odontogramaInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  addOdontogramaText: {
    color: '#007bff',
    marginTop: 5,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonCancel: {
    padding: 15,
    backgroundColor: '#001F54',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  modalButtonSave: {
    padding: 15,
    backgroundColor: '#001F54',
    borderRadius: 5,
    flex: 1,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
