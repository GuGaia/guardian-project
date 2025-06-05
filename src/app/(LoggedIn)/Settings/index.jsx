import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Dimensions,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { theme } from "@/theme/theme";
import { Icon } from "@/components/Icon";
import { useRouter } from "expo-router";
import { Navbar } from "@/components/Navbar";
import { useAuth } from '@/hooks/Auth';
import { updateAutoMessage } from '@/services/settingsService';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

const AutoMessageModal = ({ visible, onClose, currentMessage, onUpdate }) => {
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset newMessage when modal opens
  useEffect(() => {
    if (visible) {
      setNewMessage('');
    }
  }, [visible]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await onUpdate(newMessage);
      onClose();
    } catch (error) {
      console.error('Error updating message:', error);
      // Aqui você pode adicionar um tratamento de erro mais específico
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Mensagem Automática</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Mensagem atual:</Text>
          <Text style={styles.currentMessage}>{currentMessage}</Text>

          <Text style={styles.label}>Nova mensagem:</Text>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            numberOfLines={4}
            placeholder="Digite sua nova mensagem automática"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleUpdate}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const renderSection = (title, children) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
    </View>
);

const renderBlueButton = (text, onPress) => (
    <TouchableOpacity style={styles.blueButton} onPress={onPress}>
        <Text style={styles.blueButtonText}>{text}</Text>
    </TouchableOpacity>
);

export default function SettingsPage() {
  const { user } = useAuth();
  const [Notifications, setNotifications] = useState(false);
  const [Callings, setCallings] = useState(false);
  const [BlockButtons, setBlockButtons] = useState(false);
  const [BlockPreVisualizationOfMensages, setBlockPreVisualizationOfMensages] =
    useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleUpdateMessage = async (newMessage) => {
    try {
      await updateAutoMessage(user.user.id, newMessage);
      // Atualizar o estado do usuário com a nova mensagem
      user.user.default_message = newMessage;
    } catch (error) {
      throw error;
    }
  };

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
            () => setModalVisible(true)
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
              <Text style={styles.switchLabel}>Escurecer tela</Text>
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

      <AutoMessageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        currentMessage={user.user.default_message}
        onUpdate={handleUpdateMessage}
      />

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
    gap: 24,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  currentMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: theme.colors.grdBlue,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
