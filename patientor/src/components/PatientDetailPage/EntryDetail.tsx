import { Entry, Diagnosis, EntryType } from '../../types';
import { assertNever } from '../../utils';
import { Typography } from '@mui/material';
import { HealthAndSafety, Work, LocalHospital } from '@mui/icons-material';

import DiagnosisList from './DiagnosisList';
import HealthRating from './HealthRating';

interface Props {
  entry: Entry
  diagnoses: Diagnosis[]
}

const EntryDetail = (props: Props) => {
  const { entry, diagnoses } = props;

  switch (entry.type) {
    case EntryType.HealthCheck:
      return (
        <div>
          <Typography variant="body1">
            {entry.date} <HealthAndSafety />
          </Typography>
          <Typography variant="body1">
            <em>{entry.description}</em>
          </Typography>
          <HealthRating healthRating={entry.healthCheckRating} />
          <DiagnosisList diagnoses={diagnoses} entry={entry} />
          <Typography variant="body1">
            diagnose by {entry.specialist}
          </Typography>
        </div>
      );

    case EntryType.Hospital:
      return (
      <div>
        <Typography variant="body1">
          {entry.date} <LocalHospital />
        </Typography>
        <Typography variant="body1">
          <em>{entry.description}</em>
        </Typography>
        <Typography variant="body1">
          Discharge: {entry.discharge.date} {entry.discharge.criteria}
        </Typography>
        <DiagnosisList diagnoses={diagnoses} entry={entry} />
        <Typography variant="body1">
          diagnose by {entry.specialist}
        </Typography>
      </div>
      );

    case EntryType.OccupationalHealthcare:
      return (
        <div>
          <Typography variant="body1">
            {entry.date} <Work /> {entry.employerName}
          </Typography>
          <Typography variant="body1">
            <em>{entry.description}</em>
          </Typography>
          {entry.sickLeave && (
            <Typography variant="body1">
              Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
            </Typography>
          )}
          <DiagnosisList diagnoses={diagnoses} entry={entry} />
          <Typography variant="body1">
            diagnose by {entry.specialist}
          </Typography>
        </div>
      );
  
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;