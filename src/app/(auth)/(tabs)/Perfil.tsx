import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../src/styles/perfil.styles'



interface PerfilProps {
  nome: string;
  cpf: string;
  email: string;
  cargo: string;
  onLogout?: () => void;
}

const Perfil: React.FC<PerfilProps> = ({ nome, cpf, email, cargo, onLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.profileImageContainer}>
        <View style={styles.profileImagePlaceholder}>
          <Ionicons name="person" size={40} color="#888" />
        </View>
        <Text style={styles.name}>{nome}</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.label}>Cpf</Text>
        <Text style={styles.value}>{cpf}</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.value}>{email}</Text>

        <Text style={styles.label}>Cargo</Text>
        <Text style={styles.value}>{cargo}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={30} color="#000" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Perfil;
