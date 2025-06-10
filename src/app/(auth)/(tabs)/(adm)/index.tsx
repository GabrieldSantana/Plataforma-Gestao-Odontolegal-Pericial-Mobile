import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IUser } from '../../../../interfaces/IUser';
import { UserCard } from '../../../../components/User/UserCard';
import AdicionarUsuarios from '../(adm)/AdicionarUsuarios';

const Index = () => {
  const [usuarios, setUsuarios] = useState<IUser[]>([
    {
      nome: 'Alice Alves',
      email: 'alice.alves@policia.pe',
      cpf: '12345678900',
      cargo: 'policial',
      senha: '123456',
    },
    {
      nome: 'Rhuan Correia',
      email: 'rhuan.correia@odonto.pe',
      cpf: '12345678901',
      cargo: 'perito',
      senha: '123456',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<IUser | null>(null);

 
  const adicionarUsuario = (novoUsuario: IUser) => {
    setUsuarios([...usuarios, novoUsuario]);
    setModalVisible(false);
  };

  
  const abrirEdicao = (usuario: IUser) => {
    setUsuarioEditando(usuario);
    setModalEditVisible(true);
  };

 
  const salvarEdicao = (usuarioEditado: IUser) => {
    setUsuarios(usuarios.map(u => (u.cpf === usuarioEditado.cpf ? usuarioEditado : u)));
    setModalEditVisible(false);
    setUsuarioEditando(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administração de usuários</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {usuarios.map((user, index) => (
          <UserCard
            key={index}
            user={user}
            onEdit={() => abrirEdicao(user)}  // Passa função para abrir edição
            onDelete={() => {
              setUsuarios(usuarios.filter(u => u.cpf !== user.cpf));
            }}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.cadastrarButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.cadastrarText}>Cadastrar usuário</Text>
      </TouchableOpacity>

      {/* Modal para adicionar novo usuário */}
      <Modal visible={modalVisible} animationType="slide">
        <AdicionarUsuarios
          onClose={() => setModalVisible(false)}
          onSave={adicionarUsuario}
        />
      </Modal>

      {/* Modal para editar usuário */}
      <Modal visible={modalEditVisible} animationType="slide">
        <AdicionarUsuarios
          usuarioParaEditar={usuarioEditando}
          onClose={() => setModalEditVisible(false)}
          onSave={salvarEdicao}
        />
      </Modal>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#0A2A66',
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 6,
  },
  scroll: {
    paddingBottom: 100,
  },
  cadastrarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A66C2',
    paddingHorizontal: 13,
    paddingVertical: 17,
    borderRadius: 15,
    position: 'absolute',
    bottom: 30,
    right: 20,
    elevation: 4,
  },
  cadastrarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
