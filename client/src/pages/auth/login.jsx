import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axios } from '../../App';
import css from './login.module.scss';

function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      // TODO validar campos
      const response = await axios.post('auth', {
        email: email.current.value,
        password: password.current.value,
      });

      // TODO guardar access token no context
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Não foi possível iniciar a sessão');
    }
  };

  return (
    <form onSubmit={login} className={css['form']}>
      {/* <div>TIC-TAC-DO</div> */}

      <div className={css['input-group']}>
        <label>E-mail</label>
        <input type="email" ref={email} />
      </div>

      <div className={css['input-group']}>
        <label>Senha</label>
        <input type="password" ref={password} />
      </div>

      <button type="submit" className={css['btn-login']}>
        Entrar
      </button>

      <Link to={'/reset-password'}>Recuperar a senha</Link>
    </form>
  );
}

export default Login;
