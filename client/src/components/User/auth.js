import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

export const getUserInfo = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.id,
        name: decoded.name,
        master: decoded.master,
      };
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('token');
  Swal.fire({
    icon: 'success',
    title: 'Usuário desconectado com sucesso!',
    showConfirmButton: false,
    timer: 1700 
  }).then(() => {
    window.location.href = '/login'; 
  });
};