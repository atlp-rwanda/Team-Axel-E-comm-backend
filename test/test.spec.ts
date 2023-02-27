import request from 'supertest';
import app from './../src/app';
import crypto from 'node:crypto';

jest.setTimeout(150000);
let jwt: string;
let _2FAcode: string;

jest.mock('../src/services/mails/sendEmailConfirmationRequest', () => {
  return (...params: unknown[]) => {
    console.log(...params);
  };
});
jest.mock('../src/services/mails/sendEmailToken', () => {
  return (...args: unknown[]) => {
    console.log(...args);
  };
});
jest.mock('../src/services/mails/sendEmailConfirmationMessage', () => {
  return (...args: unknown[]) => {
    console.log(...args);
  };
});
describe('two factor auth test', () => {
  const email = crypto.randomUUID() + '@gmail.com';
  const user = {
    email: email,
    password: 'musliM123!',
    surname: 'muslim',
    given_name: 'uwi',
    role: 'Seller',
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

  it('request 2fa code', async () => {
    const res = await request(app)
      .post('/api/v1/auth/2fa')
      .set('Authorization', 'Bearer ' + jwt);

    expect(res.status).toEqual(200);
    expect(res.body.data.token.length).toBe(6);
    expect(res.body).toHaveProperty('data');
    _2FAcode = res.body.data.token;
  });

  it('request 2fa code with bad jwt should fail', async () => {
    const res = await request(app)
      .post('/api/v1/auth/2fa')
      .set('Authorization', 'Bearer abs437');

    expect(res.status).toEqual(401);
  });

  it('TOTP code should not be verified for not provided', async () => {
    const res = await await request(app)
      .post('/api/v1/auth/2fa/verify2FAToken')
      .set('Authorization', 'Bearer ' + jwt)
      .send({});
    expect(res.status).toEqual(500);
  });
  it('disable two factor authentication', async () => {
    const res = await request(app)
      .post('/api/v1/auth/2fa/disable')
      .set('Authorization', 'Bearer ' + jwt);

    expect(res.status).toEqual(200);
    expect(res.body.disabled).toBe(true);
  });

  it('verify 2fa code should fail for empty user secret', async () => {
    const res = await await request(app)
      .post('/api/v1/auth/2fa/verify2FAToken')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        code: _2FAcode,
      });
    expect(res.status).toEqual(500);
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
  it('password should not be updated for no password mismatch', async () => {
    const res = await request(app)
      .post('/api/v1/auth/updatepassword')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        currentPassword: 'musliM123!',
        newPassword: 'musliM123!',
        newPasswordConfirmation: 'musliM123!9',
      });

    expect(res.status).toEqual(500);
  });
  it('password should not be updated for no short password ', async () => {
    const res = await request(app)
      .post('/api/v1/auth/updatepassword')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        currentPassword: 'musl',
        newPassword: 'bbn',
        newPasswordConfirmation: 'musliM',
      });

    expect(res.status).toEqual(500);
  });
  it('password should not be updated for no short password ', async () => {
    const res = await request(app)
      .post('/api/v1/auth/updatepassword')
      .set('Authorization', 'Bearer ' + jwt)
      .send({
        currentPassword: 'mushhhhhhhhl',
        newPassword: 'bbnhhhhhhhhh',
        newPasswordConfirmation: 'bbnhhhhhhhhh',
      });

    expect(res.status).toEqual(500);
  });
  it('password should not be updated for no jwt provided', async () => {
    const res = await request(app).post('/api/v1/auth/updatepassword').send({
      currentPassword: 'musliM123!',
      newPassword: 'musliM123!',
      newPasswordConfirmation: 'musliM123!',
    });

    expect(res.status).toEqual(401);
  });
});
