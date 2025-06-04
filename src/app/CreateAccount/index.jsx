import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Keyboard, 
  Platform, 
  Image, 
  Alert 
} from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { GrdTextInput } from '@/components/inputs/GrdTextInput';
import { GrdOutlinedButton } from '@/components/buttons/GrdOutlinedButton';
import { GrdSolidButton } from '@/components/buttons/GrdSolidButton';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';

export default function CreateAccount() {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    if (
      !registerForm.name ||
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.confirmPassword
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    try {
      const response = await fetch('SEU_IP/api/clients/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        }),
      });

      if (response.ok) {
        Alert.alert(
          'Sucesso!',
          'Cadastro realizado com sucesso.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/(LoggedIn)/HowThisWorks'),
            },
          ],
          { cancelable: false }
        );
      } else {
        const errorData = await response.json();
        Alert.alert(
          'Erro no cadastro',
          errorData.message || 'Não foi possível realizar o cadastro.'
        );
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

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
      <LinearGradient
        colors={['#FFFFFF', '#D0ECEF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}
      >
        <View style={styles.header} />
        <View style={[globalStyles.centerContainer, styles.centerContainer]}>
          <View style={styles.displayContainer}>
            <Icon name="guardianOwl" size={88} />
            <Text style={[globalStyles.title, styles.title]}>Criar Conta</Text>
            <Image
              source={require('@assets/images/alluraBackInTown.png')}
              style={{ width: 260, height: 150 }}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <GrdTextInput
                label="Nome completo"
                onChangeText={(value) => {
                  setRegisterForm({ ...registerForm, name: value });
                }}
              />
              <GrdTextInput
                label="E-mail"
                inputMode="email"
                onChangeText={(value) => {
                  setRegisterForm({ ...registerForm, email: value });
                }}
              />
              <GrdTextInput
                label="Senha"
                onChangeText={(value) => {
                  setRegisterForm({ ...registerForm, password: value });
                }}
                secureTextEntry
              />
              <GrdTextInput
                label="Confirmar senha"
                onChangeText={(value) => {
                  setRegisterForm({ ...registerForm, confirmPassword: value });
                }}
                secureTextEntry
              />
            </View>

            <View style={styles.buttonContainer}>
              <GrdSolidButton
                label="Cadastrar"
                onPress={handleRegister}
                textStyle={styles.registerButtonText}
                size="large"
              />
              <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>ou</Text>
                <View style={styles.separatorLine} />
              </View>
              <GrdOutlinedButton
                label="Já tenho conta"
                onPress={() => router.back()}
                textStyle={styles.loginButtonText}
                size="small"
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 24,
    backgroundColor: theme.colors.grdBlue,
  },
  centerContainer: {
    backgroundColor: theme.colors.grdOrangeLight,
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  displayContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    fontSize: theme.fontSizes.h3,
    color: theme.colors.grdBlue,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 28,
    paddingVertical: 18,
    paddingHorizontal: 38,
  },
  inputContainer: {
    gap: 18,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 24,
    paddingHorizontal: 18,
  },
  registerButtonText: {
    color: theme.colors.grdWhite00,
    fontFamily: theme.fonts.interBold,
    fontSize: theme.fontSizes.body,
  },
  loginButtonText: {
    color: theme.colors.grdBlue,
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
});
