import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { resetPassword } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './resetPassword.css'; // Importação do css

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email, newPassword);
      Swal.fire('Sucesso', 'Senha alterada com sucesso!', 'success');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Swal.fire('Atenção!', 'Email não encontrado. Verifique o email digitado.', 'warning');
      } else {
        Swal.fire('Erro', 'Erro ao redefinir a senha. Tente novamente mais tarde.', 'error');
      }
    }
  };

  return (
    <div className='reset-form-container'>
      <form onSubmit={handleSubmit}>
        <h1>COWORKING SPACE</h1>
        <div className='reset-form-content'>
          <h2>Recuperar senha</h2>
          <div className='reset-form-group'>
            <input type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=''
            />
            <label>Email</label>
          </div>
          <div className='reset-form-group'>
            <input type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder=''
            />
            <label>Nova senha</label>
          </div>
          <div className='reset-form-footer'>
            <button className='reset-form-button' type="submit">Salvar</button>
            <a href='/login' className='login-page-button'>voltar</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;