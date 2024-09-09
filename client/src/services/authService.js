import axios from 'axios';

const API_URL = '/api';

export const register = (username, password, email) => {
  return axios.post(`${API_URL}/register`, { username, password, email });
};

// export const login = (username, password) => {
//   return axios.post(`${API_URL}/login`, { username, password });
// };

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};
export const logout = () => {
  localStorage.removeItem('token');
};

export const resetPassword = async (email, newPassword) => {
  return axios.post(`${API_URL}/reset-password`, { email, newPassword });
};


