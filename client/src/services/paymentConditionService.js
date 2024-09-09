import axios from 'axios';

const API_URL = '/payment-conditions';

export const createPaymentCondition = (name) => {
  return axios.post(API_URL, { name });
};

export const getAllPaymentConditions = () => {
  return axios.get(API_URL);
};
export const getPaymentConditionById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updatePaymentCondition = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deletePaymentCondition = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};