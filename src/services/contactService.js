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

  // Add a new contact
  addContact: async (userId, contactData) => {
    console.log("Iniciando addContact com dados:", { userId, contactData });
    try {
      const response = await api.post(`/contacts/${userId}/`, contactData);
      console.log("Resposta do addContact:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro no addContact:", error);
      throw error;
    }
  },

  // Update an existing contact
  updateContact: async (userId, contactId, contactData) => {
    console.log("Iniciando updateContact com dados:", { userId, contactId, contactData });
    try {
      const response = await api.put(`/clients/${userId}/contacts/${contactId}/`, contactData);
      console.log("Resposta do updateContact:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro no updateContact:", error);
      throw error;
    }
  },

  // Delete a contact
  deleteContact: async (userId, contactId) => {
    console.log("Iniciando deleteContact com dados:", { userId, contactId });
    try {
      const response = await api.delete(`/clients/${userId}/contacts/${contactId}/`);
      console.log("Resposta do deleteContact:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro no deleteContact:", error);
      throw error;
    }
  }
}; 