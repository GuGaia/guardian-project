import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { GrdTextInput } from '@/components/inputs/GrdTextInput';
import { GrdOutlinedButton } from '@/components/buttons/GrdOutlinedButton';
import { GrdSolidButton } from '@/components/buttons/GrdSolidButton';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Navbar } from '@/components/Navbar';
import { contactService } from '@/services/contactService';
import { Checkbox } from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function Page() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const parsedUserData = JSON.parse(params.userData || '{}');
  const parsedContactData = params.contactData ? JSON.parse(params.contactData) : null;
  const mode = params.mode;

  // Initialize states
  const [name, setName] = useState('');
  const [phone_number, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');
  const [selectedChannels, setSelectedChannels] = useState([1]);

  // Update states when params change
  useEffect(() => {
    if (mode === 'edit' && parsedContactData) {
      setName(parsedContactData.name || '');
      setPhone(parsedContactData.phone_number || '');
      setEmail(parsedContactData.email || '');
      setRelation(parsedContactData.relationship || '');
      setSelectedChannels(
        parsedContactData.channels
          ? parsedContactData.channels.map(channel => channel.id)
          : [1]
      );
    } else {
      // Reset states for create mode
      setName('');
      setPhone('');
      setEmail('');
      setRelation('');
      setSelectedChannels([1]);
    }
  }, [params.contactData, mode]);

  const handleChannelToggle = (channelId) => {
    setSelectedChannels(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      } else {
        return [...prev, channelId];
      }
    });
  };

  const handleSave = async () => {
    try {
      if (!name || !phone_number || !relation) {
        Alert.alert('Erro', 'Nome, telefone e relacionamento são obrigatórios.');
        return;
      }

      if (selectedChannels.length === 0) {
        Alert.alert('Erro', 'Selecione pelo menos um canal de comunicação.');
        return;
      }

      const contactData = {
        name,
        phone_number,
        email: email || null,
        relationship: relation,
        channel_ids: selectedChannels
      };

      if (mode === 'edit') {
        await contactService.updateContact(parsedUserData.id, parsedContactData.id, contactData);
      } else {
        await contactService.addContact(parsedUserData.id, contactData);
      }
      
      Alert.alert('Sucesso', 'Contato salvo com sucesso!');
      router.replace({
        pathname: '/ContactList',
        params: {
          userData: JSON.stringify(parsedUserData),
          shouldRefresh: 'true'
        }
      });
    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      if (error.response) {
        console.error('Resposta do servidor:', error.response.data);
      }
      Alert.alert('Erro', 'Não foi possível salvar o contato. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            {/* <Icon name="user-plus" color="white" size={30} /> */}
            <Text style={styles.title}>{mode === 'edit' ? 'Editar Contato' : 'Adicionar Contato'}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <GrdTextInput
            label="Nome completo"
            placeholder="Digite o nome"
            value={name}
            onChangeText={setName}
          />
          <GrdTextInput
            label="Telefone"
            placeholder="(99) 99999-9999"
            keyboardType="phone-pad"
            value={phone_number}
            onChangeText={setPhone}
          />
          <GrdTextInput
            label="E-mail (opcional)"
            placeholder="exemplo@email.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <GrdTextInput
            label="Relacionamento"
            placeholder="Ex: Mãe, Amigo, Médico"
            value={relation}
            onChangeText={setRelation}
          />
          <Text style={[globalStyles.label, styles.label]}>Canais de comunicação</Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxItem}>
              <Checkbox
                status={selectedChannels.includes(1) ? 'checked' : 'unchecked'}
                onPress={() => handleChannelToggle(1)}
                color={theme.colors.grdBlue}
              />
              <Text style={[globalStyles.text, styles.checkboxText]}>SMS</Text>
            </View>
            <View style={styles.checkboxItem}>
              <Checkbox
                status={selectedChannels.includes(2) ? 'checked' : 'unchecked'}
                onPress={() => handleChannelToggle(2)}
                color={theme.colors.grdBlue}
              />
              <Text style={[globalStyles.text, styles.checkboxText]}>E-mail</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Contato</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: theme.colors.grdBlue,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  checkboxText: {
    color: theme.colors.grdBlue,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.grdBlueLight,
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: theme.colors.grdBlue,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  saveButton: {
    backgroundColor: theme.colors.grdBlue,
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