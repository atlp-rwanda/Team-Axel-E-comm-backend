import request from "supertest";
import app from "../src/app";

describe("🧪 TEST UNIT", () => {
  describe("Simple test case", () => {
    it("Add two numbers", () => {
      expect(2 + 2).toBe(4);
    });
  });

  describe("Route test", () => {
    it("get any specified route", async () => {
      const res = await request(app).get("/");
      expect(res.status).toEqual(200);
    });
  });
});
