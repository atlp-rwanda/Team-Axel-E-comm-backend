import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/database/models';

describe('🧑‍🤝‍🧑 USERS UNIT', () => {
  afterAll(async () => {
    await sequelize.truncate({ cascade: true }); // deletes all data from all tables
    await sequelize.close(); // closes the connection to the database
  });

  /*
   **********************************************
   *  🟩 get all users *
   **********************************************
   */
  describe('GET /api/v1/user/all', () => {
    it('should return 200 OK', async () => {
      const adminCredentials = {
        email: 'admin@gmail.com',
        password: 'Password@123',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(adminCredentials);
      const token = loginResponse.body.data;
      const res = await request(app)
        .get('/api/v1/user/all')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(200);
    });
  });
});
