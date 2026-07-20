import api from '../services/api';

/**
 * useApi - Hook para fazer requisições à API usando Axios
 * Usa a configuração do arquivo api.js
 */
export const useApi = () => {
  const get = async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer GET:', error);
      throw error;
    }
  };

  const post = async (endpoint, data) => {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer POST:', error);
      throw error;
    }
  };

  const put = async (endpoint, data) => {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer PUT:', error);
      throw error;
    }
  };

  const delete_ = async (endpoint) => {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer DELETE:', error);
      throw error;
    }
  };

  return { get, post, put, delete: delete_ };
};
