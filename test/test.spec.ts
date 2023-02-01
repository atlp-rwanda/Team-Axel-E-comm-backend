import request from "supertest";
import app from "./../src/app";

 describe("Simple test case", () => {
  it("Add two numbers", () => {
    expect(2 + 2).toBe(4);
  });
});

describe("Route test", () => {
  it("get any specified route", async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ 
    status: 200,
    success: true,
    message: `Welcome to team Axel's API! Endpoints available at http://localhost:8080/api/v1 + whatever endpoint you want to hit`,
    });
  });
});