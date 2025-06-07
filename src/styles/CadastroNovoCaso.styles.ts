import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
  multilineInput: {
    minHeight: 60,
  },
  picker: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 4,
  },
  dateButton: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 12,
    borderRadius: 4,
  },
  victimContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
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
    marginBottom: 20,
    alignItems: 'center',
  },
  fileText: {
    color: '#007bff',
  },
  submitButton: {
    backgroundColor: '#001F54',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
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
  disabledInput: {
    backgroundColor: '#eee',
  },
});
