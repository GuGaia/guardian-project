import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';

// Configuração do Axios
const api = axios.create({
    // No Expo Go, precisamos usar o IP da sua máquina na rede local
    baseURL: 'http://192.168.0.103:8000/api', // Substitua pelo seu IP local
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});

// Interceptors para debug
api.interceptors.request.use(request => {
    console.log('Starting Request:', {
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
        baseURL: request.baseURL,
        fullURL: `${request.baseURL}${request.url}`
    });
    return request;
});

api.interceptors.response.use(
    response => {
        console.log('Response:', {
            status: response.status,
            data: response.data,
            headers: response.headers
        });
        return response;
    },
    error => {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout - server might be down or unreachable');
        } else if (!error.response) {
            console.error('Network Error - Details:', {
                message: error.message,
                code: error.code,
                config: {
                    url: error.config?.url,
                    baseURL: error.config?.baseURL,
                    method: error.config?.method,
                    headers: error.config?.headers
                }
            });
        } else {
            console.error('Response Error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
        }
        return Promise.reject(error);
    }
);

const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [user, setUser] = useState({
        authenticated: false,
        user: null,
        token: null
    });

    // // No seu frontend
    // fetch(api.post('/auth/login'), {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         email: 'Admin',
    //         password: 'Admin'
    //     })
    // })
    // .then(response => {response.json(); console.log("response: ", response)})
    // .then(data => console.log("response.data: ", response.data))
    // .catch(error => console.error('Errorrrrr:', error));

    // Função para salvar o token no AsyncStorage
    const saveToken = async (token) => {
        try {
            await AsyncStorage.setItem('@auth_token', token);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    // Função para recuperar o token do AsyncStorage
    const getToken = async () => {
        try {
            return await AsyncStorage.getItem('@auth_token');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };

    // Função para remover o token do AsyncStorage
    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('@auth_token');
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };

    const signIn = async (loginForm) => {
        try {
            console.log('Attempting login with:', loginForm);
            
            const response = await api.post('/login/', {
                email: loginForm.email,
                password: loginForm.password
            });

            console.log('Login response:', response.data);

            if (response.data.token) {
                await saveToken(response.data.token);
                setUser({
                    authenticated: true,
                    user: response.data.user,
                    token: response.data.token
                });
                return response.data;
            } else {
                throw new Error('Token não recebido na resposta');
            }
        } catch (error) {
            console.error('Login error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await removeToken();
            setUser({
                authenticated: false,
                user: null,
                token: null
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Verifica se existe um token salvo ao iniciar o app
    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                // Aqui você poderia validar o token com sua API
                // const response = await api.get('/auth/validate', {
                //     headers: { Authorization: `Bearer ${token}` }
                // });
                
                // Por enquanto, vamos apenas restaurar o estado
                setUser(prev => ({
                    ...prev,
                    authenticated: true,
                    token
                }));
            }
        };

        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
