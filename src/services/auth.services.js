import axios from 'axios';
import { SERVICES } from '../configs/services.configs.js';

export const checkLoginService = async () => {
  try {
    const response = await axios.get(`${SERVICES.LOGIN}/health`);
    return response.data
  } catch {
    return false;
  }
};

export const loginUsuario = async (data) => {
  const response = await axios.post(`${SERVICES.LOGIN}/auth/login-usuario`, data);
  return response.data;
};
