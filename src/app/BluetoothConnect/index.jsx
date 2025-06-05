import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { NativeModules } from 'react-native';

export default function StorageScreen() {
  const [mac, setMac] = useState('')
  const [token, setToken] = useState('')
  const [savedMac, setSavedMac] = useState(null)
  const [savedToken, setSavedToken] = useState(null)

  const { Storage } = NativeModules;

  // Função para salvar mac e token
  const saveData = async () => {
    try {
      await Storage.saveMac(mac)
      alert('Dados salvos com sucesso!')
      loadData()
    } catch (e) {
      alert('Erro ao salvar dados')
    }
  }

  // Função para carregar mac e token salvos
  const loadData = async () => {
    try {
      const storedMac = await Storage.getMac()
      setSavedMac(storedMac)
    } catch (e) {
      alert('Erro ao carregar dados')
    }
  }

  // Carrega os dados ao montar o componente
  useEffect(() => {
    loadData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.label}>MAC Address:</Text>
      <TextInput
        style={styles.input}
        value={mac}
        onChangeText={setMac}
        placeholder="Digite o MAC"
        autoCapitalize="none"
      />

      <Button title="Salvar" onPress={saveData} />

      <View style={{ marginTop: 30 }}>
        <Text style={styles.label}>MAC salvo:</Text>
        <Text>{savedMac || '-'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginTop: 5,
    borderRadius: 4,
  },
})
