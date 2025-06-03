import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from '@/components/Icon';
import { theme } from '@/theme/theme';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Header({ username, userData }) {
  const displayName = username?.trim() ? username : 'Adamastor';

  const handleProfilePress = () => {
    console.log('Dados sendo passados para Profile:', userData);
    router.push({
      pathname: '/Profile',
      params: { userData: JSON.stringify(userData) }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo, {displayName}</Text>
      <TouchableOpacity onPress={handleProfilePress}>
        <Icon name="user" size={((width * height) / 1000) * 0.14} style={styles.profileIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height*0.1,
    paddingHorizontal: width * 0.05,
    paddingTop: height*0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: 0,
    zIndex: 10,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.grdGray,
  },
  profileIcon: {
    tintColor: '#FFFFFF',
  },
});
