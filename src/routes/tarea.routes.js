import express from 'express';
import { gatewayController } from '../controllers/gateway.controllers.js';
import { verificarRegistroActivo } from '../middlewares/loginCheck.middleware.js';


const router = express.Router();

router.get('/health', verificarRegistroActivo)
router.post('/registro', gatewayController.registro);

export default router;
