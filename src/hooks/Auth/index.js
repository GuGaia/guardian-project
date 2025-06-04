import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import api from '@/services/api';

const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [user, setUser] = useState({
        authenticated: false,
        user: null,
        token: null,
        shouldRedirectToHowItWorks: false
    });
    
    const saveToken = async (token) => {
        try {
            if (Platform.OS === 'web') {
                localStorage.setItem('@auth_token', token);
            }
            await AsyncStorage.setItem('@auth_token', token);
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    const getToken = async () => {
        try {
            if (Platform.OS === 'web') {
                return localStorage.getItem('@auth_token');
            }
            return await AsyncStorage.getItem('@auth_token');
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    };

    const removeToken = async () => {
        try {
            if (Platform.OS === 'web') {
                localStorage.removeItem('@auth_token');
            }
            await AsyncStorage.removeItem('@auth_token');
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };

    const signIn = async ({loginForm, isFromRegistration = false}) => {
        try {
            console.log('tentativa de login: ', loginForm);
            const response = await api.post('/login/', {
                email: loginForm.email,
                password: loginForm.password
            });

            if (response.data.token) {
                console.log('token encontrado: ', response.data.token);
                await saveToken(response.data.token);
                setUser({
                    authenticated: true,
                    user: response.data.user,
                    token: response.data.token,
                    shouldRedirectToHowItWorks: isFromRegistration
                });
                return response.data;
            } else {
                throw new Error('Token não encontrado na resposta');
            }

        } catch (error) {
            console.error('Error during sign in:', error);
            if (error.response) {
                throw new Error(error.response.data.detail || 'Erro ao fazer login');
            }
            throw new Error('Erro ao conectar com o servidor');
        }
    }

    const signOut = async () => {
        try {
            await removeToken();
            setUser({
                authenticated: false,
                user: null,
                token: null,
                shouldRedirectToHowItWorks: false
            });
            return true;
        } catch (error) {
            console.error('Error during sign out:', error);
            throw error;
        }
    }

    const register = async ({name, email, password, number}) => {
        try {
            const response = await api.post('/clients/', {
                name,
                email,
                password,
                number
            });
            if (response.data) {
                
                // After successful registration, call signIn with the same credentials
                return await signIn({
                    loginForm: {
                        email,
                        password
                    },
                    isFromRegistration: true
                });
            } else {
                throw new Error('Erro ao realizar cadastro');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.response) {
                throw new Error(error.response.data.detail || 'Erro ao realizar cadastro');
            }
            throw new Error('Erro ao conectar com o servidor');
        }
    }

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token) {
                try {
                    // Fetch user data using the token
                    const response = await api.get(`/clients/${user?.user?.id}/`);
                    setUser(prev => ({
                        ...prev,
                        authenticated: true,
                        token: token,
                        user: response.data,
                        shouldRedirectToHowItWorks: false
                    }));
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    // If there's an error, clear the token
                    await removeToken();
                    setUser({
                        authenticated: false,
                        user: null,
                        token: null,
                        shouldRedirectToHowItWorks: false
                    });
                }
            }
        };

        checkToken();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, signIn, signOut, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
