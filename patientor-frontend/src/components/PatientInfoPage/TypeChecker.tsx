import { Entry, Diagnose } from '../../types';
import HealthCheckFormat from './HealthCheckFormat';
import HospitalFormat from './HospitalFormat';
import OccupationalHealthcareFormat from './OccupationalHealthcareFormat';
import { assertNever } from '../../utils/helpers';

const entryInfo = (entry: Entry, diagnoses: Diagnose[]) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <HealthCheckFormat
          key={entry.id}
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    case 'Hospital':
      return (
        <HospitalFormat
          key={entry.id}
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareFormat
          key={entry.id}
          entry={entry}
          diagnoses={diagnoses}
        />
      );
    default:
      return assertNever();
  }
};

export default entryInfo;