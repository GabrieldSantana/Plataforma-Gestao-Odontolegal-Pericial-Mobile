import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  cancelBtn: {
    backgroundColor: '#001F54',
  },
  saveBtn: {
    backgroundColor: '#001F54',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
