import request from 'supertest';
import app from './../src/app';
import crypto from 'node:crypto';
jest.setTimeout(150000);
let jwt: string;
describe('Simple test case', () => {
  it('Add two numbers', () => {
    expect(2 + 2).toBe(4);
  });
});

describe('Route test', () => {
  it('get any specified route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
  });
});

describe('two factor auth test', () => {
  const email = crypto.randomUUID() + '@gmail.com';
  const user = {
    email: email,
    password: 'musliM123!',
    surName: 'muslim',
    givenName: 'uwi',
  };

  const userCredintials = {
    email: email,
    password: 'musliM123!',
  };

  let confirmationCode: string;
  it('create new user', async () => {
    const createUser = await request(app).post('/api/v1/user').send(user);
    confirmationCode = createUser.body.data[0].confirmationCode;
    expect(createUser.status).toEqual(201);
  });
  it('LOGIN user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send(userCredintials);

    expect(res.status).toEqual(401);
    expect(res.body.success).toEqual(false);
  });
  it('confirm user login', async () => {
    const res = await request(app).get(
      `/api/v1/auth/confirm/${confirmationCode}`
    );

    expect(res.status).toEqual(201);
  });
  it('LOGIN user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send(userCredintials);

    expect(res.status).toEqual(200);
    jwt = res.body.data;
  });

  let _2FAcode: string;
  it('request 2fa code', async () => {
    const res = await request(app)
      .post('/api/v1/auth/2fa')
      .set('Authorization', 'Bearer ' + jwt);
    expect(res.status).toEqual(200);
    expect(res.body.tokenData.code.length).toBe(6);
    expect(res.body).toHaveProperty('tokenData');
    _2FAcode = res.body.tokenData.code;
  });

  it('verify 2fa code', async () => {
    const res = await await request(app)
      .post('/api/v1/auth/2fa/verify2FAToken')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        code: _2FAcode,
      });
    expect(res.status).toEqual(200);
    expect(res.body.verified).toBe(true);
  });
});

describe('update password test', () => {
  it('password should be updated', async () => {
    const res = await request(app)
      .post('/api/v1/auth/updatepassword')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        currentPassword: 'musliM123!',
        newPassword: 'musliM123!',
        newPasswordConfirmation: 'musliM123!',
      });

    expect(res.status).toEqual(200);

    expect(res.body.success).toBe(true);
  });

  it('password should not be updated', async () => {
    const res = await request(app).post('/api/v1/auth/updatepassword').send({
      currentPassword: 'musliM123!',
      newPassword: 'musliM123!',
      newPasswordConfirmation: 'musliM123!',
    });

    expect(res.status).toEqual(401);
  });
});
