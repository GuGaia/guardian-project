import { Stack, useSegments, router } from 'expo-router';
import { AppProvider } from '@/services'
import { useAuth } from '@/services/Auth';
import { useEffect } from 'react';

const StackLayout = () => {
  const { user } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(LoggedIn)';

    if(inAuthGroup && !user?.authenticated) {
      console.log("user: ", user);
      router.replace('/Login');
    } else if(user?.authenticated) {
      console.log("user: ", user);
      router.replace('/(LoggedIn)/MainMenu');
    }
  }, [user])

  return (  
  <Stack
    screenOptions={{
        headerShown: false,
    }}
    >
      <Stack.Screen name="Login/index" />
      <Stack.Screen name="(LoggedIn)" />
    </Stack> 
  );
};

export default function RootLayout() {
  return (
    <AppProvider>
      <StackLayout />
    </AppProvider>
  );
}


