import { useState, SyntheticEvent } from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from '@mui/material';

import {
  EntryWithoutId,
  EntryType,
  HealthCheckRating,
  Diagnose,
} from '../../types';

import HospitalFormAdd from './HospitalFormAdd';
import HealthCheckFormAdd from './HealthCheckFormAdd';
import OccHealthcareFormAdd from './OccHealthcareFormAdd';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnosesList: Diagnose[];
}

interface TypeOption {
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(EntryType).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddPatientForm = ({ onCancel, onSubmit, diagnosesList }: Props) => {
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<EntryType>(EntryType.Hospital);
  const [diagnosis, setDiagnosis] = useState('');
  const [diagnoses, setDiagnoses] = useState<Array<string>>([]);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [rating, setRating] = useState<HealthCheckRating>(0);

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value;
      const type = Object.values(EntryType).find((g) => g.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
      case EntryType.Hospital:
        onSubmit({
          description,
          specialist,
          date,
          type,
          diagnosisCodes: diagnoses,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case EntryType.HealthCheck:
        onSubmit({
          description,
          specialist,
          date,
          type,
          diagnosisCodes: diagnoses,
          healthCheckRating: rating,
        });
        break;
      case EntryType.OccupationalHealthcare:
        onSubmit({
          description,
          specialist,
          date,
          type,
          diagnosisCodes: diagnoses,
          employerName,
          sickLeave: {
            startDate,
            endDate,
          },
        });
    }
  };

  const typeDisplay = () => {
    switch (type) {
      case EntryType.Hospital:
        return (
          <HospitalFormAdd
            setDate={setDischargeDate}
            setCriteria={setDischargeCriteria}
          />
        );
      case EntryType.HealthCheck:
        return <HealthCheckFormAdd setRating={setRating} />;
      case EntryType.OccupationalHealthcare:
        return (
          <OccHealthcareFormAdd
            setEmployerName={setEmployerName}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        );
    }
  };

  const addDiagnosis = () => {
    console.log(diagnosis);
    setDiagnoses(diagnoses.concat(diagnosis));
    setDiagnosis('');
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Entry Type</InputLabel>
        <Select
          className='TypeSelect'
          sx={{
            mb: '14px',
          }}
          label="Entry Type"
          fullWidth
          value={type}
          onChange={onTypeChange}>
          {typeOptions.map((option) => (
            <MenuItem
              className={option.label}
              key={option.label}
              value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <InputLabel>Date</InputLabel>
        <TextField
          className='DateInput'
          sx={{
            mb: '14px',
          }}
          type='date'
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          className='SpecInput'
          sx={{
            mb: '14px',
          }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          className='DescInput'
          sx={{
            mb: '14px',
          }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel>Diagnosis</InputLabel>
        <Select
          className='DiagSelect'
          sx={{
            mb: '14px',
          }}
          fullWidth
          value={diagnosis}
          onChange={({ target }) => setDiagnosis(target.value)}
          endAdornment={
            <Button
              className='DiagAdd'
              style={{
                float: 'right',
              }}
              onClick={addDiagnosis}
              variant="contained">
              Add
            </Button>
          }>
          {diagnosesList.map((v, k) => (
            <MenuItem
              id={`diagnosis-${k}`}
              key={v.code}
              value={v.code}>
              {v.name}
            </MenuItem>
          ))}
        </Select>
        <Grid>
          {diagnoses.length !== 0 ? (
            <Grid
              item
              sx={{
                padding: '10px',
                border: '1px solid silver',
                borderRadius: '5px',
                mb: '14px',
              }}>
              {diagnoses.map((v) => (
                <Grid
                  item
                  key={uuidv4()}
                  sx={{
                    fontStyle: 'italic',
                  }}>
                  {v}
                </Grid>
              ))}
            </Grid>
          ) : null}
        </Grid>

        {typeDisplay()}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              className='AddNewEntry'
              style={{
                float: 'right',
              }}
              type="submit"
              variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientForm;
