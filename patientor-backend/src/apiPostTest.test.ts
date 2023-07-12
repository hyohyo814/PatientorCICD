import supertest from 'supertest';
import app from './app';

import patients from '../data/patients';

const api = supertest(app);

describe('successful /POST', () => {
  it('add new patient', async () => {
    const initLen = patients.length;
    await api
      .post('/api/patients')
      .send({
        name: 'Hyo Hyo',
        dateOfBirth: '2000-11-11',
        ssn: '123456-123X',
        gender: 'male',
        occupation: 'nonspecified',
      })
      .expect(201);

    const check = await api.get('/api/patients');
    expect(check.body).toHaveLength(initLen + 1);
  });

  it('add new HealthCheck entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        type: 'HealthCheck',
        specialist: 'Dr. Kirby',
        date: '2023-07-11',
        description: 'Entry testing',
        healthCheckRating: 3,
      })
      .expect(201);
  });

  it('add new Hospital entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      })
      .expect(201);
  });

  it('add new OccupationalHealthcare entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        }
      })
      .expect(201);
  });

});

describe('unsuccessful /POST', () => {
  it('reject invalid gender input', async () => {
    const initLen = patients.length;
    await api
      .post('/api/patients')
      .send({
        name: 'Hyo Hyo',
        dateOfBirth: '2000-11-11',
        ssn: '123456-123X',
        gender: 'unknown',
        occupation: 'nonspecified',
      })
      .expect(400);

    const check = await api.get('/api/patients');
    expect(check.body).toHaveLength(initLen);
  });

  it('reject invalid date input', async () => {
    const initLen = patients.length;
    await api
      .post('/api/patients')
      .send({
        name: 'Hyo Hyo',
        dateOfBirth: '1231212',
        ssn: '123456-123X',
        gender: 'male',
        occupation: 'nonspecified',
      })
      .expect(400);

    const check = await api.get('/api/patients');
    expect(check.body).toHaveLength(initLen);
  });

  it('reject invalid ssn input', async () => {
    const initLen = patients.length;
    await api
      .post('/api/patients')
      .send({
        name: 'Hyo Hyo',
        dateOfBirth: '2000-11-11',
        ssn: 'ABCDEF-GH11',
        gender: 'male',
        occupation: 'nonspecified',
      })
      .expect(400);

    const check = await api.get('/api/patients');
    expect(check.body).toHaveLength(initLen);
  });

  it('reject invalid occupation input', async () => {
    const initLen = patients.length;
    await api
      .post('/api/patients')
      .send({
        name: 'Hyo Hyo',
        dateOfBirth: '2000-11-11',
        ssn: '123456-123X',
        gender: 'unknown',
        occupation: 123,
      })
      .expect(400);

    const check = await api.get('/api/patients');
    expect(check.body).toHaveLength(initLen);
  });

  it('reject invalid type entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        type: 'NonSpecified',
        specialist: 'Dr. Kirby',
        date: '2023-07-11',
        description: 'Entry testing',
        healthCheckRating: 3,
      })
      .expect(400);
  });

});