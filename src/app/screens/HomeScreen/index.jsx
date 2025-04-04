import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { GrdTextInput } from '@/components/inputs/GrdTextInput';
import { GrdOutlinedButton } from '@/components/buttons/GrdOutlinedButton';
import { GrdSolidButton } from '@/components/buttons/GrdSolidButton';
import { Link, router } from 'expo-router';

export default function Page() {
  let loginForm = {
    email: '',
    password: ''
  }

  const handleLogin = () => {
    console.log('Login attempt with:', loginForm);
  }

  const handleRegister = () => {
    console.log('Register attempt with:', loginForm);
  }

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.header} />
      <View style={[globalStyles.centerContainer, styles.centerContainer]}>
        <View style={styles.displayContainer}>
          <Icon 
            name="guardianOwl" 
            size={148} 
          />
          <Text style={[globalStyles.title, styles.title]}>Guardiã</Text>
          <Text style={[globalStyles.text, styles.text]}>SEMPRE QUE VOCÊ PRECISAR</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <GrdTextInput
              label="E-mail"
              placeholder="example@gmail.com"
              onChangeText={(value) => {loginForm.email = value}}
            />
            <GrdTextInput
              label="Senha"
              placeholder="••••••••••"
              onChangeText={(value) => {loginForm.password = value}}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <GrdOutlinedButton
              label="Cadastrar"
              onPress={() => console.log('Tentativa de cadastro com: ', loginForm)}
              textStyle={styles.registerButtonText}
            />
            <GrdSolidButton
              label="Entrar"
              onPress={() => router.push('/screens/ContactList')}
              textStyle={styles.loginButtonText}
            />
          </View>
        </View>
      </View>         
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'column',
    gap: 24 ,
  },
  displayContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputContainer: {
    gap: 18,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    gap: 36,
    padding: 36,
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
  header: {
    width: '100%',
    height: 24,
    backgroundColor: theme.colors.grdOrangeMedium,
  },
  loginButtonText: {
    color: theme.colors.grdWhite00,
    fontFamily: theme.fonts.interBold,
    fontSize: theme.fontSizes.body,
  }
});