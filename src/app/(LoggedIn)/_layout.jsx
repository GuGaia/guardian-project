import { Tabs, Stack } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { usePathname } from 'expo-router';
import { Icon } from '@/components/Icon';
import { theme } from '@/theme/theme';

export default function ProtectedLayout() {
  const pathname = usePathname();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Se estiver na tela de emergência, bloqueia o botão voltar
      if (pathname === '/EmergencyMode') {
        return true; // true significa que o evento foi tratado e o comportamento padrão será bloqueado
      }
      return false; // false permite o comportamento padrão do botão voltar
    });

    return () => backHandler.remove();
  }, [pathname]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none', // Esconde a tab bar padrão pois estamos usando nossa Navbar customizada
        },
      }}
    >
      <Tabs.Screen 
        name="MainMenu/index"
        options={{
          href: '/MainMenu',
        }}
      />
      <Tabs.Screen 
        name="ContactList/index"
        options={{
          href: '/ContactList',
        }}
      />
      <Tabs.Screen 
        name="Settings/index"
        options={{
          href: '/Settings',
        }}
      />
      <Tabs.Screen 
        name="EmergencyMode/index"
        options={{
          href: null, // Desabilita a navegação por tab para esta tela
        }}
      />
      <Tabs.Screen 
        name="Tutorials/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="HowThisWorks/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Orientations/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="Profile/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}