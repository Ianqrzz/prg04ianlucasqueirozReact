import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import '../../styles/Pages.css';

/**
 * Register - Página de criação de conta
 */
export default function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading, error } = useAuth();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    senhaConfirm: '',
  });
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);

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

  const validateForm = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.senhaConfirm) {
      setLocalError('Por favor, preencha todos os campos');
      return false;
    }

    if (formData.nome.length < 3) {
      setLocalError('Nome deve ter pelo menos 3 caracteres');
      return false;
    }

    if (formData.senha.length < 6) {
      setLocalError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (formData.senha !== formData.senhaConfirm) {
      setLocalError('As senhas não correspondem');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!validateForm()) {
      return;
    }

    try {
      await register(formData.nome, formData.email, formData.senha);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setLocalError(error || 'Erro ao criar conta');
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>✓</div>
            <h2 style={{ marginBottom: '16px' }}>Conta Criada com Sucesso!</h2>
            <p style={{ color: '#666', marginBottom: '32px' }}>
              Bem-vindo! Redirecionando para a home...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Lado Esquerdo - Imagem/Info */}
        <div className="auth-image">
          <div className="auth-image-content">
            <h2>Junte-se a Nós!</h2>
            <p>Crie sua conta e comece a aproveitar as melhores ofertas</p>
            <div className="auth-features">
              <div className="auth-feature">
                <span className="auth-feature-icon">🎁</span>
                <span>Ofertas exclusivas para membros</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">📦</span>
                <span>Rastreamento de pedidos</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">💳</span>
                <span>Checkout mais rápido</span>
              </div>
              <div className="auth-feature">
                <span className="auth-feature-icon">⭐</span>
                <span>Programa de pontos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="auth-form-container">
          <Card>
            <h1 style={{ marginBottom: '8px' }}>Criar Conta</h1>
            <p style={{ color: '#666', marginBottom: '32px' }}>
              Já tem conta? <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Fazer login</a>
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
                label="Nome Completo"
                name="nome"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
              />

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
                placeholder="Crie uma senha forte"
                value={formData.senha}
                onChange={handleChange}
                required
              />

              <Input
                label="Confirmar Senha"
                name="senhaConfirm"
                type="password"
                placeholder="Confirme sua senha"
                value={formData.senhaConfirm}
                onChange={handleChange}
                required
              />

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '24px', fontSize: '14px' }}>
                <input type="checkbox" style={{ marginTop: '4px' }} required />
                <span>
                  Concordo com os <a href="#" style={{ color: '#007bff' }}>Termos de Serviço</a> e <a href="#" style={{ color: '#007bff' }}>Política de Privacidade</a>
                </span>
              </label>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
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
