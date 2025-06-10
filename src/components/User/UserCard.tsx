import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IUser } from '../../interfaces/IUser';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  user: IUser;
  onEdit: () => void;
  onDelete: () => void;
}

export const UserCard = ({ user, onEdit, onDelete }: Props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.nome}>{user.nome}</Text>

        <View style={styles.roleMenuRow}>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user.cargo.charAt(0).toUpperCase() + user.cargo.slice(1)}</Text>
          </View>
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.cpf}>CPF: {user.cpf}</Text>

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => { setMenuVisible(false); onEdit(); }}>
            <Text style={styles.menuItem}>✏️ Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setMenuVisible(false); onDelete(); }}>
            <Text style={styles.menuItem}>🗑️ Deletar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2A66',
    maxWidth: '60%',
  },
  roleMenuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleBadge: {
    backgroundColor: '#0A66C2',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  roleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 13,
    color: '#666',
    marginTop: 6,
  },
  cpf: {
    fontSize: 13,
    color: '#666',
  },
  menuButton: {
    padding: 4,
  },
  menu: {
    marginTop: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingVertical: 4,
  },
  menuItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
  },
});
