import request from "supertest";
import app from "../src/app";
import { sequelize } from "../src/database/models";

jest.setTimeout(150000);

describe("🧑‍🤝‍🧑 USERS UNIT", () => {
  let token: string;
  beforeAll(async () => {
    // login the admin
    const adminCredentials = {
      email: "admin@gmail.com",
      password: "Password@123",
    };
    const loginResponse = await request(app)
      .post("/api/v1/auth/login")
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
  describe("GET /api/v1/user/all", () => {
    it("should return 200 OK", async () => {
      const res = await request(app)
        .get("/api/v1/user/all")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🟩 update user  *
   **********************************************
   */
  describe("PATCH /api/v1/user/update/{id}", () => {
    const id = "a6adf4ad-dac5-4ac6-9419-cd885de58eb0";

    it("should return 200 OK and the updated user data", async () => {
      const updatedUserData = {
        surname: "New Surname",
        province: "New Province",
        district: "New District",
        sector: "New Sector",
        cell: "New Cell",
        street: "New Street",
      };
      const res = await request(app)
        .patch(`/api/v1/user/update/${id}`)
        .set("Authorization", "Bearer " + token)
        .send(updatedUserData);
      expect(res.status).toEqual(200);
      expect(res.body.success).toEqual(true);
    });
    it("should return 500 Internal Server Error for invalid user ID", async () => {
      const updatedUserData = {
        surname: "New Surname",
        given_name: "New Given Name",
        province: "New Province",
      };
      const res = await request(app)
        .patch(`/api/v1/user/update/invalid-id`)
        .set("Authorization", "Bearer " + token)
        .send(updatedUserData);
      expect(res.status).toEqual(500);
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
  // describe('POST /api/v1/user', () => {
  //   // if the user does not exist
  //   it('should return 201 CREATED', async () => {
  //     const res = await request(app).post('/api/v1/user').send({
  //       surName: 'KANYOMBYA',
  //       givenName: 'Irindi Sindizi',
  //       email: 'kanyombya@gmail.com',
  //       password: 'Password!23',
  //     });
  //     expect(res.status).toEqual(201);
  //   });

  //   // if the user already exists
  //   it('should return 400 BAD REQUEST', async () => {
  //     const res = await request(app).post('/api/v1/user').send({
  //       surName: 'KANYOMBYA',
  //       givenName: 'Irindi Sindizi',
  //       email: 'kanyombya@gmail.com',
  //       password: 'Password!23',
  //     });
  //     expect(res.status).toEqual(400);
  //   });
  // });

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
  // describe('GET /api/v1/user/:id', () => {
  //   // if the user exists
  //   it('should return 200 OK', async () => {
  //     const adminCredentials = {
  //       email: 'admin@gmail.com',
  //       password: 'Password!23',
  //     };
  //     const loginResponse = await request(app)
  //       .post('/api/v1/auth/login')
  //       .send(adminCredentials);
  //     const token = loginResponse.body.data;
  //     const allUsers = await request(app)
  //       .get('/api/v1/user/all')
  //       .set('Authorization', 'Bearer ' + token);
  //     const currentUserId = allUsers.body.data[0].id;
  //     const res = await request(app).get(`/api/v1/user/${currentUserId}`);
  //     expect(res.status).toEqual(200);
  //   });

  //   // if the user does not exist
  //   it('should return 404 NOT FOUND', async () => {
  //     const res = await request(app).get('/api/v1/user/0');
  //     expect(res.status).toEqual(404);
  //   });
  // });
  /*
   **********************************************
   * 🛑 end get one user by id *
   **********************************************
   */
});
