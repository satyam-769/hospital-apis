import express from 'express';
const router = express.Router();

import {create, createSession} from '../controllers/doctor_controller.js';

router.post('/register', create);
router.post('/login', createSession);

export default router;