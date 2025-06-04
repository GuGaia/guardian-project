import api from './api';

export const updateAutoMessage = async (clientId, newMessage) => {
    try {
        const response = await api.patch(`/clients/${clientId}/`, {
            default_message: newMessage
        });
        return response.data;
    } catch (error) {
        console.error('Error updating auto message:', error);
        throw error;
    }
}; 