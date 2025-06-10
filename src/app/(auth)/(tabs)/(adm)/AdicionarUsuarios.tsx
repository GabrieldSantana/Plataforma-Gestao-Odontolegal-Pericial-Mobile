import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { IUser } from '../../../../interfaces/IUser';
import { styles } from '../../../../styles/AdicionarUsuarios.styles';

interface Props {
  usuarioParaEditar?: IUser | null;
  onClose: () => void;
  onSave: (usuario: IUser) => void;
}

const AdicionarUsuarios = ({ usuarioParaEditar, onClose, onSave }: Props) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [senha, setSenha] = useState('');

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
      {/* Cabeçalho com seta de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#001F54" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {usuarioParaEditar ? 'Editar Usuário' : 'Cadastrar Usuário'}
        </Text>
      </View>

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
        editable={!usuarioParaEditar}
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
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onClose}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={salvar}
        >
          <Text style={styles.buttonText}>
            {usuarioParaEditar ? 'Salvar' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AdicionarUsuarios;
