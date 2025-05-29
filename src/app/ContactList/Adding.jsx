import React, { useState } from 'react';
import { View,TouchableOpacity, Text, StyleSheet, Dimensions, Alert, ScrollView } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { GrdTextInput } from '@/components/inputs/GrdTextInput';
import { GrdOutlinedButton } from '@/components/buttons/GrdOutlinedButton';
import { GrdSolidButton } from '@/components/buttons/GrdSolidButton';
import { useRouter } from 'expo-router';
import { Navbar } from '@/components/Navbar';

const { width } = Dimensions.get('window');

export default function Page() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [relation, setRelation] = useState('');

  const handleSave = () => {
    if (!name || !phone) {
      Alert.alert('Erro', 'Nome e telefone são obrigatórios.');
      return;
    }

    // Aqui você pode integrar com seu sistema de persistência
    Alert.alert('Sucesso', 'Contato salvo com sucesso!');
    router.back(); // Volta para a tela anterior após salvar
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Icon name="user-plus" color="white" size={30} />
            <Text style={styles.title}>Adicionar Contato</Text>
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
            value={phone}
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
         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Contato</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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