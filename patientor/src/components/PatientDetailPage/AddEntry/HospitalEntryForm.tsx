import { TextField } from "@mui/material";

interface Props {
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalEntryForm = (props: Props) => {
  const {
    dischargeDate,
    setDischargeDate,
    dischargeCriteria,
    setDischargeCriteria
  } = props;
  
  return (
    <>
      <TextField
        sx={{ my: 1 }}
        type="date"
        label="Discharge date"
        variant="standard"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        sx={{ my: 1 }}
        label="Discharge criteria"
        variant="standard"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
    </>
  );
};

export default HospitalEntryForm;