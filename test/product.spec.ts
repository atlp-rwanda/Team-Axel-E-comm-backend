import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/db/config';
import { Product, User } from '../src/models';

describe('🛍️ Product UNIT', () => {
  beforeAll(async () => {
    await User.create({
      surName: 'KANYOMBYA',
      givenName: 'Admin',
      email: 'admin@gmail.com',
      password: 'Password!23',
      status: 'Active',
      role: 'Seller',
    });
    await User.create({
      surName: 'KANYOMBYA',
      givenName: 'Buyer',
      email: 'buyer@gmail.com',
      password: 'Password!23',
      status: 'Active',
      role: 'Buyer',
    });
    // create a dummy product
    await Product.create({
      name: 'IKIVUGUTO',
      category: 'Ibifunyango',
      description: 'Mujye munywa amata mwa ma dajye mwe.',
      stock: 'Available',
      quantity: 10,
      price: 400,
      images: 'image',
    });
  });
  afterAll(async () => {
    await sequelize.truncate({ cascade: true }); // deletes all data from all tables
    await sequelize.close(); // closes the connection to the database
  });

  /*
   **********************************************
   *  🟩 Create a product *
   **********************************************
   */
  describe('POST /api/v1/product/', () => {
    // Seller create product
    it('should return 201', async () => {
      const adminCredentials = {
        email: 'admin@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(adminCredentials);
      const token = loginResponse.body.data;
      const res = await request(app)
        .post('/api/v1/product/')
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: 'Test product',
          category: 'Tests',
          description: 'Testing jest testing',
          stock: 'Available',
          quantity: 10,
          price: 10,
          images: 'image',
        });
      expect(res.status).toEqual(201);
    });

    // Seller create Already existing product
    it('should return 400', async () => {
      const adminCredentials = {
        email: 'admin@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(adminCredentials);
      const token = loginResponse.body.data;
      const res = await request(app)
        .post('/api/v1/product/')
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: 'Test product',
          category: 'Tests',
          description: 'Testing jest testing',
          stock: 'Available',
          quantity: 10,
          price: 10,
          images: 'image',
        });
      expect(res.status).toEqual(400);
    });

    // Unauthorized user(buyer) create product
    it('should return 403', async () => {
      const adminCredentials = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(adminCredentials);
      const token = loginResponse.body.data;
      const res = await request(app)
        .post('/api/v1/product/')
        .set('Authorization', 'Bearer ' + token)
        .send({
          name: 'Test product Failure',
          category: 'Tests Failure',
          description: 'Testing jest testing Failure',
          stock: 'Available',
          quantity: 10,
          price: 10,
          images: 'image',
        });
      expect(res.status).toEqual(403);
    });
  });
  /*
   **********************************************
   * 🛑 end get all users *
   **********************************************
   */

  /*
   **********************************************
   * 🟩 Get only available products *
   **********************************************
   */
  describe('GET /api/v1/product/available', () => {
    it('should return 200', async () => {
      const res = await request(app).get('/api/v1/product/available');
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🛑 end get only available products  *
   **********************************************
   */

  /*
   **********************************************
   * 🟩 Search product *
   **********************************************
   */
  describe('GET /api/v1/product/search', () => {
    it('should return 200', async () => {
      const availableProduct = await request(app).get(
        '/api/v1/product/available'
      );
      const productName = availableProduct.body.data[0].name;
      const category = availableProduct.body.data[0].category;
      const minPrice = 0;
      const maxPrice = availableProduct.body.data[0].price;
      // search for this product by name, category, minPrice and maxPrice
      const res = await request(app).get(
        `/api/v1/product/search?name=${productName}&category=${category}&${minPrice}=0&maxPrice=${maxPrice}`
      );
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🛑 end search products  *
   **********************************************
   */
});
