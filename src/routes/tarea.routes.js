import express from 'express';
import { gatewayController } from '../controllers/gateway.controllers.js';
import { verificarLoginActivo } from '../middlewares/loginCheck.middleware.js';

const router = express.Router();
router.post('/registro', verificarLoginActivo, gatewayController.registro);
export default router;
