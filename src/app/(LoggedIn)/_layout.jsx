import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { usePathname } from 'expo-router';

export default function ProtectedLayout() {
  const pathname = usePathname();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Se estiver na tela de emergência, bloqueia o botão voltar
      if (pathname === '/EmergencyButton') {
        return true; // true significa que o evento foi tratado e o comportamento padrão será bloqueado
      }
      return false; // false permite o comportamento padrão do botão voltar
    });

    return () => backHandler.remove();
  }, [pathname]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="MainMenu/index"
      />
      <Stack.Screen 
        name="ContactList/index"
      />
      <Stack.Screen 
        name="EmergencyButton/index"
      />
      <Stack.Screen 
        name="Settings/index"
      />
    </Stack>
  );
}


