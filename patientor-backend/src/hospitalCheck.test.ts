import supertest from 'supertest';
import app from './app';

const api = supertest(app);

describe('Successful /POST requests', () => {
  it('add new entry', async () => {
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
});

describe('Unsuccessful /POST requests', () => {
  it('reject invalid date entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        date: 'ABCD-01-02',
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
      .expect(400);
  });

  it('reject invalid specialist entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 16237,
        diagnosisCodes: ['S62.5'],
        description:
          "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      })
      .expect(400);
  });

  it('reject invalid description entry', async () => {
    await api
      .post('/api/patients/d2773822-f723-11e9-8f0b-362b9e155667/entries')
      .send({
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S62.5'],
        description: 123123,
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      })
      .expect(400);
  });

  it('reject invalid discharge entry', async () => {
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
          date: 'ABCDA-01-16',
          criteria: 'Thumb has healed.',
        },
      })
      .expect(400);
  });

});