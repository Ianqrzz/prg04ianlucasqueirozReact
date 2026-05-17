import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './loginform.module.css'  // renomeia o arquivo

function LoginForm() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();

    navigate('/admin')
    }

  return (
    <div className={styles.loginWrapper}>
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
        </div>

        <div>
          <label>
            <input type="checkbox" /> Lembrar
          </label>
          <a href="#">Esqueci minha senha</a>
        </div>

        <div className={styles.inputButton}>
          <input type="submit" value="Entrar" />
        </div>

        <p>registrar conta <a href="#">cadastrar-se</a></p>
      </form>
    </div>
    </div>
  )
}

export default LoginForm