import api from './api';

export const contactService = {
  // Get all contacts for a user
  getContactList: async (userId) => {
    console.log("Iniciando getContactList com userId:", userId);
    try {
      const response = await api.get(`/clients/${userId}/contacts/`);
      console.log("Resposta do getContactList:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro no getContactList:", error);
      throw error;
    }
  },

  // Get a single contact's details
  getContact: async (userId, contactId) => {
    console.log("Iniciando getContact com userId e contactId:", { userId, contactId });
    try {
      const response = await api.get(`/clients/${userId}/contacts/${contactId}/`);
      console.log("Resposta do getContact:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro no getContact:", error);
      throw error;
    }
  },

  // Add a new contact
  addContact: async (userId, contactData) => {
    console.log("Iniciando addContact com dados:", { userId, contactData });
    try {
      // Garantir que os campos obrigatórios estejam presentes
      if (!contactData.name || !contactData.phone_number || !contactData.relationship || !contactData.channel_ids) {
        throw new Error('Campos obrigatórios faltando: name, phone_number, relationship e channel_ids são necessários');
      }

      // Garantir que channel_ids seja um array
      const data = {
        ...contactData,
        channel_ids: Array.isArray(contactData.channel_ids) ? contactData.channel_ids : [contactData.channel_ids]
      };

      console.log("Dados formatados para envio:", data);
      const response = await api.post(`/clients/${userId}/contacts/`, data);
      console.log("Resposta do addContact:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro no addContact:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      throw error;
    }
  },

  // Update an existing contact
  updateContact: async (userId, contactId, contactData) => {
    console.log("Iniciando updateContact com dados:", { userId, contactId, contactData });
    try {
      // Garantir que channel_ids seja um array
      const data = {
        ...contactData,
        channel_ids: Array.isArray(contactData.channel_ids) ? contactData.channel_ids : [contactData.channel_ids]
      };

      console.log("Dados formatados para envio:", data);
      const response = await api.put(`/clients/${userId}/contacts/${contactId}/`, data);
      console.log("Resposta do updateContact:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro no updateContact:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      throw error;
    }
  },

  // Delete a contact
  deleteContact: async (userId, contactId) => {
    console.log("Iniciando deleteContact:", { userId, contactId });
    try {
      const response = await api.delete(`/clients/${userId}/contacts/${contactId}/`);
      console.log("Resposta do deleteContact:", response.status);
      return response.status;
    } catch (error) {
      console.error("Erro no deleteContact:", error);
      throw error;
    }
  }
}; 