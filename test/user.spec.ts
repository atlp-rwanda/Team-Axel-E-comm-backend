import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/database/models';
import User, { Role, Status } from '../src/database/models/User.model';

jest.setTimeout(3000000);

describe('🧑‍🤝‍🧑 USERS UNIT', () => {
  let token: string;

  beforeAll(async () => {
    await User.create({
      surname: 'KANYOMBYA',
      given_name: 'Admin',
      email: 'admin@gmail.com',
      password: 'Password!23',
      status: Status.Active,
      role: Role.Admin,
    });
    // login the user
    const adminCredentials = {
      email: 'admin@gmail.com',
      password: 'Password!23',
    };
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send(adminCredentials);
    token = loginResponse.body.data;
  });

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
    it('should return 200 OK after getting all users', async () => {
      const res = await request(app)
        .get('/api/v1/user/all')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🛑 end get all users *
   **********************************************
   */

  /*
   **********************************************
   * 🟩 create a user / signup / registration *
   **********************************************
   */
  describe('POST /api/v1/user', () => {
    // if the user does not exist
    it('should return 201 CREATED if the user is created successfully', async () => {
      const res = await request(app).post('/api/v1/user').send({
        surname: 'KANYOMBYA',
        given_name: 'Irindi Sindizi',
        email: 'kanyombya@gmail.com',
        password: 'Password!23',
      });
      expect(res.status).toEqual(201);
    });

    // if the user already exists
    it('should return 400 BAD REQUEST if the user already exists', async () => {
      const res = await request(app).post('/api/v1/user').send({
        surname: 'KANYOMBYA',
        given_name: 'Irindi Sindizi',
        email: 'kanyombya@gmail.com',
        password: 'Password!23',
      });
      expect(res.status).toEqual(400);
    });
  });

  /*
   **********************************************
   *  🛑 end create a user / signup / registration *
   **********************************************
   */

  /*
   **********************************************
   * 🟩 get one user by id *
   **********************************************
   */
  describe('GET /api/v1/user/:id if the user exists', () => {
    // if the user exists
    it('should return 200 OK', async () => {
      const allUsers = await request(app)
        .get('/api/v1/user/all')
        .set('Authorization', 'Bearer ' + token);
      const currentUserId = allUsers.body.data[0].id;
      const res = await request(app).get(`/api/v1/user/${currentUserId}`);
      expect(res.status).toEqual(200);
    });

    // if the user does not exist
    it(`should return 404 NOT FOUND if the user does't exist`, async () => {
      const res = await request(app).get(
        `/api/v1/user/4f8bbd8b-98df-433e-b02a-99fd437ce5ad`
      );
      expect(res.status).toEqual(404);
    });
  });
  /*
   **********************************************
   * 🛑 end get one user by id *
   **********************************************
   */
});
