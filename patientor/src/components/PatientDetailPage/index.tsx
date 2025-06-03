import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from '@mui/material';
import { Male, Female } from '@mui/icons-material';
// import axios from 'axios';

import { Patient, Diagnosis } from "../../types";

// import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses"; 

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      } catch (error) {
        console.error(error);        
      }
    };

    const fetchDiagnosis = async () => {
      try {
        const diagnosis = await diagnosisService.getAll();
        setDiagnosis(diagnosis);
      } catch (error) {
        console.error(error);        
      }
    }; 

    fetchPatient();
    fetchDiagnosis();
    setLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="30vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!patient) {
    return (
      <div>
        <Box sx={{ mt: 4 }} >
          <Typography variant="h5">
            Patient not found
          </Typography>
        </Box>
      </div>
    );
  }

  const { entries } = patient;
  const diagnosisCodes = entries.map(entry => entry.diagnosisCodes).filter(Boolean).flat();
  
  return (
    <div className="App">
      <Box sx={{ mt: 4 }} >
        <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
          {patient.name}
          {patient.gender === "male" && <Male />}
          {patient.gender === "female" && <Female />}
        </Typography>
        <Typography variant="body1">
          ssn: {patient.ssn}
        </Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
          Entries
        </Typography>
        {entries.map((entry) => (
          <Typography key={entry.id} variant="body1">
            {entry.date} <em>{entry.description}</em>
          </Typography>
        ))}
        <ul>
          {diagnosisCodes.map((code) => (
            <li key={code}>
              {code}: {diagnosis?.find(d => d.code === code)?.name}
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
};

export default PatientDetailPage;
