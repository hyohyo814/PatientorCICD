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
});
