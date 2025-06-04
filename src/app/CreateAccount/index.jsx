import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Keyboard, 
  Platform, 
  Image, 
  Alert,
  ScrollView
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
import { useAuth } from '@/hooks/Auth';

export default function CreateAccount() {
  const { register } = useAuth();
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    number: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !registerForm.name ||
      !registerForm.email ||
      !registerForm.password ||
      !registerForm.confirmPassword ||
      !registerForm.number
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        number: registerForm.number,
      });
      
      // Redirecionar para o menu após o registro bem-sucedido
      router.replace('/(LoggedIn)/HowThisWorks');

    } catch (error) {
      Alert.alert(
        'Erro no cadastro',
        error.message || 'Não foi possível realizar o cadastro.'
      );
    } finally {
      setIsLoading(false);
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
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
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
                  label="Número de telefone"
                  inputMode="tel"
                  onChangeText={(value) => {
                    setRegisterForm({ ...registerForm, number: value });
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
                  label={isLoading ? "Cadastrando..." : "Cadastrar"}
                  onPress={handleRegister}
                  textStyle={styles.registerButtonText}
                  size="large"
                  disabled={isLoading}
                />
                <View style={styles.separatorContainer}>
                  <View style={styles.separatorLine} />
                  <Text style={styles.separatorText}>ou</Text>
                  <View style={styles.separatorLine} />
                </View>
                <GrdOutlinedButton
                  label="Já tenho conta"
                  onPress={() => router.replace('/Login')}
                  textStyle={styles.loginButtonText}
                  size="small"
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
});
