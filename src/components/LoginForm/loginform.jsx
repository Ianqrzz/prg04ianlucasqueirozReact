import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './loginform.module.css'  // renomeia o arquivo
import api from '../../services/api'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading,setLoading] =  useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {

    event.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const response = await api.get('/usuario/findbyemail/' + email);
      const usuario = response.data;

      if ( usuario && usuario.senha === senha){
        localStorage.setItem('usuario', JSON.stringify(usuario));
        navigate('/admin');
      } else {
        setErro('Email ou senha incorretos');
      }
    } catch (erro) {
      setErro('usuario nao encontrado');
    }  finally  { 
      setLoading(false);
      }
    }
    

   return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        {/* onSubmit chama handleSubmit quando o botão de submit é clicado */}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h1>Login</h1>

          {/* só renderiza o parágrafo de erro se a variável erro não estiver vazia */}
          {erro && <p style={{ color: 'red' }}>{erro}</p>}

          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="Email"
              value={email}                          // valor controlado pelo estado
              onChange={e => setEmail(e.target.value)} // atualiza o estado a cada tecla digitada
              required                               // validação nativa do HTML — não submete vazio
            />
          </div>

          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>

          <div>
            <label>
              <input type="checkbox" /> Lembrar
            </label>
            <a href="/">Esqueci minha senha</a>
          </div>

          <div className={styles.inputButton}>
            {/* enquanto loading é true, o botão mostra "Entrando..." e fica desabilitado */}
            {/* isso evita o usuário clicar múltiplas vezes */}
            <input
              type="submit"
              value={loading ? 'Entrando...' : 'Entrar'}
              disabled={loading}
            />
          </div>

          <p>registrar conta <a href="/cadastro">cadastrar-se</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm