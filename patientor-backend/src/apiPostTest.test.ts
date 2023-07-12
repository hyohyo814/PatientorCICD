import supertest from 'supertest';
import app from './app';

import patients from '../data/patients';

const api = supertest(app);

describe('successful /POST', () => {
  it('add new patient with proper entry', async () => {
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
});