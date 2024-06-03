import express from 'express';

import {register, createReport, patientReports } from '../controllers/patient_controller.js';
import passport from 'passport';
const router = express.Router();

router.post(
  '/register',
  passport.authenticate('jwt', {session:false}),
  register,
)
router.post(
  '/:id/create_report',
  passport.authenticate('jwt',{session:false}),
  createReport,
)
router.get(
  '/:id/all_reports',
  passport.authenticate('jwt',{session:false}),
  patientReports,
)

export default router;