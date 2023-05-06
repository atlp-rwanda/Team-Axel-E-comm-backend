import app from "../src/app";
import request from "supertest";

describe("PRODUCT RATING AND FEEDBACK UNIT", () => {
  let token: string;
  let productId: string;
  let Admintoken: string;
  let sellerToken: string;

  beforeAll(async () => {
    try {
      // login our buyer
      const loginResponse = await request(app).post("/api/v1/auth/login").send({
        email: "buyer@gmail.com",
        password: "Password@123",
      });
      token = await loginResponse.body.data;
      //login a seller
      const loginRespons = await request(app).post("/api/v1/auth/login").send({
        email: "seller@gmail.com",
        password: "Password@123",
      });
      sellerToken = await loginRespons.body.data;
      const res = await request(app)
        .post("/api/v1/product/")
        .set("Authorization", "Bearer " + sellerToken)
        .send({
          name: "Testing forreview",
          category: "Test",
          description: "Testing testing",
          stock: "Available",
          quantity: 10,
          price: 10,
          images: "https://picsum.photos/id/26/4209/2769",
        });
      productId = res.body.data[0].id;
      //   get the product id of the first product in the database
    } catch (error) {
      if (error instanceof Error) {
        console.log(`🍎 Error in the REVIEW beforeAll hook ${error.message}`);
      } else {
        console.log(`🍎 Error in the REVIEW beforeAll hook ${error}`);
      }
    }
  });
  /*
   **********************************************
   *  🟩 Add REVIEW *
   **********************************************
   */
  describe("POST /api/v1/productReview/:productId", () => {
    it("should add a review", async () => {
      const review = {
        rating: 2,
        feedback: "good",
      };
      const res = await request(app)
        .post(`/api/v1/productReview/${productId}`)
        .set("Authorization", "Bearer " + token)
        .send(review);
      expect(res.status).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.feedback).toBe(review.feedback);
    });
  });

  /*
   **********************************************
   *  🟩 get REVIEW *
   **********************************************
   */
  describe("GET /api/v1/productReview/get/:productId", () => {
    it(`should get a product review`, async () => {
      const res = await request(app)
        .get(`/api/v1/productReview/get/${productId}`)
        .set("Authorization", "Bearer " + token);

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          status: 200,
          success: true,
          data: expect.any(Array),
        }),
      );
    });
  });
  /*
   **********************************************
   *  🟩 edit REVIEW *
   **********************************************
   */
  describe("PUT /api/v1/productReview/productId", () => {
    it(`should  edit review`, async () => {
      const review = {
        feedback: "verrygood",
      };
      const res = await request(app)
        .put(`/api/v1/productReview/edit/${productId}`)
        .set("Authorization", "Bearer " + token)
        .send(review);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   *  🟩 delete user REVIEW *
   **********************************************
   */
  describe("DELETE /api/v1/productReview/delete/productId", () => {
    it(`should  delete one review`, async () => {
      const res = await request(app)
        .delete(`/api/v1/productReview/delete/${productId}`)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   *  🟩 delete all REVIEW *
   **********************************************
   */
  describe("DELETE /api/v1/productReview/delete/allproductId", () => {
    it(`should  delete all review`, async () => {
      // login the admin
      const currentUser = {
        email: "admin@gmail.com",
        password: "Password@123",
      };
      const loginResponse = await request(app)
        .post("/api/v1/auth/login")
        .send(currentUser);
      Admintoken = loginResponse.body.data;
      const res = await request(app)
        .delete(`/api/v1/productReview/delete/all/${productId}`)
        .set("Authorization", "Bearer " + Admintoken);
      expect(res.status).toEqual(200);
    });
    it(`should not delete all review if you are not admin`, async () => {
      // login our buyer
      const loginResponse = await request(app).post("/api/v1/auth/login").send({
        email: "buyer@gmail.com",
        password: "Password@123",
      });
      token = await loginResponse.body.data;
      const res = await request(app)
        .delete(`/api/v1/productReview/delete/all/${productId}`)
        .set("Authorization", "Bearer " + token);
      expect(res.status).toEqual(403);
    });
  });
});
