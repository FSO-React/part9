import { TextField } from "@mui/material";

interface Props {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveStartDate: string;
  setSickLeaveStartDate: React.Dispatch<React.SetStateAction<string>>;
  sickLeaveEndDate: string;
  setSickLeaveEndDate: React.Dispatch<React.SetStateAction<string>>;
}

const OccupationalHealthcareEntryForm = (props: Props) => {
  const { 
    employerName,
    setEmployerName,
    sickLeaveStartDate,
    setSickLeaveStartDate,
    sickLeaveEndDate,
    setSickLeaveEndDate
  } = props;

  return (
    <>
      <TextField
        sx={{ my: 1 }}
        label="Employee"
        variant="standard"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <TextField
        sx={{ my: 1 }}
        type="date"
        label="Sick leave start date"
        variant="standard"
        fullWidth
        value={sickLeaveStartDate}
        onChange={({ target }) => setSickLeaveStartDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        sx={{ my: 1 }}
        type="date"
        label="Sick leave end date"
        variant="standard"
        fullWidth
        value={sickLeaveEndDate}
        onChange={({ target }) => setSickLeaveEndDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
};

export default OccupationalHealthcareEntryForm;