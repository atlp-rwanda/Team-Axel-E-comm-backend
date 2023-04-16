import { sequelize } from "../src/database/models";

describe("setupTests", () => {
  test("should pass", () => {
    expect(true).toBeTruthy();
  });
});

afterAll(async () => {
  await sequelize.truncate({ cascade: true }); // deletes all data from all tables
  await sequelize.close(); // closes the connection to the database
});
