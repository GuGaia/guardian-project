import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Dimensions,
} from "react-native";
import { theme } from "@/theme/theme";
import { Icon } from "@/components/Icon";
import { useRouter } from "expo-router";
import { Navbar } from "@/components/Navbar";

const { width, height } = Dimensions.get("window");

export default function SettingsPage() {
  const router = useRouter();
  const [Notifications, setNotifications] = useState(false);
  const [Callings, setCallings] = useState(false);
  const [BlockButtons, setBlockButtons] = useState(false);
  const [BlockPreVisualizationOfMensages, setBlockPreVisualizationOfMensages] =
    useState(false);

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.dividerLine} />
      {children}
    </View>
  );

  const renderBlueButton = (
    text: string,
    onPress: () => void,
    iconName?: string
  ) => (
    <TouchableOpacity onPress={onPress} style={styles.blueButton}>
      {iconName && <Icon name={iconName} size={18} color="#FFF" />}
      <Text style={styles.blueButtonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header} />

      <View style={styles.titleCard}>
        <View style={styles.titleRow}>
          <Icon name="settings" size={42} color="white" />
          <Text style={styles.title}>Configurações</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderSection(
          "Botão físico",
          renderBlueButton(
            "Parear e configurar",
            () => {
              router.push('/BluetoothConnect')
            },
            "bluetooth"
          )
        )}

        {renderSection(
          "Resposta automática",
          renderBlueButton(
            "Editar mensagem automática",
            () => {},
            "message-circle"
          )
        )}

        {renderSection("Modo discreto", (
          <>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Desativar notificações</Text>
              <Switch
                value={Notifications}
                onValueChange={setNotifications}
                thumbColor={Notifications ? "#fff" : theme.colors.grdGray}
                trackColor={{ false: "#AAC9FF", true: theme.colors.grdBlue }}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Desativar alerta de chamadas</Text>
              <Switch
                value={Callings}
                onValueChange={setCallings}
                thumbColor={Callings ? "#fff" : theme.colors.grdGray}
                trackColor={{ false: "#AAC9FF", true: theme.colors.grdBlue }}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Bloquear botão de energia</Text>
              <Switch
                value={BlockButtons}
                onValueChange={setBlockButtons}
                thumbColor={BlockButtons ? "#fff" : theme.colors.grdGray}
                trackColor={{ false: "#AAC9FF", true: theme.colors.grdBlue }}
              />
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Ocultar mensagens na tela bloqueada</Text>
              <Switch
                value={BlockPreVisualizationOfMensages}
                onValueChange={setBlockPreVisualizationOfMensages}
                thumbColor={BlockPreVisualizationOfMensages ? "#fff" : theme.colors.grdGray}
                trackColor={{ false: "#AAC9FF", true: theme.colors.grdBlue }}
              />
            </View>
          </>
        ))}
      </ScrollView>

      <Navbar />
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
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: ((width * height) / 1000) * 0.08,
    paddingLeft: 12,
  },
  scrollView: {
    paddingHorizontal: 16,
    padding: 20,
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.grdBlue,
    marginBottom: 6,
  },
  dividerLine: {
    height: 2,
    backgroundColor: "#DCE5F7",
    marginBottom: 12,
  },
  blueButton: {
    backgroundColor: theme.colors.grdBlue,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  blueButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  switchLabel: {
    flex: 1,
    fontSize: 16,
    color: "#444",
    marginRight: 12,
    flexWrap: "wrap",
  },
});
