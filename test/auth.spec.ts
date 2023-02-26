import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/database/models';

jest.setTimeout(6000000);

describe(' 🦺 🛂 AUTH UNIT', () => {
  afterAll(async () => {
    await sequelize.truncate({ cascade: true }); // deletes all data from all tables
    await sequelize.close(); // closes the connection to the database
  });

  /*
   **********************************************
   * 🟩 confirm user registration *
   **********************************************
   */
  describe('GET /api/v1/auth/confirm/:confirmationCode', () => {
    // if the code is wrong
    it('should return 400 BAD REQUEST', async () => {
      const res = await request(app).get('/api/v1/auth/confirm/45');
      expect(res.status).toEqual(400);
    });

    // if the code is correct and user exists
    it('should return 200 OK', async () => {
      const newUser = await request(app).post('/api/v1/user').send({
        surname: 'KANYOMBYA',
        given_name: 'Irindi Sindizi',
        email: 'kanyombya2@gmail.com',
        password: 'Password!23',
      });
      const currentUserCode = newUser.body.data[0].confirmationCode;
      const res = await request(app).get(
        `/api/v1/auth/confirm/${currentUserCode}`
      );
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🛑 end confirm user registration *
   **********************************************
   */
});
