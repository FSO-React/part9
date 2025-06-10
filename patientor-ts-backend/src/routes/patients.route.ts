import express, { Response, Request, NextFunction } from 'express';
import patientsService from '../services/patients.service';
import { NewPatient, NonSensitivePatient, Patient, EntryWithoutId } from '../types';
import { NewPatientSchema, NewEntrySchema } from '../utils';
import { z } from 'zod';

const router = express.Router();

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient = patientsService.findById(req.params.id);
  if (patient) {
    console.log(patient);
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientsService.addPatient(req.body);
  res.json(addedPatient);
});


router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Patient|undefined>) => {
  const updatedPatient = patientsService.addEntry(req.params.id, req.body);
  res.json(updatedPatient);
});

router.use(errorMiddleware);

export default router;