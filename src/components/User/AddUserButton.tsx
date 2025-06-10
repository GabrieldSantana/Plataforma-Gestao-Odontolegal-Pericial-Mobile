import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { IUser } from '../../../../interfaces/IUser';

interface Props {
  onClose: () => void;
  onSave: (usuario: IUser) => void;
  usuarioParaEditar?: IUser | null;
}

const AdicionarUsuarios = ({ onClose, onSave, usuarioParaEditar }: Props) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [senha, setSenha] = useState('');

  // Preenche campos se estiver editando
  useEffect(() => {
    if (usuarioParaEditar) {
      setNome(usuarioParaEditar.nome);
      setEmail(usuarioParaEditar.email);
      setCpf(usuarioParaEditar.cpf);
      setCargo(usuarioParaEditar.cargo);
      setSenha(usuarioParaEditar.senha);
    } else {
      setNome('');
      setEmail('');
      setCpf('');
      setCargo('');
      setSenha('');
    }
  }, [usuarioParaEditar]);

  const salvar = () => {
    if (!nome || !email || !cpf || !cargo || !senha) {
      alert('Preencha todos os campos');
      return;
    }

    onSave({ nome, email, cpf, cargo, senha });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{usuarioParaEditar ? 'Editar Usuário' : 'Cadastrar Usuário'}</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        style={styles.input}
        editable={!usuarioParaEditar} // CPF não pode ser editado, pois identifica o usuário
      />
      <TextInput
        placeholder="Cargo"
        value={cargo}
        onChangeText={setCargo}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={salvar}>
          <Text style={styles.buttonText}>{usuarioParaEditar ? 'Salvar' : 'Cadastrar'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdicionarUsuarios;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFF',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2A66',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#0A66C2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#0A66C2',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
