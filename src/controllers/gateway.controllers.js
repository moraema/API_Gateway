import { loginUsuario } from '../services/auth.services.js';
import { crearUsuario } from '../services/tareas.services.js';
import { checkLoginService } from '../services/auth.services.js';

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
    const loginActivo = await checkLoginService();

    if (!loginActivo) {
      return res.status(503).json({ message: "Error,  Intenta más tarde." });
    }

    try {
      const token = req.headers.authorization;
      const nuevoUsuario = await crearUsuario(req.body, token); 
      return res.status(201).json(nuevoUsuario);

    } catch (error) {
      const backendError = error.response?.data?.error?.message || error.message;
      return res.status(500).json({ 
        message: "Error al registrar usuario", 
        error: backendError 
      });
    }
  }
}; 
