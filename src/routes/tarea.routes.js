import express from 'express';
import { gatewayController } from '../controllers/gateway.controllers.js';


const router = express.Router();

router.post('/registro', gatewayController.registro);

export default router;
