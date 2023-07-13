import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes, useMatch } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient, Diagnose } from './types';

import patientService from './services/patients';
import diagnosisService from './services/diagnoses';
import PatientListPage from './components/PatientListPage';
import PatientInfoPage from './components/PatientInfoPage';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  const match = useMatch('/:id');

  useEffect(() => {
    const fetchPatient = async () => {
      console.log('fetching patient...');
      const patient =
        match && typeof match.params.id === 'string'
          ? await patientService.getById(match.params.id)
          : null;

      if (!patient) {
        console.log('no patient selected.');
        return null;
      }
      console.log('patient found: ', patient.name);
      setPatient(patient);
    };

    void fetchPatient();
  }, [match]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnosesList = async () => {
      console.log('fetching diagnoses...');
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchPatientList();
    void fetchDiagnosesList();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography
          variant="h3"
          style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage
                patients={patients}
                setPatients={setPatients}
              />
            }
          />
          <Route
            path="/:id"
            element={
              <PatientInfoPage
                patient={patient}
                diagnoses={diagnoses}
              />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
