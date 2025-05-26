import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { theme } from '@/theme/theme';
import { Icon } from '@/components/Icon';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Page() {
  const router = useRouter();
  const [modoDiscreto, setModoDiscreto] = useState(false);
  const [ligacoes, setligacoes] = useState(false);

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
                value={modoDiscreto}
                onValueChange={setModoDiscreto}
                thumbColor={modoDiscreto ? "#FFFFFF" : "#3573FA"}
                trackColor={{ false: "#AAC9FF", true: "#3573FA" }}
              />
            </View>

             <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Desativar alerta de chamadas</Text>
              <Switch
                value={ligacoes}
                onValueChange={setligacoes}
                thumbColor={ligacoes ? "#FFFFFF" : "#3573FA"}
                trackColor={{ false: "#AAC9FF", true: "#3573FA" }}
              />
            </View>
          
          </>
        )}
      </ScrollView>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarContent} onPress={() => router.push('/MainMenu')}>
          <Icon name="Home" size={30} style={styles.navbarIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9E7FF',
  },
  header: {
    backgroundColor: theme.colors.grdBlueLight,
    paddingTop: width * 0.04,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  backText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  titleCard: {
    backgroundColor: '#3573FA',
    paddingVertical: 24,
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  scrollView: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3573FA',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#3573FA',
    marginLeft: 8,
  },
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#3573FA',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  outlinedButtonText: {
    color: '#3573FA',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#3573FA',
    fontWeight: 'bold',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: theme.colors.grdBlue,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
    elevation: 10,
  },
  navbarContent: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.grdBlueLight,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  navbarIcon: {
    tintColor: "#FFFFFF",
  },
});
