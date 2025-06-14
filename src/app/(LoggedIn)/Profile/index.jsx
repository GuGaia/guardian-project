import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { Navbar } from '@/components/Navbar';
import { useAuth, user } from '@/hooks/Auth';
import { Platform } from 'react-native';
import { homeService } from '@/services/homeService';

const { width } = Dimensions.get('window');

export default function ProfilePage() {
  const router = useRouter();
  const { signOut, user } = useAuth();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.authenticated && user?.user?.id) {
        try {
          const data = await homeService.getUserData(user.user.id);
          setUserData(data);
          setIsLoading(false);
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user?.authenticated, user?.user?.id]);

  const userInfo = {
    name: userData?.name || 'Adamastor Pereira',
    email: userData?.email || 'adamastor.pereira@email.com',
    phone: userData?.number || 'Não informado',
    city: userData?.city || 'Não informado',
    avatar: null,
  };

  const confirmLogout = () => {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => signOut() },
    ]);
  };

  const handleLogout = async () => {
    Platform.OS === 'web' ? await signOut() : confirmLogout();
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          {userInfo.avatar ? (
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="user" size={40} color="#3573FA" />
            </View>
          )}
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>Telefone</Text>
          <Text style={styles.infoValue}>{userInfo.phone}</Text>

          <View style={styles.divider} />

          <Text style={styles.infoLabel}>Cidade</Text>
          <Text style={styles.infoValue}>{userInfo.city}</Text>
        </View>

        <View style={styles.actions}>
          {/* <TouchableOpacity style={styles.editButton}>
            <Icon name="settings" size={20} color="#3573FA" />
            <Text style={[styles.buttonText, { color: theme.colors.grdBlue }]}>Editar Perfil</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="arrowLeft" size={20} color="#FFF" />
            <Text style={[styles.buttonText, { color: '#FFF' }]}>Sair</Text>
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
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e6f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 24,
  },
  infoLabel: {
    fontSize: 14,
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  actions: {
    gap: 16,
  },
  editButton: {
    backgroundColor: '#e6f0ff',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: theme.colors.grdBlue,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
