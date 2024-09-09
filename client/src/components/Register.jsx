import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import './register.css'; // Importação do css

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error] = useState('');
  const navigate = useNavigate(); // Hook para navigação

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      Swal.fire('Erro', 'As senhas não coincidem', 'error');
      return;
    }
    try {
      const response = await register(username, password, email);
      Swal.fire('Sucesso', 'Registro feito com sucesso!', 'success');
      console.log('Registro feito com sucesso!', response.data);
      navigate('/login');
    } catch (error) {
      if (error.message.includes('email')) {
        Swal.fire('Atenção!', 'Email já cadastrado no sistema', 'warning');
      } else if (error.message.includes('username')) {
        Swal.fire('Atenção!', 'Nome de usuário já está em uso', 'warning');
      } else {
        Swal.fire('Erro', 'Erro ao registrar. Tente novamente mais tarde.', 'error');
      }
    }
  };

  return (
    <div className='register-form-container'>
      <form onSubmit={handleSubmit}>
        <h1>COWORKING SPACE</h1>
        <div className='register-form-content'>
          <h2>Cadastrar-se</h2>
          {error && <p className='error-message'>{error}</p>}
          <div className='register-form-group'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=''
            />
            <label>Email</label>
          </div>
          <div className='register-form-group'>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder=''
            />
            <label>Nome de Usuário</label>
          </div>
          <div className='register-form-group'>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=''
            />
            <label>Senha</label>
          </div>
          <div className='register-form-group'>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              placeholder=''
            />
            <label>Repetir Senha</label>
          </div>
          <div className='register-form-footer'>
            <button className='register-form-button' type="submit">Cadastrar</button>
            <a href='/login' className='register-login-button'>Já possui cadastro? Faça login</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;