import { useState } from 'react';
import { Vibration, Alert } from 'react-native';
import axios from 'axios';
import { useLocation } from './useLocation';

export function useSos() {
  const { location, error: locationError } = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerSos = async () => {
    setLoading(true);
    setError(null);

    try {
      Vibration.vibrate([0, 500,200, 500,500, 500], false);

      if (!location) {
        setError('Localização não disponível.');
        Alert.alert('Erro', 'Localização não disponível.');
        setLoading(false);
        return;
      }

      const response = await axios.post('/api/communications/alert/send/', {
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address,
        timestamp: new Date().toISOString(),
      });

      if (response.status === 200) {
        console.log('Alerta enviado com sucesso');
      } else {
        throw new Error('Erro no envio do alerta');
      }
    } catch (err) {
      console.error('Erro no SOS:', err);
      setError('Falha ao enviar alerta.');
      Alert.alert('Erro', 'Falha ao enviar alerta.');
    } finally {
      setLoading(false);
    }
  };

  return {
    triggerSos,
    loading,
    error: error || locationError,
  };
}

