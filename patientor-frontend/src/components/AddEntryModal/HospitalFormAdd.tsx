import {
  TextField,
  InputLabel,
} from '@mui/material';

interface Props {
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setCriteria: React.Dispatch<React.SetStateAction<string>>;
}

const HospitalFormAdd = ({ setDate, setCriteria }: Props) => {
  return (
    <div>
      <InputLabel>Discharge Details</InputLabel>
      <TextField
        className='DischargeDate'
        sx={{
          mb: '14px',
        }}
        type='date'
        placeholder="YYYY-MM-DD"
        fullWidth
        onChange={({target}) => setDate(target.value)}
      />
      <TextField
        className='DischargeCriteria'
        sx={{
          mb: '14px',
        }}
        label="Criteria"
        fullWidth
        onChange={({ target }) => setCriteria(target.value)}
      />
    </div>
  );
};

export default HospitalFormAdd;
