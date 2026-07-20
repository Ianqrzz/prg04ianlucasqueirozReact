import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prg04ianlucasqueiroz-backend-production-10d0.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor: Antes de qualquer requisição sair do front-end, ele passa por aqui
api.interceptors.request.use(
  (config) => {
    // Se o usuário estiver logado, pegamos o token salvo no navegador
    const token = localStorage.getItem('@074Diversao:token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;