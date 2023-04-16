import request from "supertest";
import app from "../src/app";

describe("🍎🍎WISHLIST FEATURES", () => {
  const productId = "4b35a4b0-53e8-48a4-97b0-9d3685d3197c";
  let buyerToken: string;

  beforeAll(async () => {
    try {
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
   * POST / api / v1 / wishes /:productId  *
   **********************************************
   */

  describe("POST /api/v1/wishes/:productId", () => {
    it("adds a product to the user wishlist", async () => {
      const response = await request(app)
        .post(`/api/v1/wishes/${productId}`)
        .set("Authorization", `Bearer ${buyerToken}`)
        .send();
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(`Product added to wishlist`);
    });

    it("returns 400 error if the product is not found", async () => {
      const response = await request(app)
        .post(`/api/v1/wishes/4b35a4b0-53e8-48a4-97b0-9d3685d3197d`)
        .set("Authorization", `Bearer ${buyerToken}`)
        .send();
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe(
        `🍎 Product with id 4b35a4b0-53e8-48a4-97b0-9d3685d3197d not found`,
      );
    });

    it("returns 400 error if the product is already in the wishlist", async () => {
      const response = await request(app)
        .post(`/api/v1/wishes/${productId}`)
        .set("Authorization", `Bearer ${buyerToken}`)
        .send();
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe(
        `🍎 Product with id ${productId} is already in the wishlist`,
      );
    });

    it("returns 401 error if the user is not logged in", async () => {
      const response = await request(app)
        .post(`/api/v1/wishes/${productId}`)
        .send();
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Unauthorized");
    });
  });

  /*
   **********************************************
   * GET /api/v1/wishes/ *
   **********************************************
   */

  describe("GET /api/v1/wishes/", () => {
    it("returns the user wishlist", async () => {
      const response = await request(app)
        .get("/api/v1/wishes/")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send();
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      if (response.body.data.length === 0) {
        expect(response.body.data).toEqual([]);
      } else {
        expect(response.body.data).toEqual([
          {
            image: "https://picsum.photos/id/26/4209/2769",
            name: "Product 1",
            price: 700,
          },
        ]);
      }
    });
  });
  /*
   **********************************************
   * 'DELETE /api/v1/wishes/:id'  *
   **********************************************
   */
  describe("DELETE /api/v1/wishes/:id", () => {
    it("deletes a product from the user wishlist", async () => {
      const response = await request(app)
        .delete(`/api/v1/wishes/${productId}`)
        .set("Authorization", `Bearer ${buyerToken}`)
        .send();
      expect(response.body.message).toBe(`deleted successfully`);
      expect(response.body.data).toBe(1);
    });

    it("returns 400 error if the wishlist item is not found", async () => {
      const response = await request(app)
        .delete("/api/v1/wishes/4b35a4b0-53e8-48a4-97b0-9d3685d3197d")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send();
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(
        `🍎 Product with id 4b35a4b0-53e8-48a4-97b0-9d3685d3197d not found in wishlist`,
      );
    });
  });

  /*
   **********************************************
   * 'DELETE /api/v1/wishes/all'  *
   **********************************************
   */

  describe("DELETE /api/v1/wishes/all", () => {
    it("deletes all products in the user wishlist", async () => {
      const response = await request(app)
        .delete("/api/v1/wishes/all")
        .set("Authorization", `Bearer ${buyerToken}`)
        .send();
      expect(response.body.status).toBe(200);
      expect(response.body.message).toBe("Wishlist cleared successfully");
    });
  });
});
