import type { Diagnosis, Entry } from "../../types";


interface Props {
  diagnoses: Diagnosis[];
  entry: Entry
}

const DiagnosisList = (props: Props) => {
  const { diagnoses, entry } = props;

  return (
    <ul>
      {entry.diagnosisCodes?.map((code) => (
        <li key={code}>
          {code} {diagnoses.find((d) => d.code === code)?.name}
        </li>
      ))}
    </ul>
  );
};


export default DiagnosisList;