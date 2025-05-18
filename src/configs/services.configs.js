import dotenv from 'dotenv';
dotenv.config();

export const SERVICES = {
  LOGIN: process.env.LOGIN_SERVICE_URL,
  REGISTRO: process.env.REGISTRO_SERVICE_URL,
};


