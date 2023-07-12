import { useState } from 'react';
import axios from 'axios';
import { Patient, Diagnose, Entry, EntryWithoutId } from '../../types';
import { Box, Typography, Button } from '@mui/material';
import { genderIcon } from '../IconTranslator';
import entryInfo from './TypeChecker';
import AddEntryModal from '../AddEntryModal';
import patientService from '../../services/patients';

interface Prop {
  patient: Patient | null | undefined;
  diagnoses: Diagnose[] | null;
}

export interface EntryInput {
  entry: Entry;
  diagnoses: Diagnose[] | null;
}

const PatientInfoPage = ({ patient, diagnoses }: Prop) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  if (!patient || patient === undefined) {
    return <div>Patient not found</div>;
  }

  if (!diagnoses || diagnoses === undefined) {
    return <div>Loading Diagnoses Database...</div>;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const patientTar = await patientService.addEntry(patient.id, values);
      console.log(patientTar);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <Box
        sx={{
          mt: 2,
        }}>
        <Typography
          variant="h4"
          mb="12px"
          fontWeight="400">
          {patient.name} {genderIcon(patient)}
        </Typography>
        <Typography variant="body1">ssn: {patient.ssn}</Typography>
        <Typography variant="body1">
          occupation: {patient.occupation}
        </Typography>
        <Typography
          variant="h6"
          mt="16px"
          fontWeight="350">
          entries
        </Typography>
      </Box>
      {patient.entries.map((entry) => (
        <Box
          key={entry.id}
          sx={{
            border: 1,
            borderRadius: 2,
            mt: 2,
          }}>
          {entryInfo(entry, diagnoses)}
        </Box>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        diagnoses={diagnoses}
      />
      <Button
        sx={{
          mt: '14px',
        }}
        variant="contained"
        onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientInfoPage;
