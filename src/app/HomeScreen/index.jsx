import React from 'react';
import { View, Text, StyleSheet, Image, Keyboard, Platform } from 'react-native';
import { View, Text, StyleSheet, Image, Keyboard, Platform } from 'react-native';
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
    <View 
      style={[globalStyles.container, styles.container]}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => {
        if (Platform.OS === 'web') {
          const activeElement = document.activeElement;
          if (activeElement && activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            Keyboard.dismiss();
          }
        } else {
          Keyboard.dismiss();
        }
      }}
    >
    <View 
      style={[globalStyles.container, styles.container]}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => {
        if (Platform.OS === 'web') {
          const activeElement = document.activeElement;
          if (activeElement && activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            Keyboard.dismiss();
          }
        } else {
          Keyboard.dismiss();
        }
      }}
    >
      <View style={styles.header} />
      <View style={[globalStyles.centerContainer, styles.centerContainer]}>
        <View style={styles.displayContainer}>
          <Icon 
            name="guardianOwl" 
            size={111} 
            size={111} 
          />
          <Text style={[globalStyles.title, styles.title]}>Guardiã</Text>
          <Image
            source={require('@assets/images/alluraBackInTown.png')}
            style={{ width: 300, height: 190 }}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <GrdTextInput
              label="E-mail"
              inputMode="email"
              onChangeText={(value) => {loginForm.email = value}}
            />
            <GrdTextInput
              label="Senha"
              onChangeText={(value) => {loginForm.password = value}}
              secureTextEntry
            />
          </View>
          <View style={styles.buttonContainer}>
            <GrdSolidButton
              label="Entrar"
              onPress={() => router.push('/MainMenu')}
              textStyle={styles.loginButtonText}
              size="large"
              size="large"
            />
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>ou</Text>
              <View style={styles.separatorLine} />
            </View>
            <View style={styles.registerButtonContainer}>
              <GrdOutlinedButton
                label="Cadastrar"
                onPress={() => console.log('Tentativa de cadastro com: ', loginForm)}
                textStyle={styles.registerButtonText}
                size="small"
              />
            </View>
            
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>ou</Text>
              <View style={styles.separatorLine} />
            </View>
            <View style={styles.registerButtonContainer}>
              <GrdOutlinedButton
                label="Cadastrar"
                onPress={() => console.log('Tentativa de cadastro com: ', loginForm)}
                textStyle={styles.registerButtonText}
                size="small"
              />
            </View>
            
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
  container: {

    colour: theme.colors.grdBlueLight,

  },
  registerButtonContainer: {
    paddingHorizontal: 58,
  },
  registerButtonText: {
    color: theme.colors.grdBlue,
    fontFamily: theme.fonts.interBold,
    fontSize: theme.fontSizes.body,
  },
  displayContainer: {
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
    gap: 28,
    paddingVertical: 18,
    paddingHorizontal: 38,
    gap: 28,
    paddingVertical: 18,
    paddingHorizontal: 38,
  },
  centerContainer: {
    backgroundColor: theme.colors.grdOrangeLight,
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSizes.h3,
    fontSize: theme.fontSizes.h3,
    color: theme.colors.grdBlue,
    textAlign: 'center',
  },
  header: {
    width: '100%',
    height: 24,
    backgroundColor: theme.colors.grdBlue,
  },
  loginButtonText: {
    color: theme.colors.grdWhite00,
    fontFamily: theme.fonts.interBold,
    fontSize: theme.fontSizes.body,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.grdBlue,
  },
  separatorText: {
    marginHorizontal: 10,
    color: theme.colors.grdBlue,
    fontFamily: theme.fonts.interBold,
    fontFamily: theme.fonts.interBold,
    fontSize: theme.fontSizes.body,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.grdBlue,
  },
  separatorText: {
    marginHorizontal: 10,
    color: theme.colors.grdBlue,
    fontFamily: theme.fonts.interBold,
    fontSize: theme.fontSizes.body,
  },
  },]
});