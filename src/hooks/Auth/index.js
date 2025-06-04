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
    
    const [loading, setLoading] = useState(true);

    const saveToken = async (token, userId) => {
        try {
            console.log('Salvando token e userId:', { token, userId });
            if (Platform.OS === 'web') {
                localStorage.setItem('@auth_token', token);
                localStorage.setItem('@user_id', userId.toString());
            }
            await AsyncStorage.setItem('@auth_token', token);
            await AsyncStorage.setItem('@user_id', userId.toString());
            // Configurar o token no header do axios
            api.defaults.headers.common['Authorization'] = `${token}`;
        } catch (error) {
            console.error('Error saving token:', error);
        }
    };

    const getToken = async () => {
        try {
            let token, userId;
            if (Platform.OS === 'web') {
                token = localStorage.getItem('@auth_token');
                userId = localStorage.getItem('@user_id');
            } else {
                token = await AsyncStorage.getItem('@auth_token');
                userId = await AsyncStorage.getItem('@user_id');
            }
            console.log('Token e userId recuperados:', { token, userId });
            return { token, userId };
        } catch (error) {
            console.error('Error getting token:', error);
            return { token: null, userId: null };
        }
    };

    const removeToken = async () => {
        try {
            console.log('Removendo token e userId');
            if (Platform.OS === 'web') {
                localStorage.removeItem('@auth_token');
                localStorage.removeItem('@user_id');
            }
            await AsyncStorage.removeItem('@auth_token');
            await AsyncStorage.removeItem('@user_id');
            // Remover o token do header do axios
            delete api.defaults.headers.common['Authorization'];
        } catch (error) {
            console.error('Error removing token:', error);
        }
    };

    const signIn = async ({loginForm, isFromRegistration = false}) => {
        try {
            console.log('Tentativa de login:', loginForm);
            const response = await api.post('/login/', {
                email: loginForm.email,
                password: loginForm.password
            });

            if (response.data.token) {
                console.log('Login bem sucedido:', response.data);
                // Extrair o ID do usuário do token JWT
                const tokenPayload = JSON.parse(atob(response.data.token.split('.')[1]));
                const userId = tokenPayload.user_id;

                console.log('ID do usuário extraído do token:', userId);
                await saveToken(response.data.token, userId);

                // Buscar os dados do cliente específico usando o ID extraído do token
                try {
                    const clientResponse = await api.get(`/clients/${userId}/`);
                    console.log('Dados do cliente obtidos:', clientResponse.data);
                    setUser({
                        authenticated: true,
                        user: clientResponse.data,
                        token: response.data.token
                        shouldRedirectToHowItWorks: isFromRegistration
                    });
                } catch (error) {
                    console.error('Error fetching client data:', error);
                }

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
            console.log('Realizando logout');
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
            try {
                console.log('Verificando token ao iniciar...');
                const { token, userId } = await getToken();
                if (token && userId) {
                    console.log('Token encontrado, buscando dados do usuário...');
                    // Configurar o token no header do axios
                    api.defaults.headers.common['Authorization'] = `${token}`;

                    // Buscar os dados do cliente específico usando o ID salvo
                    const clientResponse = await api.get(`/clients/${userId}/`);

                    if (clientResponse.data) {
                        console.log('Usuário autenticado com sucesso:', clientResponse.data);
                        setUser({
                            authenticated: true,
                            token: token,
                            user: clientResponse.data,
                            shouldRedirectToHowItWorks: false
                        });
                    } else {
                        throw new Error('Dados do usuário não encontrados');
                    }
                } else {
                    console.log('Nenhum token encontrado');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                await signOut();
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);
    
    if (loading) {
        console.log('Carregando estado inicial...');
        return null;
    }

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
