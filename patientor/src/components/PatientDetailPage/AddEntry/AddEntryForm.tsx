import { useState, SyntheticEvent } from "react";
import { Diagnosis, EntryType, EntryWithoutId } from "../../../types";
import BasicEntryForm from "./BasicEntryForm";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

import { Grid, Button, Stack, Typography } from "@mui/material";

interface Props {
  onSubmit: (object: EntryWithoutId) => void
  onCancel: () => void
  entryType: EntryType
  diagnoses: Diagnosis[]
}

const AddEntryForm = (props: Props) => {
  const { 
    diagnoses,
    entryType,
    onCancel,
    onSubmit
   } = props;

  // basic
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  // health check
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  // occupational
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");
  // hospital
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const basicEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (entryType) {
      case EntryType.HealthCheck:
        onSubmit({
          ...basicEntry,
          type: EntryType.HealthCheck,
          healthCheckRating,
        });
        break;
      case EntryType.Hospital:
        onSubmit({
          ...basicEntry,
          type: EntryType.Hospital,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case EntryType.OccupationalHealthcare:
        let sickLeave = undefined;
        if (sickLeaveStartDate || sickLeaveEndDate) {
          sickLeave = {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          };
        }
        onSubmit({
          ...basicEntry,
          type: EntryType.OccupationalHealthcare,
          employerName,
          sickLeave,
        });
        break;
      default:
        throw new Error("Unknown entry type");
    }
  };

  return (
    <Stack sx={{ border: 2, borderRadius: 3, padding: 2, my: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
        New {entryType} Entry
      </Typography>

      <form onSubmit={addEntry}>
        <BasicEntryForm 
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          specialist={specialist}
          setSpecialist={setSpecialist}
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
          diagnoses={diagnoses}
        />

        <Stack sx={{ border: 1, borderRadius: 4, padding: 1, my: 2 }}>
          {entryType === EntryType.HealthCheck && (
            <HealthCheckEntryForm 
              healthCheckRating={healthCheckRating}
              setHealthCheckRating={setHealthCheckRating}
            />)}
          {entryType === EntryType.Hospital && (
            <HospitalEntryForm 
              dischargeDate={dischargeDate}
              setDischargeDate={setDischargeDate}
              dischargeCriteria={dischargeCriteria}
              setDischargeCriteria={setDischargeCriteria}
            />)}
          {entryType === EntryType.OccupationalHealthcare && (
            <OccupationalHealthcareEntryForm 
              employerName={employerName}
              setEmployerName={setEmployerName}
              sickLeaveStartDate={sickLeaveStartDate}
              setSickLeaveStartDate={setSickLeaveStartDate}
              sickLeaveEndDate={sickLeaveEndDate}
              setSickLeaveEndDate={setSickLeaveEndDate}
            />)}
        </Stack>

        <Grid sx={{ pb: 4 }}>
          <Grid item>
            <Button
              color="warning"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};

export default AddEntryForm;