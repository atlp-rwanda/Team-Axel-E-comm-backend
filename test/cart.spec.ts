import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/database/models';
import User, { Role, Status } from '../src/database/models/User.model';
import Product, { Stock } from '../src/database/models/Product.model';

jest.setTimeout(3000000);

describe('🛒 📦 CART UNIT', () => {
  let token: string;
  let productId: string;

  beforeAll(async () => {
    try {
      // await all responses from the beforeAll hook
      const [createSeller, createBuyer] = await Promise.allSettled([
        // create a dummy seller
        User.create({
          id: '051c939c-e2f2-4d44-a10f-e56104e36ceb',
          surname: 'KANYOMBYA',
          given_name: 'Seller',
          email: 'seller@gmail.com',
          password: 'Password!23',
          status: Status.Active,
          role: Role.Seller,
        }),
        // create a dummy buyer
        User.create({
          surname: 'KANYOMBYA',
          given_name: 'Buyer',
          email: 'buyer@gmail.com',
          password: 'Password!23',
          status: Status.Active,
          role: Role.Buyer,
        }),
      ]);

      // check if the create seller response is fulfilled
      if (createSeller.status === 'fulfilled') {
        // console.log('🍏 Seller created');
        // create a dummy product
        await Product.create({
          id: 'f3e087d9-7ee9-4837-87ba-d7d43e2937a2',
          name: 'Test product',
          category: 'Tests',
          description: 'Testing jest testing',
          stock: Stock.Available,
          quantity: 10,
          price: 10,
          images: 'image',
          sellerId: '051c939c-e2f2-4d44-a10f-e56104e36ceb',
        }).then(() => {
          // console.log('🍏 Product created');
          productId = 'f3e087d9-7ee9-4837-87ba-d7d43e2937a2';
        });
      } else {
        throw new Error('🍎 Seller not created');
      }

      // check if the create buyer response is fulfilled
      if (createBuyer.status === 'fulfilled') {
        // console.log('🍏 Buyer created');
        // login the user
        await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'buyer@gmail.com',
            password: 'Password!23',
          })
          .then((res) => {
            // console.log('🍏 Buyer logged in');
            token = res.body.data;
          });
      } else {
        throw new Error('🍎 Buyer not created');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`🍎 Error in the cart beforeAll hook ${error.message}`);
      } else {
        console.log(`🍎 Error in the cart beforeAll hook ${error}`);
      }
    }
  });
  afterAll(async () => {
    try {
      await sequelize.truncate({ cascade: true }); // deletes all data from all tables
      await sequelize.close(); // closes the connection to the database
    } catch (error) {
      if (error instanceof Error) {
        console.log(`🍎 Error in the cart afterAll hook ${error.message}`);
      } else {
        console.log(error);
      }
    }
  });

  /*
   **********************************************
   *  🟩 Add item to a cart *
   **********************************************
   */
  describe('POST /api/v1/cart/add', () => {
    // Buyer add item to cart if the item doesn't already exist in the cart
    it(`should return 201 if the item is added to the cart`, async () => {
      // prepare a cart item to send to the cart endpoint
      const cartItem = {
        productId: productId,
        quantity: 7,
      };

      //   send the cart item to the cart endpoint
      const res = await request(app)
        .post('/api/v1/cart/add')
        .set('Authorization', 'Bearer ' + token)
        .send(cartItem);
      expect(res.status).toEqual(201);
    });
    // return 404 if the product doesn't exist
    it(`should return 404 if the product doesn't exist`, async () => {
      // prepare a cart item to send to the cart endpoint
      const cartItem = {
        productId: 'd2c11523-0b55-42e5-8683-6cae46e73b53',
        quantity: 7,
      };

      //   send the cart item to the cart endpoint
      const res = await request(app)
        .post('/api/v1/cart/add')
        .set('Authorization', 'Bearer ' + token)
        .send(cartItem);
      expect(res.status).toEqual(404);
    });

    // return 400 if the quantity is greater than the available quantity
    it(`should return 400 if the quantity is greater than the available quantity`, async () => {
      // prepare a cart item to send to the cart endpoint
      const cartItem = {
        productId: productId,
        quantity: 1000,
      };

      //   send the cart item to the cart endpoint
      const res = await request(app)
        .post('/api/v1/cart/add')
        .set('Authorization', 'Bearer ' + token)
        .send(cartItem);
      expect(res.status).toEqual(400);
    });

    // if the item already exists in the cart, update the quantity
    it('should return 201 update the quantity if the item already exists in the cart', async () => {
      // prepare a cart item to send to the cart endpoint
      const cartItem = {
        productId: productId,
        quantity: 7,
      };

      //   send the cart item to the cart endpoint
      const res = await request(app)
        .post('/api/v1/cart/add')
        .set('Authorization', 'Bearer ' + token)
        .send(cartItem);
      expect(res.status).toEqual(201);
    });

    // return 400 if the productId is not a valid uuid
    it('should return 400 if the productId is not a valid uuid', async () => {
      // prepare a cart item to send to the cart endpoint
      const cartItem = {
        productId: 'invalid',
        quantity: 1,
      };

      //   send the cart item to the cart endpoint
      const res = await request(app)
        .post('/api/v1/cart/add')
        .set('Authorization', 'Bearer ' + token)
        .send(cartItem);
      expect(res.status).toEqual(400);
    });
  });
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
    it('should return 200 OK after displaying entire cart', async () => {
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
    // remove one item from the cart
    it('should return 200 OK after removing one item from the cart', async () => {
      // prepare a cart item to send to the cart endpoint
      const cartItem = {
        productId: productId,
        quantity: 1,
      };
      // create a cart item
      await request(app)
        .post('/api/v1/cart/add')
        .send(cartItem)
        .set('Authorization', 'Bearer ' + token);
      // first get the entire cart
      const getCartResponse = await request(app)
        .get('/api/v1/cart/')
        .set('Authorization', 'Bearer ' + token);
      // get the cart item id
      const cartItemId = getCartResponse.body.data.items[0].id;
      //   remove the cart item from the cart
      const res = await request(app)
        .delete(`/api/v1/cart/remove/${cartItemId}`)
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(200);
    });

    // return 404 if the cart item does not exist
    it('should return 404 if the cart item does not exist', async () => {
      //   remove the cart item from the cart
      const res = await request(app)
        .delete(`/api/v1/cart/0`)
        .set('Authorization', 'Bearer ' + token);
      expect(res.status).toEqual(404);
    });

    //   clear the current user's cart
    it('should return 200 OK after clearing entire cart', async () => {
      //   clear the current user's cart
      const res = await request(app)
        .delete('/api/v1/cart/clear')
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
