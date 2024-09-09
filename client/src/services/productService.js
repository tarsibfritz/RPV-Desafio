import axios from 'axios';

const API_URL = '/products';

// Envio dos dados como FormData por conta da imagem
export const createProduct = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'  // Envio de formulário com dados mistos (texto e binário)
    }
  });
};

export const getAllProducts = () => {
  return axios.get(API_URL);
};

export const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateProduct = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
