import request from "supertest";
import app from "../src/app";

describe("🛍️ Product UNIT", () => {
  let token: string;
  let buyerToken: string;
  let productId: string;

  beforeAll(async () => {
    try {
      //login a seller
      const loginResponse = await request(app).post("/api/v1/auth/login").send({
        email: "seller@gmail.com",
        password: "Password@123",
      });
      token = await loginResponse.body.data;
      //login a buyer
      const loginBuyerResponse = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "buyer@gmail.com",
          password: "Password@123",
        });
      buyerToken = await loginBuyerResponse.body.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(`🍎 Error logging in beforeAll hook ${error.message}`);
      } else {
        console.log(`🍎 Error logging in beforeAll hook`, error);
      }
    }
  });
  /*
   **********************************************
   *  🟩 Create a product *
   **********************************************
   */
  describe("POST /api/v1/product/", () => {
    // Seller create product
    it("should return 201 after creating the product", async () => {
      const res = await request(app)
        .post("/api/v1/product/")
        .set("Authorization", "Bearer " + token)
        .send({
          name: "Test product",
          category: "Tests",
          description: "Testing jest testing",
          stock: "Available",
          quantity: 10,
          price: 10,
          images: "https://picsum.photos/id/26/4209/2769",
          expiredAt: "2023-03-05T15:05:28.727Z",
        });
      productId = res.body.data[0].id;

      expect(res.status).toEqual(201);
    });

    // Seller create Already existing product
    it("should return 400 if the product already exists", async () => {
      const res = await request(app)
        .post("/api/v1/product/")
        .set("Authorization", "Bearer " + token)
        .send({
          name: "Product 1",
          category: "Category 1",
          description: "Description 1",
          stock: "Available",
          quantity: 10,
          price: 700,
          images: "https://picsum.photos/id/26/4209/2769",
          expiredAt: "2023-03-05T15:05:28.727Z",
        });
      expect(res.status).toEqual(400);
    });

    // Unauthorized user(buyer) create product
    it("should return 403 if the user is not a seller", async () => {
      const res = await request(app)
        .post("/api/v1/product/")
        .set("Authorization", "Bearer " + buyerToken)
        .send({
          name: "Test product Failure",
          category: "Tests Failure",
          description: "Testing jest testing Failure",
          stock: "Available",
          quantity: 10,
          price: 10,
          images: "https://picsum.photos/id/26/4209/2769",
          expiredAt: "2023-03-05T15:05:28.727Z",
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
  describe("GET /api/v1/product/available", () => {
    it("should return 200", async () => {
      const res = await request(app).get("/api/v1/product/available");
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
  describe("GET /api/v1/product/search", () => {
    it("should return 200", async () => {
      const productName = "Product 1";
      const category = "Category 1";
      const minPrice = 100;
      const maxPrice = 400;
      // search for this product by name, category, minPrice and maxPrice
      const res = await request(app).get(
        `/api/v1/product/search?name=${productName}&category=${category}&${minPrice}=0&maxPrice=${maxPrice}`,
      );
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🛑 end search products  *
   **********************************************
   */

  //   /*
  //    **********************************************
  //    * 🛑 END delete one product  *
  //    **********************************************
  //    */
  describe("Delete /api/v1/product/delete/:id", () => {
    it("it delete one product with its id", async () => {
      const adminCredentials = {
        email: "seller@gmail.com",
        password: "Password@123",
      };
      const loginResponse = await request(app)
        .post("/api/v1/auth/login")
        .send(adminCredentials);
      token = loginResponse.body.data;
      const res = await request(app)
        .delete(`/api/v1/product/delete/${productId}`)
        .set("Authorization", "Bearer " + token)
        .send();
      expect(res.status).toEqual(201);
      expect(res.body.message).toBe(`Product deleted successfully`);
    });

    it("when product is not available it should return 400", async () => {
      const adminCredentials = {
        email: "seller@gmail.com",
        password: "Password@123",
      };
      const loginResponse = await request(app)
        .post("/api/v1/auth/login")
        .send(adminCredentials);
      token = loginResponse.body.data;
      const res = await request(app)
        .delete(`/api/v1/product/delete/4b35a4b0-53e8-48a4-97b0-9d3685d3197d`)
        .set("Authorization", "Bearer " + token)
        .send();
      expect(res.status).toEqual(400);
      expect(res.body.message).toBe(`Unavailable product`);
    });

    it("when product ID is not in UUID format it should return 400", async () => {
      const adminCredentials = {
        email: "seller@gmail.com",
        password: "Password@123",
      };
      const loginResponse = await request(app)
        .post("/api/v1/auth/login")
        .send(adminCredentials);
      token = loginResponse.body.data;
      const res = await request(app)
        .delete(`/api/v1/product/delete/4b35a4b0`)
        .set("Authorization", "Bearer " + token)
        .send();
      expect(res.status).toEqual(400);
      expect(res.body.message).toBe(`Invalid UUID format`);
    });
    it("it shouldnot delete and return error status 401, when you are not logen in", async () => {
      const res = await request(app)
        .delete(`/api/v1/product/delete/4b35a4b0-53e8-48a4-97b0-9d3685d3197c`)
        .send();
      expect(res.status).toEqual(401);
      // expect(res.body.message).toBe(`You are not logged in`);
    });
  });
  //   /*
  //    **********************************************
  //    * 🛑 END delete one product  *
  //    **********************************************
  //    */
});
