const request = require("supertest");
const app = require("../server");

describe("GET /", () => {
  it("should return welcome message", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello, Welcome to the Home Page");
  });
});
