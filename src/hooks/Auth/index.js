import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react';
import axios from 'axios';

const AuthContext = createContext({});

// Configuração base do axios
const api = axios.create({
    baseURL: 'http://192.168.0.103:8000/api', // Ajuste para a URL do seu backend Django
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('@auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export function AuthProvider({children}) {
    const [user, setUser] = useState({
        authenticated: false,
        user: null,
        token: null
    });
    
    const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem('@auth_token', token);
            if (Platform.OS === 'web') {
                localStorage.setItem('@auth_token', token);
            }
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    const getToken = async () => {
        try {
            if (Platform.OS === 'web') {
                return localStorage.getItem('@auth_token') || await AsyncStorage.getItem('@auth_token');
            }
            return await AsyncStorage.getItem('@auth_token');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };

    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('@auth_token');
            if (Platform.OS === 'web') {
                localStorage.removeItem('@auth_token');
            }
            console.log('Token removido com sucesso');
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };

    const signIn = async ({loginForm}) => {
        try {
            // Simulando uma chamada de API
            console.log('Tentando login com:', { loginForm });
            
            // Chamada real para a API do Django
            const response = await api.post('/login/', {
                email: loginForm.email,
                password: loginForm.password
            });

            console.log('Resposta da API:', response.data);

            if (response.data.token) {
                await saveToken(response.data.token);
                setUser({
                    authenticated: true,
                    user: response.data.user,
                    token: response.data.token
                });
                return response.data;
            } else {
                throw new Error('Token não encontrado na resposta');
            }

            return response.data;
        } catch (error) {
            console.error('Error during sign in:', error);
            if (error.response) {
                // Erro retornado pelo servidor
                throw new Error(error.response.data.detail || 'Erro ao fazer login');
            }
            throw new Error('Erro ao conectar com o servidor');
        }
    }

    const signOut = async () => {
        try {
            // Primeiro remove o token
            await removeToken();
            
            // Depois limpa o estado do usuário
            setUser({
                authenticated: false,
                user: null,
                token: null
            });
            
            console.log('Saiu com sucesso');
            return true;
        } catch (error) {
            console.error('Error during sign out:', error);
            throw error;
        }
    }

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                setUser(prev => ({
                    ...prev,
                    authenticated: true,
                    token: token
                }));
            }
        };

        checkToken();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return context;
}
