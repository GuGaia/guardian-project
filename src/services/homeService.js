import api from './api';

export const homeService = {
  // Get user data for the home screen
  getUserData: async (userId) => {
    console.log("Iniciando getUserData com userId:", userId);
    try {
      const response = await api.get(`/clients/${userId}/`);
      console.log("Resposta do getUserData:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro no getUserData:", error);
      throw error;
    }
  },
};