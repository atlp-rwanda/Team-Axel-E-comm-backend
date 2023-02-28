import request from "supertest";
import app from "../src/app";

describe("🛍️ Product UNIT", () => {
  let token: string;
  let buyerToken: string;

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
        });
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
  
  /*
   **********************************************
   *  🟩 Seller get all items *
   **********************************************
   */
  describe("GET  /api/v1/product/items", () => {
    it("should return 200 if user is seller and there no error", async () => {
      const res = await request(app)
        .get("/api/v1/product/items")
        .set("Authorization", "Bearer " + token);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   * 🛑 end of Seller get all items  *
   **********************************************
   */
});
