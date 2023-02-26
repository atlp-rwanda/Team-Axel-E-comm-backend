import request from 'supertest';
import app from '../src/app';
import { sequelize } from '../src/database/models';
import User, { Role, Status } from '../src/database/models/User.model';
import Product, {
  ProductAttributes,
  Stock,
} from '../src/database/models/Product.model';

jest.setTimeout(3000000);

describe('🛍️ Product UNIT', () => {
  let token: string;
  let currentProduct: ProductAttributes;

  beforeAll(async () => {
    try {
      // await all responses
      const [createSeller, createBuyer] = await Promise.allSettled([
        // create a dummy seller
        User.create({
          id: 'fba0b058-cede-42bf-ae19-3093ab2d5a16',
          surname: 'KANYOMBYA',
          given_name: 'Seller',
          email: 'seller@gmail.com',
          password: 'Password!23',
          status: Status.Active,
          role: Role.Seller,
        }),
        // create a dummy user
        User.create({
          surname: 'KANYOMBYA',
          given_name: 'Buyer',
          email: 'buyer2@gmail.com',
          password: 'Password!23',
          status: Status.Active,
          role: Role.Buyer,
        }),
      ]);
      // check if the create seller response is fulfilled
      if (createSeller.status === 'fulfilled') {
        // console.log('🍏 Seller created');
        // login the user
        const loginResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'seller@gmail.com',
            password: 'Password!23',
          });
        token = loginResponse.body.data;
        // create a dummy product
        const newProduct = await Product.create({
          name: 'IKIVUGUTO',
          category: 'Ibifunyango',
          description: 'Mujye munywa amata mwa ma dajye mwe.',
          stock: Stock.Available,
          quantity: 10,
          price: 400,
          images: 'image',
          sellerId: 'fba0b058-cede-42bf-ae19-3093ab2d5a16',
        });
        currentProduct = newProduct.dataValues;
        // currentProduct = await newProduct.
      } else {
        throw new Error('🍎 Seller creation failed');
      }

      // check if the create buyer response is fulfilled
      if (createBuyer.status === 'fulfilled') {
        // console.log('🍏 Buyer created');
      } else {
        throw new Error('🍎 Buyer creation failed');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(`🍎 Error in the product beforeAll hook: ${error.message}`);
      } else {
        console.log(`🍎 Error in beforeAll: ${error}`);
      }
    }
  });
  afterAll(async () => {
    try {
      await sequelize.truncate({ cascade: true }); // deletes all data from all tables
      await sequelize.close(); // closes the connection to the database
    } catch (error) {
      if (error instanceof Error) {
        console.log(`🍎 Error in the product afterAll: ${error.message}`);
      } else {
        console.log(`🍎 Error in product afterAll: ${error}`);
      }
    }
  });

  /*
   **********************************************
   *  🟩 Create a product *
   **********************************************
   */
  describe('POST /api/v1/product/', () => {
    // Seller create product
    it('should return 201 after creating the product', async () => {
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
    it('should return 400 if the product already exists', async () => {
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
    it('should return 403 if the user is not a seller', async () => {
      const buyerCredentials = {
        email: 'buyer2@gmail.com',
        password: 'Password!23',
      };
      const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(buyerCredentials);
      const buyerToken = loginResponse.body.data;
      const res = await request(app)
        .post('/api/v1/product/')
        .set('Authorization', 'Bearer ' + buyerToken)
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
  describe('GET /api/v1/product/available after retrieving all available products', () => {
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
    it('should return 200 after successfully returning the results of a search', async () => {
      const productName = currentProduct.name;
      const category = currentProduct.category;
      const minPrice = 0;
      const maxPrice = currentProduct.price;
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
