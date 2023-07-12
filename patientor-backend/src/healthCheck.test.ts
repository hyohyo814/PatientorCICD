import supertest from 'supertest';
import app from './app';

const api = supertest(app);

describe('Successful /POST requests', () => {
  it('add new entry', async () => {
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
});

describe('Unsuccessful /POST requests', () => {
  it('reject invalid date entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        type: 'HealthCheck',
        specialist: 'Dr. Kirby',
        date: 'ABCD-11-23',
        description: 'Entry testing',
        healthCheckRating: 3,
      })
      .expect(400);
  });

  it('reject invalid specialist entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        type: 'HealthCheck',
        specialist: 769769,
        date: '2023-11-23',
        description: 'Entry testing',
        healthCheckRating: 3,
      })
      .expect(400);
  });

  it('reject invalid description entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        type: 'HealthCheck',
        specialist: 'Dr. Kirby',
        date: '2023-11-23',
        description: 1232334,
        healthCheckRating: 3,
      })
      .expect(400);
  });

});