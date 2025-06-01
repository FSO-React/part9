import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from '@mui/material';
import { Male, Female } from '@mui/icons-material';
// import axios from 'axios';

import { Patient } from "../../types";

// import HealthRatingBar from "../HealthRatingBar";

import patientService from "../../services/patients";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getOne(id);
        setPatient(patient);
        console.log(patient);
      } catch (error) {
        console.error(error);        
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
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
        <Typography variant="h5" sx={{ mb: 3 }}>
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
      </Box>
    </div>
  );
};

export default PatientDetailPage;
