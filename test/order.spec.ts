import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/db/config';
import { Product, User } from '../src/models';
jest.setTimeout(1500000);

describe('🛒 📦 CART UNIT', () => {
  beforeAll(async () => {
    // create a dummy user
    await User.create({
      surName: 'KANYOMBYA',
      givenName: 'Buyer',
      email: 'buyer@gmail.com',
      password: 'Password!23',
      status: 'Active',
      role: 'Buyer',
    });
    await User.create({
      surName: 'Admin',
      givenName: 'Admini',
      email: 'admin@gmail.com',
      password: 'Password!23',
      status: 'Active',
      role: 'Admin',
    });
    // create a dummy product
    await Product.create({
      name: 'Test product',
      category: 'Tests',
      description: 'Testing jest testing',
      stock: 'Available',
      quantity: 10,
      price: 10,
      images: 'image',
    });
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
  describe('POST /api/v1/cart/', () => {
    // Buyer add item to cart
    it('should return 201', async () => {
      const getAvailableProducts = await request(app).get(
        '/api/v1/product/available'
      );
      const productId = getAvailableProducts.body.data[0].id;
      const cartItem = {
        productId: Number(productId),
        quantity: 7,
      };
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);
      const token = loginResponse.body.data;
      //   send the cart item to the cart endpoint
      const res = await request(app)
        .post('/api/v1/cart/')
        .set('Authorization', 'Bearer ' + token)
        .send(cartItem);
      expect(res.status).toEqual(201);
    });
  });

  describe('POST /api/v1/order/', () => {
    // Buyer creates an order
    it('should return 201', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);
      const token = loginResponse.body.data;
      // create the order
      const res = await request(app)
        .post('/api/v1/order/')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('Order created');
    });
  });

  /**geting order */
  describe('get /api/v1/order/all', () => {
    // Buyer creates an order
    it('should get all orders', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);
      const token = loginResponse.body.data;
      // create the order
      const res = await request(app)
        .get('/api/v1/order/all')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(200);
      // orderId=   res.body.data[0].id
    });
  });

  /*
   **********************************************
   *  🟩 should get order status /api/v1/order/status/:orderId *
   **********************************************
   */
  describe('GET /api/v1/order/status/:orderId', () => {
    const orderId = 1;
    // Buyer gets order status
    it('should return 200', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);
      const token = loginResponse.body.data;

      // create the order
      await request(app)
        .post('/api/v1/order/')
        .set('Authorization', 'Bearer ' + token);

      // get order status
      const res = await request(app)
        .get(`/api/v1/order/status/${orderId}`)
        .set('Authorization', 'Bearer ' + token);

      expect(res.body).toHaveProperty('currentStatus');
    });
  });

  /*
   **********************************************
   *  🟩 admin should update order status /api/v1/order/status/:orderId *
   **********************************************
   */
  //     describe('PUT /api/v1/order/status/:orderId', () => {
  //         let orderId = 1;
  //     // Admin updates order status
  //     it('should return 200', async () => {
  //       // login the admin
  //       const currentUser = {
  //         email: 'admin@gmail.com',
  //         password: 'Password!23',
  //       };
  //       const loginResponse = await request(app)
  //         .post('/api/v1/auth/login')
  //         .send(currentUser);
  //       const token = loginResponse.body.data;

  //       // update order status
  //       const updatedStatus = 'shipped';
  //       const res = await request(app)
  //         .put(`/api/v1/order/status/${orderId}`)
  //         .set('Authorization', 'Bearer ' + token)
  //         .send({ status: updatedStatus });

  //       expect(res.body.message).toEqual('Order status updated');
  //     });
  //   });

  describe('delete /api/v1/order/alll', () => {
    it('should delete all orders', async () => {
      // login the buyer
      const currentUser = {
        email: 'buyer@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(currentUser);
      const token = loginResponse.body.data;
      // create the order
      const res = await request(app)
        .delete('/api/v1/order/alll')
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(201);
      expect(res.body.message).toEqual('All Order cancered successfully!');
    });
  });
});
