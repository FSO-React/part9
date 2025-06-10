import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Stack, Alert, ButtonGroup, Button } from '@mui/material';
import { Male, Female } from '@mui/icons-material';
import EntryDetail from "./EntryDetail";
import AddEntryForm from "./AddEntry/AddEntryForm";

import { Patient, Diagnosis, EntryType, EntryWithoutId } from "../../types";

import axios from "axios";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses"; 

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[] | null>(null);

  const [error, setError] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showEntryOptions, setShowEntryOptions] = useState<boolean>(false);
  const [entryType, setEntryType] = useState<EntryType>();

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

    const submitNewEntry = async (object: EntryWithoutId) => {
    try {
      const patient = await patientService.createEntry(id, object);
      setPatient(patient);
      toggleForm();
    }
    catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if(e?.response?.data?.Error && typeof e?.response?.data.Error === "string") {
          const message = e.response.data.Error;
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    // setError("");
  };

  const handleSelectingEntryType = (entryType: EntryType) => {
    setEntryType(entryType);
    setShowEntryOptions(false);
    setShowForm(true);
  };


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
        {error && (
          <Alert severity="error">{error}</Alert>
        )}

        {!showForm && showEntryOptions &&(
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ButtonGroup variant="text" orientation="vertical" aria-label="text button group">
                <Button sx={{mt: 3}} onClick={() => handleSelectingEntryType(EntryType.HealthCheck)}>New HealthCheck entry</Button>
                <Button sx={{mt: 3}} onClick={() => handleSelectingEntryType(EntryType.Hospital)}>New Hospital entry</Button>
                <Button sx={{mt: 3}} onClick={() => handleSelectingEntryType(EntryType.OccupationalHealthcare)}>New OccupationalHealthcare entry</Button>
                <Button sx={{mt: 3}} onClick={() => setShowEntryOptions(false)} style={{ color: "red" }}>Cancel</Button>
              </ButtonGroup>
            </div>
          )}
          {!showForm && !showEntryOptions && (
            <Button sx={{mt: 3}} variant="contained" onClick={() => setShowEntryOptions(true)}>New entry</Button>
          )}

        {showForm && entryType && (
          <AddEntryForm
            onSubmit={submitNewEntry}
            onCancel={toggleForm}
            diagnoses={diagnosis || []}
            entryType={entryType}
          />
        )}

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
