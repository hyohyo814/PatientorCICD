import { Typography } from '@mui/material';
import { Diagnose } from '../../types';

const matchDiagnosis = (code: string, diagnoses: Diagnose[]) => {
  if (
    diagnoses &&
    diagnoses !== undefined &&
    diagnoses.map((c) => c.code).includes(code)
  ) {
    return diagnoses.map((v) =>
      v.code === code ? <Typography key={v.code}>{v.name}</Typography> : null
    );
  }
  return null;
};


export default matchDiagnosis;