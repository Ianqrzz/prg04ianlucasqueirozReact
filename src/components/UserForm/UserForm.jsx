import React, { useState } from 'react';
import api from '../../services/api';

const CadastroUsuario = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [carregando, setCarregando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nome, email, senha } = formData;

    if (!nome || !email || !senha) {
      setMensagem({ tipo: 'erro', texto: 'Por favor, preencha todos os campos.' });
      return;
    }

    if (senha.length < 6) {
      setMensagem({ tipo: 'erro', texto: 'A senha deve ter pelo menos 6 caracteres.' });
      return;
    }

    setCarregando(true);
    setMensagem({ tipo: '', texto: '' });

    try {
      const endpoint = process.env.REACT_APP_REGISTER_ENDPOINT || '/usuarios';
      const response = await api.post(endpoint, { nome, email, senha });

      setMensagem({
        tipo: 'sucesso',
        texto: response.data?.message || 'Cadastro realizado com sucesso!',
      });
      setFormData({ nome: '', email: '', senha: '' });
    } catch (error) {
      const erroMensagem = error.response?.data?.message || error.response?.data?.error || 'Não foi possível cadastrar no momento. Verifique o backend.';
      setMensagem({ tipo: 'erro', texto: erroMensagem });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Criar Conta</h2>
      
      {mensagem.texto && (
        <div style={{
          ...styles.alerta,
          backgroundColor: mensagem.tipo === 'erro' ? '#ffdde1' : '#e2f0d9',
          color: mensagem.tipo === 'erro' ? '#c00000' : '#385723'
        }}>
          {mensagem.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.formulario}>
        <div style={styles.grupoInput}>
          <label htmlFor="nome" style={styles.label}>Nome Completo</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome"
            style={styles.input}
          />
        </div>

        <div style={styles.grupoInput}>
          <label htmlFor="email" style={styles.label}>E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu-email@exemplo.com"
            style={styles.input}
          />
        </div>

        <div style={styles.grupoInput}>
          <label htmlFor="senha" style={styles.label}>Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Crie uma senha forte"
            style={styles.input}
          />
        </div>

        <button type="submit" style={{ ...styles.botao, opacity: carregando ? 0.7 : 1 }} disabled={carregando}>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

// Estilização rápida em linha (CSS-in-JS) para o template já vir bonito
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  },
  titulo: {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333',
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  grupoInput: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px 14px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  botao: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  alerta: {
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center',
  }
};

export default CadastroUsuario;