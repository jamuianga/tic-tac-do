import React from 'react';
import { Link } from 'react-router-dom';
import css from './login.module.scss';

function Login() {
  const login = async (e) => {
    e.preventDefault();

    try {
      alert('Login user');
    } catch (error) {
      alert('Não foi possível iniciar a sessão');
    }
  };

  return (
    <form onSubmit={login} className={css['form']}>
      {/* <div>TIC-TAC-DO</div> */}

      <div className={css['input-group']}>
        <label>E-mail</label>
        <input type="email" />
      </div>

      <div className={css['input-group']}>
        <label>Senha</label>
        <input type="password" />
      </div>

      <button type="submit" className={css['btn-login']}>
        Entrar
      </button>

      <Link to={'/reset-password'}>Recuperar a senha</Link>
    </form>
  );
}

export default Login;
