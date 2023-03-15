import app from "../src/app";
import request from "supertest";

describe("ℹ️🗽 Notification UNIT", () => {
  let sellerToken: string;
  let notificationId: string;

  beforeAll(async () => {
    try {
      //login a seller
      const loginResponse = await request(app).post("/api/v1/auth/login").send({
        email: "seller@gmail.com",
        password: "Password@123",
      });
      sellerToken = await loginResponse.body.data;
      notificationId = "01fd9c03-b8d5-4c5f-bd36-86889e09260b";
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
   *  🟩 Get all notifications *
   **********************************************
   */
  describe("GET /api/v1/notification/all", () => {
    // Seller get all notifications
    it("should return 200 after creating the product", async () => {
      const res = await request(app)
        .get("/api/v1/notification/all")
        .set("Authorization", "Bearer " + sellerToken);
      // productId = res.body.data[0].id;
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   *  🛑 Get all notifications *
   **********************************************
   */

  /*
   **********************************************
   *  🟩 Read a notification *
   **********************************************
   */
  describe("Delete /api/v1/notification/read/:id", () => {
    it("should return 200 after the notification's read by id", async () => {
      const res = await request(app)
        .delete(`/api/v1/notification/read/${notificationId}`)
        .set("Authorization", "Bearer " + sellerToken);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   *  🛑 Read a notification *
   **********************************************
   */

  /*
   **********************************************
   *  🟩 Read all notifications *
   **********************************************
   */
  describe("Delete /api/v1/notification/read/", () => {
    it("should return 200 after all notifications are read", async () => {
      const res = await request(app)
        .delete(`/api/v1/notification/read/`)
        .set("Authorization", "Bearer " + sellerToken);
      expect(res.status).toEqual(200);
    });
  });
  /*
   **********************************************
   *  🛑 Read a notification *
   **********************************************
   */
});
