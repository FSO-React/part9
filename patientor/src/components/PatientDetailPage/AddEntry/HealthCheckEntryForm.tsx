import { TextField, MenuItem } from "@mui/material";

interface Props {
  healthCheckRating: number;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>;
}

const healthCheckRatingOptions = [
    { value: 0, label: "Healthy" },
    { value: 1, label: "Low risk" },
    { value: 2, label: "High risk" },
    { value: 3, label: "Critical risk" },
  ];

const HealthCheckEntryForm = (props: Props) => {
  const {
    healthCheckRating,
    setHealthCheckRating
  } = props;

  return (
    <>
      <TextField
        sx={{ my: 1 }}
        select
        label="Health check rating"
        variant="standard"
        fullWidth
        value={healthCheckRating}
        onChange={({ target }) =>
          setHealthCheckRating(parseInt(target.value))
        }
      >
        {healthCheckRatingOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default HealthCheckEntryForm;