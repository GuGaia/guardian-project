import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { Navbar } from '@/components/Navbar';

const { width, height } = Dimensions.get('window');

export default function Page() {
  const router = useRouter();
  const [Notifications, setNotifications] = useState(false);
  const [Callings, setCallings] = useState(false);
  const [BlockButtons, setBlockButtons] = useState(false);
  const [BlockPreVisualizationOfMensages, setBlockPreVisualizationOfMensages] = useState(false);


  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.dividerLine} />
      </View>
      {children}
    </View>
  );

  const renderBlueButton = (text: string, onPress: () => void) => (
    <TouchableOpacity onPress={onPress} style={styles.outlinedButton}>
      <Text style={styles.outlinedButtonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>

      <View style={styles.titleCard}>
        <View style={styles.titleRow}>
          <Icon name="settings" size={45} />
          <Text style={styles.title}>Configurações</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderSection("Configuração do botão", 
          renderBlueButton("Parear e configurar o botão físico", () => {})
        )}
        {renderSection("Resposta automática", 
          renderBlueButton("Personalizar mensagem automática", () => {})
        )}
        {renderSection("Modo discreto", 
          <>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Desativar notificações</Text>
              <Switch
                value={Notifications}
                onValueChange={setNotifications}
                thumbColor={Notifications ? "#FFFFFF" : theme.colors.grdGray}
                trackColor={{ false: "#AAC9FF", true: theme.colors.grdBlue }}
              />
            </View>

             <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Desativar alerta de chamadas</Text>
              <Switch
                value={Callings}
                onValueChange={setCallings}
                thumbColor={Callings ? "#FFFFFF" : theme.colors.grdGray}
                trackColor={{ false: "#AAC9FF", true: theme.colors.grdBlue }}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Bloqueio do botão de ligar/desligar</Text>
              <Switch
                value={BlockButtons}
                onValueChange={setBlockButtons}
                thumbColor={BlockButtons ? "#FFFFFF" : theme.colors.grdGray}
                trackColor={{ false: "#AAC9FF", true: theme.colors.grdBlue }}
              />
            </View>

             <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Desabilitar mensagens na tela de bloqueio</Text>
              <Switch
                value={BlockPreVisualizationOfMensages}
                onValueChange={setBlockPreVisualizationOfMensages}
                thumbColor={BlockPreVisualizationOfMensages ? "#FFFFFF" : theme.colors.grdGray}
                trackColor={{ false: "#AAC9FF", true: theme.colors.grdBlue }}
              />
            </View>
          
          
          </>
        )}
      </ScrollView>

      
      <Navbar/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: theme.colors.grdBlueLight,
},
    header: {
        backgroundColor: theme.colors.grdBlueLight,
        height: height * 0.03,
    },
    titleCard: {
        backgroundColor: theme.colors.grdBlue,
         height: height * 0.15,
        alignItems: 'center',
        justifyContent:'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:  ((width * height)/ 1000) * 0.08,
  },
  scrollView: {
    padding:  width * 0.07,
  },
  section: {
    marginBottom: height * 0.05,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  sectionTitle: {
    fontSize:  ((width * height)/ 1000) * 0.057,
    fontWeight: 'bold',
    color: theme.colors.grdGray,
    paddingRight: width * 0.02,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.grdGray ,
    marginLeft: 8,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: theme.colors.grdGray,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  outlinedButtonText: {
    color: theme.colors.grdGray,
    fontSize:  ((width * height)/ 1000) * 0.05,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    
    color: theme.colors.grdGray,
    
  },
  switchLabel: {
    flex:1,
    fontSize: ((width * height)/ 1000) * 0.05,
    color: theme.colors.grdGray,
    marginRight: width * 0.1,
    flexShrink: 1,
  },
});
