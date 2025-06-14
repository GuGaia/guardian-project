import React from 'react';
import { View, Text, StyleSheet, Image, Keyboard, Platform } from 'react-native';
import { globalStyles } from '@/theme/globalStyles';
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { GrdTextInput } from '@/components/inputs/GrdTextInput';
import { GrdOutlinedButton } from '@/components/buttons/GrdOutlinedButton';
import { GrdSolidButton } from '@/components/buttons/GrdSolidButton';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/hooks/Auth';

export default function Page() {

  const { signIn } = useAuth();

  let loginForm = {
    email: '',
    password: ''
  }

  const handleLogin = async () => {
    try {
      await signIn({ loginForm });
      router.replace('/(LoggedIn)/MainMenu');
      console.log('Login successful');
      //router.replace('/HowThisWorks');
    } catch (error) {
      console.error('Login failed:', error);
    }
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
      
      <LinearGradient
      colors={['#FFFFFF', '#D0ECEF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <View style={styles.header} />
      <View style={[globalStyles.centerContainer, styles.centerContainer]}>
        <View style={styles.displayContainer}>
          <Icon 
            name="guardianOwl" 
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
              onPress={handleLogin}
              textStyle={styles.loginButtonText}
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
                onPress={() => router.push('/CreateAccount')}
                textStyle={styles.registerButtonText}
                size="small"
              />
            </View>
            
          </View>
        </View>
      </View>         
      
    </LinearGradient>

    </View>
    
  );
};

const styles = StyleSheet.create({


  buttonContainer: {
    flexDirection: 'column',
    gap: 24 ,
  },
    background: {
      
      flex: 1,

  },
  
  container: {
   flex:1,
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
  },
  centerContainer: {
    backgroundColor: theme.colors.grdOrangeLight,
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  title: {
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
    fontSize: theme.fontSizes.body,
  },
});
