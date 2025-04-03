import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../theme/globalStyles';
import { theme } from '../theme/theme';
import { Icon } from '../components/Icon';
import { GrdTextInput } from '../components/inputs/GrdTextInput';

export const HomeScreen = () => {

  let loginForm = {
    email: '',
    password: ''
  }

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.header} />
      <View style={[globalStyles.centerContainer, styles.centerContainer]}>
        <View style={styles.displayContainer}>
          <Icon 
            name="guardianOwl" 
            size={148} 
            color={theme.colors.grdOrangeMedium}
            style={styles.icon} 
          />
          <Text style={[globalStyles.title, styles.title]}>Guardiã</Text>
          <Text style={[globalStyles.text, styles.text]}>SEMPRE QUE VOCÊ PRECISAR</Text>
        </View>
        
        <View style={styles.formContainer}>
          <GrdTextInput
            label="E-mail"
            placeholder="example@gmail.com"
            value={loginForm.email}
          />
          <GrdTextInput
            label="Senha"
            placeholder="Senha"
            value={loginForm.password}
          />
      </View>
      </View>         
    </View>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    gap: 18,
  },
  centerContainer: {
    backgroundColor: theme.colors.grdOrangeLight,
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.display,
    color: theme.colors.grdOrangeMedium,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  text: {
    // Estilos específicos que complementam o globalStyles.text
    color: theme.colors.grdOrangeMedium,
  },
  icon: {
  },
  header: {
    width: '100%',
    height: 24,
    backgroundColor: theme.colors.grdOrangeMedium,
  }
});