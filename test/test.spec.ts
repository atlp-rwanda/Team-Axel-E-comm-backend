import request from 'supertest';
import app from './../src/app';

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
  let _2FAcode: string;
  it('request 2fa code', async () => {
    const res = await request(app).post('/api/v1/auth/2fa');
    expect(res.status).toEqual(200);
    expect(res.body.tokenData.code.length).toBe(6);
    expect(res.body).toHaveProperty('tokenData');
    _2FAcode = res.body.tokenData.code;
  });

  it('verify 2fa code', async () => {
    const res = await await request(app)
      .post('/api/v1/auth/2fa/verify2FAToken')
      .send({
        code: _2FAcode,
      });
    expect(res.status).toEqual(200);
    expect(res.body.verified).toBe(true);
  });
});
