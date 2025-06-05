import { useAuth } from "@/hooks/Auth";
import { useEffect, useState } from "react";
import { Stack, useSegments, router } from "expo-router";
import { AppProvider } from "@/hooks";
import { Platform } from "react-native";

const unauthenticatedRoutes = ['Login', '', 'SignUp'];

const StackLayout = () => {
    const segments = useSegments();
    const { user } = useAuth();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Garante que o layout está montado antes de qualquer navegação
        setIsReady(true);
    }, []);

    useEffect(() => {
        if (!isReady) return;

        const inAuthGroup = segments[0] === '(LoggedIn)';

        if (inAuthGroup && !user?.authenticated) {
            console.log("Redirecionando para login - usuário não autenticado");
            router.replace('/Login');
        } else if (user?.authenticated && (unauthenticatedRoutes.includes(segments[0]) || !segments[0])) {
            console.log("Redirecionando para menu principal - usuário autenticado");
            router.replace('/(LoggedIn)/MainMenu');
        }
    }, [user, segments, isReady]);
    
    return (
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login/index" />
            <Stack.Screen name="(LoggedIn)" />
        </Stack>
    )
}

export default function RootLayout() {
    return (
        <AppProvider>
            <StackLayout />
        </AppProvider>
    );
}