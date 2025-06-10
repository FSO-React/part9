import {  TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material'; // , InputLabel
import { Diagnosis } from "../../../types";

interface Props {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>
  specialist: string;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>
  diagnosisCodes: string[];
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>
  diagnoses: Diagnosis[]
}

const BasicEntryForm = (props: Props) => {
  const {
    date,
    setDate,
    description,
    setDescription,
    specialist,
    setSpecialist,
    diagnosisCodes,
    setDiagnosisCodes,
    diagnoses
  } = props;  

  return (
    <div>
      <TextField
        sx={{ my: 1 }}
        type="date"
        label="Date"
        variant="standard"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        sx={{ my: 1 }}
        label="Description"
        variant="standard"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        sx={{ my: 1 }}
        label="Specialist"
        variant="standard"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
      />
      <FormControl sx={{ my: 1 }} variant="standard" fullWidth>
        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(typeof target.value === "string" ? target.value.split(',') : target.value)
          }
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default BasicEntryForm;