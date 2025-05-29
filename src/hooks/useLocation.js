import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        console.log('Solicitando permissão de localização...');
        let { status } = await Location.requestForegroundPermissionsAsync();

        console.log('Status da permissão:', status);

        if (status !== 'granted') {
          const errMsg = 'Permissão para acessar localização foi negada.';
          console.log(errMsg);
          setError(errMsg);
          return;
        }

        console.log('Obtendo coordenadas...');
        let location = await Location.getCurrentPositionAsync({});
        console.log('Coordenadas obtidas:', location);

        const { latitude, longitude } = location.coords;

        console.log('Fazendo reverse geocode...');
        const address = await Location.reverseGeocodeAsync({ latitude, longitude });
        console.log('Endereço:', address);

        setLocation({
          latitude,
          longitude,
          address: `${address[0]?.street || ''} ${address[0]?.name || ''} - ${address[0]?.city || ''}`,
        });

      } catch (err) {
        console.error(' Erro ao obter localização:', err);
        setError(err.message || 'Erro desconhecido ao obter localização.');
      }
    })();
  }, []);

  return { location, error };
}
