import supertest from 'supertest';
import app from './app';

const api = supertest(app);

describe('Successful /POST requests', () => {
  it('add new entry', async () => {
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
        },
      })
      .expect(201);
  });
});

describe('Unsuccessful /POST requests', () => {
  it('reject invalid date entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        date: 20191121,
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
      .expect(400);
  });

  it('reject invalid specialist entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 332321,
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        }
      })
      .expect(400);
  });

  it('reject invalid employerName entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 123,
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description:
          'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        }
      })
      .expect(400);
  });

  it('reject invalid description entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        date: '2019-08-05',
        type: 'OccupationalHealthcare',
        specialist: 'MD House',
        employerName: 'HyPD',
        diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
        description: 1233,
        sickLeave: {
          startDate: '2019-08-05',
          endDate: '2019-08-28',
        }
      })
      .expect(400);
  });

  it('reject invalid sickLeave entry', async () => {
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
          startDate: 'Today',
          endDate: 'Tomorrow',
        }
      })
      .expect(400);
  });

});