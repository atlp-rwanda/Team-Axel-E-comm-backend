import request from "supertest";
import app from "./../src/app";
import crypto from "node:crypto";

let jwt: string;
const email = crypto.randomUUID() + "@gmail.com";

describe("update password test", () => {
  beforeAll(async () => {
    const user = {
      email: email,
      password: "musliM123!",
      surname: "muslim",
      given_name: "uwi",
    };

    const userCredintials = {
      email: email,
      password: "musliM123!",
    };

    const createUser = await request(app).post("/api/v1/user").send(user);
    const confirmationCode = createUser.body.data[0].confirmationCode;

    await request(app).post("/api/v1/auth/login").send(userCredintials);
    await request(app).get(`/api/v1/auth/confirm/${confirmationCode}`);
    const resp = await request(app)
      .post("/api/v1/auth/login")
      .send(userCredintials);
    jwt = resp.body.data;
  });
  it("password should be updated", async () => {
    const res = await request(app)
      .post("/api/v1/auth/updatepassword")
      .set("Authorization", "Bearer " + jwt)
      .send({
        currentPassword: "musliM123!",
        newPassword: "musliM123!",
        newPasswordConfirmation: "musliM123!",
      });

    expect(res.status).toEqual(200);

    expect(res.body.success).toBe(true);
  });
  it("password should not be updated for no password mismatch", async () => {
    const res = await request(app)
      .post("/api/v1/auth/updatepassword")
      .set("Authorization", "Bearer " + jwt)
      .send({
        currentPassword: "musliM123!",
        newPassword: "musliM123!",
        newPasswordConfirmation: "musliM123!9",
      });

    expect(res.status).toEqual(500);
  });
  it("password should not be updated for short passwords ", async () => {
    const res = await request(app)
      .post("/api/v1/auth/updatepassword")
      .set("Authorization", "Bearer " + jwt)
      .send({
        currentPassword: "musl",
        newPassword: "bbn",
        newPasswordConfirmation: "musliM",
      });

    expect(res.status).toEqual(405);
  });
  it("password should not be updated for wrong password ", async () => {
    const res = await request(app)
      .post("/api/v1/auth/updatepassword")
      .set("Authorization", "Bearer " + jwt)
      .send({
        currentPassword: "mushhhhhhhhl",
        newPassword: "bbnhhhhhhhhh",
        newPasswordConfirmation: "bbnhhhhhhhhh",
      });

    expect(res.status).toEqual(405);
  });
  it("password should not be updated for no jwt provided", async () => {
    const res = await request(app).post("/api/v1/auth/updatepassword").send({
      currentPassword: "musliM123!",
      newPassword: "musliM123!",
      newPasswordConfirmation: "musliM123!",
    });

    expect(res.status).toEqual(401);
  });
});
