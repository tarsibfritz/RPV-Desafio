import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './login.css'; // Importação do css

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navigação

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      Swal.fire('Sucesso', 'Login feito com sucesso!', 'success');
      navigate('/');
    } catch (error) {
      Swal.fire('Erro', 'Erro ao fazer login', 'error');
    }
  };

  return (
    <div className='login-form-container'>
      <form onSubmit={handleSubmit}>
        <h1>COWORKING SPACE</h1>
        <div className='login-form-content'>
          <h2>Login</h2>
          <div className='login-form-group'>
            <input type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder=''
            />
            <label>Nome de Usuário</label>
          </div>
          <div className='login-form-group'>
            <input type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=''
            />
            <label>Senha</label>
          </div>
          <div className='login-form-footer'>
            <button className='login-form-button' type="submit">Login</button>
            <a href='/register' className='login-register-button'>Cadastrar-se</a>
            <a href='/reset-password' className='login-reset-button'>Esqueceu a senha?</a>
          </div>
        </div>
      </form>
    </div>

  );
};

export default Login;