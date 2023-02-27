import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/database/models';
import Product from '../src/database/models/Product.model';
import User from '../src/database/models/User.model';
import { Role, Status, Stock } from '../src/interfaces';

describe('🛒 📦 CART UNIT', () => {
  let token: string;
  // login the seeded buyer before all the tests
  beforeAll(async () => {
    // login the seeded buyer
    const buyerCredentials = {
      email: 'buyer@gmail.com',
      password: 'Password@123',
    };
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send(buyerCredentials);
    token = loginResponse.body.data;
  });

  afterAll(async () => {
    await sequelize.truncate({ cascade: true }); // deletes all data from all tables
    await sequelize.close(); // closes the connection to the database
  });

  /*
   **********************************************
   *  🟩 Add item to a cart *
   **********************************************
   */
  // describe('POST /api/v1/cart/', () => {
  //   // Buyer add item to cart
  //   it('should return 201', async () => {
  //     // first get an available product
  //     const getAvailableProducts = await request(app).get(
  //       '/api/v1/product/available'
  //     );
  //     // get the id of the available product
  //     const productId = getAvailableProducts.body.data[0].id;
  //     // prepare a cart item to send to the cart endpoint
  //     const cartItem = {
  //       productId: Number(productId),
  //       quantity: 7,
  //     };
  //     // login the buyer
  //     const currentUser = {
  //       email: 'buyer@gmail.com',
  //       password: 'Password!23',
  //     };
  //     const loginResponse = await request(app)
  //       .post('/api/v1/auth/login')
  //       .send(currentUser);
  //     const token = loginResponse.body.data;
  //     //   send the cart item to the cart endpoint
  //     const res = await request(app)
  //       .post('/api/v1/cart/')
  //       .set('Authorization', 'Bearer ' + token)
  //       .send(cartItem);
  //     expect(res.status).toEqual(201);
  //   });
  // });
  /*
   **********************************************
   * 🛑 end add item to cart *
   **********************************************
   */

  /*
   **********************************************
   *  🟩 View cart *
   **********************************************
   */

  describe('GET /api/v1/cart/', () => {
    it('should return 200 OK', async () => {
      //   view the current user's cart
      const res = await request(app)
        .get('/api/v1/cart/')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🛑 end view cart *
   **********************************************
   */

  /*
   **********************************************
   *  🟩 Clear cart *
   **********************************************
   */

  describe('DELETE /api/v1/cart/', () => {
    it('should return 200 OK', async () => {
      //   clear the current user's cart
      const res = await request(app)
        .delete('/api/v1/cart/')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(201);
    });
  });
  /*
   **********************************************
   * 🛑 end clear cart *
   **********************************************
   */
});
