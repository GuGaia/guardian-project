import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GrdSolidButton } from '@/components/buttons/GrdSolidButton';
import { useRouter } from 'expo-router';
import { theme } from '@/theme/theme';
import { Navbar } from '@/components/Navbar';

const { width, height } = Dimensions.get('window');


export default function EmergencyContactGuide() {
  const router = useRouter();

  const steps = [
{
      title: '1. O Guardiã é um canal de apoio',
      description:
        'O app é uma ponte. O preparo emocional e logístico dos seus contatos é o que transforma um alerta em socorro real.'
    },
      {
      title: '2. Converse com seus contatos com antecedência',
      description:
        'Explique que você os cadastrou como contatos de emergência no Guardiã. Diga o porquê e o que isso significa. Exemplo: "Se eu apertar o botão de emergência, você vai receber uma mensagem com minha localização. É importante que você saiba o que fazer nesse momento."'
    },

    {
      title: '3. Defina um protocolo de segurança',
      description:
        'Combine como cada contato deve reagir. Por exemplo: (1) Me ligue imediatamente, (2) Vá ao meu encontro sem ligar, (3) Avise a polícia com minha localização. Escolha o que faz você se sentir mais seguro.'
    },
    {
      title: '4. Reforce a importância da agilidade e discrição',
      description:
        'Explique que a resposta deve ser rápida e discreta. Um som alto ou uma exposição indevida pode piorar a situação.'
    },
    {
      title: '5. Revise os protocolos periodicamente',
      description:
        'As coisas mudam. Converse novamente com seus contatos a cada poucos meses para garantir que tudo ainda faz sentido.'
    },
    
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Guia: Como orientar seus contatos</Text>

        {steps.map((step, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        ))}


      </ScrollView>
      
       <Navbar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: theme.colors.grdBlueLight,
},
  content: {
    padding: width * 0.06,
    paddingBottom: height * 0.1
  },
  header: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: theme.colors.grdBlue,
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: width * 0.05,
    marginBottom: height * 0.02,
    elevation: 3
  },
  stepTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: theme.colors.grdBlue,
    marginBottom: 8
  },
  stepDescription: {
    fontSize: width * 0.04,
    color: '#333'
  },
  button: {
    marginTop: 20
  }
});
  