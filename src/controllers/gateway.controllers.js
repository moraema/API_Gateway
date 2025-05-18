import { loginUsuario } from '../services/login.service.js';
import { crearUsuario } from '../services/registro.service.js';

export const gatewayController = {
  login: async (req, res) => {
    try {
      const result = await loginUsuario(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: "Login fallido", error: error.message });
    }
  },

  registro: async (req, res) => {
    try {
      const token = req.headers.authorization;
      const result = await crearUsuario(req.body, token);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: "Registro fallido", error: error.message });
    }
  }
};
