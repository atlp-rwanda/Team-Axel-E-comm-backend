import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/db/config';
import { Product, User } from '../src/models';

describe('WISHLIST FEATURES', () => {
  //   let userId: number;
  let productId: number;
  beforeAll(async () => {
    await User.create({
      surName: 'KANYOMBYA',
      givenName: 'Buyer',
      email: 'buyer@gmail.com',
      password: 'Password!23',
      status: 'Active',
      role: 'Buyer',
    });
    const product = await Product.create({
      name: 'Test product',
      category: 'Tests',
      description: 'Testing jest testing',
      stock: 'Available',
      quantity: 10,
      price: 10,
      images: 'image',
    });
    productId = product.dataValues.id;
  });
  afterAll(async () => {
    await sequelize.truncate({ cascade: true }); // deletes all data from all tables
    await sequelize.close(); // closes the connection to the database
  });
  /*

   **********************************************
   * POST / api / v1 / wishes /:productId  *
   **********************************************
   */

  describe('POST /api/v1/wishes/:productId', () => {
    it('adds a product to the user wishlist', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);
      const token = loginResponse.body.data;

      const response = await request(app)
        .post(`/api/v1/wishes/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        `🍏 Product with id ${productId} added to wishlist`
      );
    });

    it('returns 404 error if the product is not found', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);

      const token = loginResponse.body.data;

      const response = await request(app)
        .post(`/api/v1/wishes/100`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(`🍎 Product with id 100 not found`);
    });

    it('returns 400 error if the product is already in the wishlist', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);

      const token = loginResponse.body.data;

      const response = await request(app)
        .post(`/api/v1/wishes/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        `🍎 Product with id ${productId} is already in the wishlist`
      );
    });
  });

  /*
   **********************************************
   * GET /api/v1/wishes/ *
   **********************************************
   */

  describe('GET /api/v1/wishes/', () => {
    it('returns the user wishlist', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);

      const token = loginResponse.body.data;
      const response = await request(app)
        .get('/api/v1/wishes/')
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([
        { name: 'Test product', price: 10, image: 'image' },
      ]);
    });
  });
  /*
   **********************************************
   * 'DELETE /api/v1/wishes/:id'  *
   **********************************************
   */
  describe('DELETE /api/v1/wishes/:id', () => {
    it('deletes a product from the user wishlist', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);

      const token = loginResponse.body.data;
      const response = await request(app)
        .delete(`/api/v1/wishes/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.body.message).toBe(
        `product of Id :${productId} cleared succesfull`
      );
      expect(response.body.data).toBe(1);
    });

    it('returns 404 error if the wishlist item is not found', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);

      const token = loginResponse.body.data;
      const response = await request(app)
        .delete('/api/v1/wishes/100')
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.status).toBe(400);
      //   expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('product not availble');
    });
  });

  /*
   **********************************************
   * 'DELETE /api/v1/wishes/all'  *
   **********************************************
   */

  describe('DELETE /api/v1/wishes/all', () => {
    it('deletes all products in the user wishlist', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);

      const token = loginResponse.body.data;
      const response = await request(app)
        .delete('/api/v1/wishes/all')
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.status).toBe(201);
      expect(response.body.status).toBe(201);
      expect(response.body.message).toBe('wishlist cleared successfully!');
      //   expect(response.body.data).toBe(1);
    });
  });
});
