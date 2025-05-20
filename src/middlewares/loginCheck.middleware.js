import { checkLoginService } from "../services/auth.services.js";
import { checkRegistroService } from "../services/tareas.services.js";

export const verificarLoginActivo = async (req, res, next) => {
  const loginActivo = await checkLoginService();
  if (!loginActivo) {
    return res.status(503).json({ message: "Servicio de login no disponible" });
  }
  res.status(200).json(loginActivo)
};

export const verificarRegistroActivo = async (req, res, next) => {
  const loginActivo = await checkRegistroService();
  if (!loginActivo) {
    return res.status(503).json({ message: "Servicio de login no disponible" });
  }
  res.status(200).json(loginActivo)
};
