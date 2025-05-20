import axios from 'axios';
import { SERVICES } from '../configs/services.configs.js';

export const crearUsuario = async (data, token) => {
  const response = await axios.post(`${SERVICES.REGISTRO}/tareas/create`, data, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};


export const checkRegistroService = async () => {
  try {
    const response = await axios.get(`${SERVICES.REGISTRO}/health`);
    return response.data
  } catch {
    return false;
  }
};
