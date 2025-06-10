import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NonSensitivePatient, Patient, NewPatient, Entry, EntryWithoutId } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient : Patient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Patient|undefined => {
  const newEntry : Entry = {
    id: uuid(),
    ...entry
  };
  const patient = findById(patientId);
  if (patient) {
    patient.entries.push(newEntry);
  }
  return patient ? patient : undefined;
};

export default {
  getPatients,
  findById,
  getNonSensitivePatients,
  addPatient,
  addEntry
};