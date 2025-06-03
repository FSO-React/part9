import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Stack } from '@mui/material';
import { Male, Female } from '@mui/icons-material';
import EntryDetail from "./EntryDetail";

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
        {patient.entries.length === 0 && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            no entries
          </Typography>
        )}
        {patient.entries.map(entry => (
          <Stack key={entry.id} sx={{ border: 2, borderRadius: 3, padding: 2, my: 2 }}>
            <EntryDetail key={entry.id} entry={entry} diagnoses={diagnosis || []} />
          </Stack>
        ))}  
      </Box>
    </div>
  );
};

export default PatientDetailPage;
