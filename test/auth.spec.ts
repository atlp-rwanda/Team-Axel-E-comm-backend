import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/database/models';

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
  });
  /*
   **********************************************
   * 🛑 end confirm user registration *
   **********************************************
   */
});
