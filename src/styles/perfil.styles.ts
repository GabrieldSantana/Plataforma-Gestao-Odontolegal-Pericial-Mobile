import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001c55',
    textAlign: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginTop: 10,
    fontSize: 16,
  },
  infoSection: {
    marginTop: 10,  // diminui a distância para subir o conteúdo
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    marginBottom: 10,  // menor espaçamento entre os campos
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  logoutButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default styles;
