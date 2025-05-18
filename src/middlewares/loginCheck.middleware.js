import { checkLoginService } from "../services/auth.services.js";

export const verificarLoginActivo = async (req, res, next) => {
  const loginActivo = await checkLoginService();
  if (!loginActivo) {
    return res.status(503).json({ message: "Servicio de login no disponible" });
  }
  res.status(200).json(loginActivo)
};

