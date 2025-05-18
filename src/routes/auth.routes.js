import express from 'express';
import { gatewayController } from '../controllers/gateway.controller.js';

const router = express.Router();
router.post('/login', gatewayController.login);
export default router;
