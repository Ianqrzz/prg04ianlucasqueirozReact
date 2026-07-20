import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

/**
 * AuthContext - Gerencia autenticação e dados do utilizador
 * Armazena: user, token, loading, error
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('usuario');
    const savedToken = localStorage.getItem('@074Diversao:token');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // Login
  const login = async (email, senha) => {
    setLoading(true);
    setError(null);
    try {
  const response = await api.post('/usuario/login', { email, senha });
  
  // GARANTE que estamos pegando o objeto do usuário direto.
  // Se response.data já contiver um .data dentro (como mostra seu localStorage), pegamos ele.
  const userData = response.data.data ? response.data.data : response.data;
  
  // Salvar no localStorage de forma limpa
  localStorage.setItem('usuario', JSON.stringify(userData));
  localStorage.setItem('@074Diversao:token', userData.id); 
  
  setUser(userData);
  setToken(userData.id);
  return userData;
} catch (err) {
      const errorMessage = err.response?.data?.message || 'Email ou senha inválidos';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cadastro
  const register = async (nome, email, senha) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/usuario/save', {
        nome,
        email,
        senha,
        ativo: true,
        perfil_usuario_id: 1, // Perfil padrão
      });
      
      const userData = response.data;
      
      // Salvar no localStorage
      localStorage.setItem('usuario', JSON.stringify(userData));
      localStorage.setItem('074', userData.id);
      
      setUser(userData);
      setToken(userData.id);
      return userData;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao criar conta';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('@074Diversao:token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
