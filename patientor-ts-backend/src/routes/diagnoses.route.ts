import express, { Response } from 'express';
import diagnosesService from '../services/diagnoses.service';
import { Diagnosis } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;