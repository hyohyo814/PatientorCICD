import {
  TextField,
  InputLabel,
} from '@mui/material';

interface Props {
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
}

const OccHealthcareFormAdd = ({
  setEmployerName,
  setStartDate,
  setEndDate,
}: Props) => {
  return (
    <div>
      <TextField
        sx={{
          mb: '14px',
        }}
        label="Employer name"
        fullWidth
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel>Sick Leave Period</InputLabel>
      <TextField
        sx={{
          mb: '14px',
        }}
        type='date'
        placeholder="YYYY-MM-DD"
        fullWidth
        onChange={({ target }) => setStartDate(target.value)}
      />
      <TextField
        sx={{
          mb: '14px',
        }}
        type='date'
        placeholder="YYYY-MM-DD"
        fullWidth
        onChange={({ target }) => setEndDate(target.value)}
      />
    </div>
  );
};

export default OccHealthcareFormAdd;
