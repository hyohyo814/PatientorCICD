import { Patient, Entry } from '../../types';
import { Female, Male, Transgender, Favorite } from '@mui/icons-material';

export const genderIcon = (patient: Patient) => {
  switch (patient.gender) {
    case 'female':
      return <Female />;
    case 'male':
      return <Male />;
    case 'other':
      return <Transgender />;
    default:
      return null;
  }
};

export const healthStatusIcon = (entry: Entry) => {
  if (entry && 'healthCheckRating' in entry) {
    switch (entry.healthCheckRating) {
      case 0:
        return <Favorite sx={{ color: 'red' }} />;
      case 1:
        return <Favorite sx={{ color: 'orange' }} />;
      case 2:
        return <Favorite sx={{ color: 'yellow' }} />;
      case 3:
        return <Favorite sx={{ color: 'green' }} />;
      default:
    }
  }
};
