import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { NativeModules } from 'react-native';


const { Storage } = NativeModules;

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://192.168.202.163:8000/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    try {
      let token;
      if (Platform.OS === 'web') {
        token = localStorage.getItem('@auth_token');
      } else {
        token = await AsyncStorage.getItem('@auth_token');
      }
      
      if (token) {
        config.headers.Authorization = `${token}`;
        console.log('URL da requisição:', config.url);
        console.log('Headers da requisição:', config.headers);
        await Storage.saveToken(token);

      } else {
        console.log('Nenhum token encontrado para a requisição:', config.url);
      }
      return config;
    } catch (error) {
      console.error('Error getting token:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Apenas rejeita o erro, sem remover o token
    return Promise.reject(error);
  }
);

export default api; 