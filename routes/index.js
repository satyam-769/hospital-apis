import express from 'express';

import {filteredReports} from '../controllers/status_controller.js';
import doctors from './doctors.js';
import patients from './patients.js';
import passport from 'passport';
const router = express.Router();

router.use('/doctors', doctors)
router.use('/patients', patients)
router.get(
  '/reports/:status',
  passport.authenticate('jwt',{session:false}),
  filteredReports,
)

export default router;