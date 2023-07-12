import supertest from 'supertest';
import app from './app';

import patients from '../data/patients';
import diagnoses from '../data/diagnoses';

const api = supertest(app);

describe('/GET', () => {
  it('get diagnoses', async () => {
    await api
      .get('/api/diagnoses')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('get diagnoses list', async () => {
    const res = await api.get('/api/diagnoses');
    expect(res.body).toHaveLength(diagnoses.length);
  });

  
  it('get patients', async () => {
    await api
    .get('/api/patients')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  });
  
  it('get patients list', async () => {
    const res = await api.get('/api/patients');
    expect(res.body).toHaveLength(patients.length);
  });

  it('get patient by id', async () => {
    await api
    .get('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  });

  it('confirm patient info', async () => {
    const res = await api.get('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667');
    expect(res.body).toEqual({
      id: 'd2773822-f723-11e9-8f0b-362b9e155667',
      name: 'Dana Scully',
      dateOfBirth: '1974-01-05',
      ssn: '050174-432N',
      gender: 'female',
      occupation: 'Forensic Pathologist',
      entries: [
        {
          id: 'b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da',
          date: '2019-10-20',
          specialist: 'MD House',
          type: 'HealthCheck',
          description: 'Yearly control visit. Cholesterol levels back to normal.',
          healthCheckRating: 0,
        },
        {
          id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
          date: '2019-09-10',
          specialist: 'MD House',
          type: 'OccupationalHealthcare',
          employerName: 'FBI',
          description: 'Prescriptions renewed.',
        },
        {
          id: '37be178f-a432-4ba4-aac2-f86810e36a15',
          date: '2018-10-05',
          specialist: 'MD House',
          type: 'HealthCheck',
          description:
            'Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.',
          healthCheckRating: 1,
        },
      ],
    });
  });

});
