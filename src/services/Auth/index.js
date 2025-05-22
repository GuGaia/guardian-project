import {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [user, setUser] = useState({
        authenticated: false,
        user: null,
        token: null
    });

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
            // Aqui você faria a chamada real para sua API
            // const response = await api.post('/auth/login', loginForm);
            
            // Simulando uma resposta da API com JWT
            if(loginForm.email === 'Admin' && loginForm.password === 'Admin') {
                const mockResponse = {
                    user: {
                        id: 1,
                        name: 'Admin',
                        email: loginForm.email
                    },
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' // Token JWT simulado
                };

                // Salva o token
                await saveToken(mockResponse.token);

                // Atualiza o estado
                setUser({
                    authenticated: true,
                    user: mockResponse.user,
                    token: mockResponse.token
                });

                return mockResponse;
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
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
