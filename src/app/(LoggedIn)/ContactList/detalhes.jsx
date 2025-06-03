import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Navbar } from '@/components/Navbar';
import { contactService } from '@/services/contactService';

const { width, height } = Dimensions.get('window');

export default function ContactDetails() {
  const router = useRouter();
  const { contactData, userData } = useLocalSearchParams();
  const contact = JSON.parse(contactData);
  const parsedUserData = JSON.parse(userData);

  const handleDelete = async () => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja excluir o contato "${contact.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await contactService.deleteContact(parsedUserData.id, contact.id);
              Alert.alert('Sucesso', 'Contato excluído com sucesso!');
              router.back();
            } catch (error) {
              console.error("Erro ao excluir contato:", error);
              Alert.alert('Erro', 'Não foi possível excluir o contato.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = () => {
    router.push({
      pathname: '/ContactList/Adding',
      params: { 
        contactData,
        userData,
        isEditing: 'true'
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleCard}>
        <View style={styles.titleRow}>
          <View style={{ marginLeft: ((width * height)/ 1000) * 0.05 }}>
            <Text style={styles.title}>Detalhes do contato</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.name}>{contact.name}</Text>
          <Text style={styles.relation}>{contact.relationship}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>

          <View style={styles.infoRow}>
            <Icon name="phone" size={26} color="#3573FA" />
            <Text style={styles.infoText}>{contact.phone}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoRow}>
            <Icon name="mail" size={26} color="#3573FA" />
            <Text style={styles.infoText}>{contact.email || 'Não informado'}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
          <Text style={styles.saveButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.DeleteButton} onPress={handleDelete}>
          <Text style={styles.saveButtonText}>Excluir</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity onPress={() => router.back()} style={styles.Button}>
        <Icon name="arrow-left" size={28} color="#3573FA" />
      </TouchableOpacity>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.grdBlueLight,
  },
  header: {
    backgroundColor: theme.colors.grdBlueLight,
    height: height * 0.03,
  },
  titleCard: {
    backgroundColor: theme.colors.grdBlue,
    height: height * 0.06,
    alignItems: 'center',
    justifyContent:'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: ((width * height)/ 1000) * 0.05,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3573FA',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  relation: {
    fontSize: 18,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  infoText: {
    marginLeft: 16,
    fontSize: 18,
    color: '#333',
  },
  separator: {
    backgroundColor: '#eee',
  },
  saveButton: {
    backgroundColor: theme.colors.grdBlue,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  DeleteButton: {
    backgroundColor: theme.colors.grdRed,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
