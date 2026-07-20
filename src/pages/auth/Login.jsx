import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import '../../styles/Pages.css';

/**
 * Login - Página de autenticação de utilizadores
 */
export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.email || !formData.senha) {
      setLocalError('Por favor, preencha todos os campos');
      return;
    }

    try {
      await login(formData.email, formData.senha);
      navigate('/');
    } catch (err) {
      setLocalError(error || 'Email ou senha inválidos');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Lado Esquerdo - Imagem/Info */}
        <div className="auth-image">
          <div className="auth-image-content">
            <h2>Bem-vindo de Volta!</h2>
            <p>Faça login para acessar sua conta e continuar comprando</p>
            <div className="auth-features">
              <div className="auth-feature">
                <span className="auth-feature-icon">✓</span>
                <span>Acesso rápido ao carrinho</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">✓</span>
                <span>Histórico de pedidos</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">✓</span>
                <span>Endereços salvos</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">✓</span>
                <span>Ofertas exclusivas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="auth-form-container">
          <Card>
            <h1 style={{ marginBottom: '8px' }}>Login</h1>
            <p style={{ color: '#666', marginBottom: '32px' }}>
              Não tem conta? <a href="/cadastro" style={{ color: '#007bff', textDecoration: 'none' }}>Criar uma</a>
            </p>

            {(localError || error) && (
              <div style={{
                padding: '12px',
                marginBottom: '20px',
                backgroundColor: '#f8d7da',
                color: '#721c24',
                borderRadius: '4px',
                border: '1px solid #f5c6cb'
              }}>
                {localError || error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="seu-email@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Senha"
                name="senha"
                type="password"
                placeholder="Sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" />
                  Lembrar-me
                </label>
                <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>
                  Esqueci a senha
                </a>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #dee2e6', textAlign: 'center' }}>
              <p style={{ color: '#666', marginBottom: '16px' }}>Ou continue com</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Button variant="outline">
                  Google
                </Button>
                <Button variant="outline">
                  Facebook
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
