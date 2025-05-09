import express, { Response } from 'express';
import patientsService from '../services/patients.service';
import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

export default router;