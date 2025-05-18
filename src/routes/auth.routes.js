import express from 'express';
import { gatewayController } from '../controllers/gateway.controllers.js';
import { verificarLoginActivo } from '../middlewares/loginCheck.middleware.js';

const router = express.Router();

router.get('/health', verificarLoginActivo);
router.post('/login-usuario', gatewayController.login);


export default router;
