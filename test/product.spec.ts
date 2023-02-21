import request from 'supertest';
import app from '../src/app';

describe('🛍️ Product UNIT', () => {
  let token: string;
  // let productId: string;
  beforeAll(async () => {
    try {
      // login our buyer
      const loginResponse = await request(app).post('/api/v1/auth/login').send({
        email: 'seller@gmail.com',
        password: 'Password@123',
      });
      token = await loginResponse.body.data;
      //   get the product id of the first product in the database
      // productId = '4b35a4b0-53e8-48a4-97b0-9d3685d3197c';
    } catch (error) {
      if (error instanceof Error) {
        console.log(`🍎 Error in the cart beforeAll hook ${error.message}`);
      } else {
        console.log(`🍎 Error in the cart beforeAll hook ${error}`);
      }
    }
  });

  /*
   **********************************************
   *  🟩 Seller get all items *
   **********************************************
   */
  describe('GET  /api/v1/product/items', () => {
    it('should return 200 if user is seller and there no error', async () => {
      const res = await request(app)
        .get('/api/v1/product/items')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🛑 end of Seller get all items  *
   **********************************************
   */

  /*
   **********************************************
   *  🟩 Seller update a product *
   **********************************************
   */
  describe('PATCH  /api/v1/product/update/{productId}', () => {
    it('should return 200 if user is seller and there no error', async () => {
      const res = await request(app)
        .patch('/api/v1/product/update/4b35a4b0-53e8-48a4-97b0-9d3685d3197c')
        .send({
          name: '',
          category: '',
          description: '',
          stock: '',
          quantity: '',
          price: 800,
          images: '',
        })
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🛑 end of Seller update a product  *
   **********************************************
   */

  /*
   **********************************************
   *  🟩 Create a product *
   **********************************************
   */
  describe('POST /api/v1/product/', () => {
    // Seller create product
    // it('should return 201', async () => {
    //   const adminCredentials = {
    //     email: 'admin@gmail.com',
    //     password: 'Password@123',
    //   };
    //   const loginResponse = await request(app)
    //     .post('/api/v1/auth/login')
    //     .send(adminCredentials);
    //   const token = loginResponse.body.data;
    //   const res = await request(app)
    //     .post('/api/v1/product/')
    //     .set('Authorization', 'Bearer ' + token)
    //     .send({
    //       name: 'Test product',
    //       category: 'Tests',
    //       description: 'Testing jest testing',
    //       stock: 'Available',
    //       quantity: 10,
    //       price: 10,
    //       images: 'image',
    //     });
    //   expect(res.status).toEqual(201);
    // });

    // // Seller create Already existing product
    // it('should return 400', async () => {
    //   const adminCredentials = {
    //     email: 'admin@gmail.com',
    //     password: 'Password@123',
    //   };
    //   const loginResponse = await request(app)
    //     .post('/api/v1/auth/login')
    //     .send(adminCredentials);
    //   const token = loginResponse.body.data;
    //   const res = await request(app)
    //     .post('/api/v1/product/')
    //     .set('Authorization', 'Bearer ' + token)
    //     .send({
    //       name: 'Test product',
    //       category: 'Tests',
    //       description: 'Testing jest testing',
    //       stock: 'Available',
    //       quantity: 10,
    //       price: 10,
    //       images: 'image',
    //     });
    //   expect(res.status).toEqual(400);
    // });

    // Unauthorized user(buyer) create product
    it('should return 403', async () => {
      const adminCredentials = {
        email: 'buyer@gmail.com',
        password: 'Password@123',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(adminCredentials);
      token = loginResponse.body.data;
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
   * 🟩 Get all products or items *
   **********************************************
   */
  describe('GET /api/v1/product/all', () => {
    it('should return 200', async () => {
      const adminCredentials = {
        email: 'admin@gmail.com',
        password: 'Password!23',
      };

      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(adminCredentials);

      const token = loginResponse.body.data;

      const res = await request(app)
        .get('/api/v1/product/all')
        .set('Authorization', 'Bearer ' + token);
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
      const productName = 'IKIVUGUTO';
      const category = 'Ibifunyango';
      const minPrice = 100;
      const maxPrice = 400;
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
