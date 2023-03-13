import request from "supertest";
import app from "./../src/app";
import crypto from "node:crypto";

let jwt: string;
let _2FAcode: string;

jest.mock("../src/services/mail/sendEmailToken", () => {
  return (...args: unknown[]) => {
    console.log(...args);
  };
});

describe("two factor auth test", () => {
  const email = crypto.randomUUID() + "@gmail.com";
  const user = {
    email: email,
    password: "musliM123!",
    surname: "muslim",
    given_name: "uwi",
    role: "Seller",
  };

  const userCredintials = {
    email: email,
    password: "musliM123!",
  };

  beforeAll(async () => {
    const createUser = await request(app).post("/api/v1/user").send(user);
    await request(app).post("/api/v1/auth/login").send(userCredintials);
    const confirmationCode = createUser.body.data[0].confirmationCode;
    await request(app).get(`/api/v1/auth/confirm/${confirmationCode}`);
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send(userCredintials);

    jwt = res.body.data;
    console.log(res.body);
  });

  it("request 2fa code", async () => {
    const res = await request(app)
      .post("/api/v1/auth/2fa")
      .set("Authorization", "Bearer " + jwt);

    expect(res.status).toEqual(200);
    expect(res.body.data.token.length).toBe(6);
    expect(res.body).toHaveProperty("data");
    _2FAcode = res.body.data.token;
  });

  it("request 2fa code with bad jwt should fail", async () => {
    const res = await request(app)
      .post("/api/v1/auth/2fa")
      .set("Authorization", "Bearer abs437");

    expect(res.status).toEqual(401);
  });

  it("TOTP code should not be verified for not provided", async () => {
    const res = await await request(app)
      .post("/api/v1/auth/2fa/verify2FAToken")
      .set("Authorization", "Bearer " + jwt)
      .send({});
    expect(res.status).toEqual(500);
  });
  it("TOTP code should be verified", async () => {
    const res = await await request(app)
      .post("/api/v1/auth/2fa/verify2FAToken")
      .set("Authorization", "Bearer " + jwt)
      .send({ code: _2FAcode });
    expect(res.status).toEqual(200);
  });
});
