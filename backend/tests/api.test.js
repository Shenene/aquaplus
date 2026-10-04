import request from "supertest";

import app from "../app.js";

describe("AQUA+ API", () => {
  test("GET /api/health returns API health status", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body).toEqual({
      status: "ok",
      message: "AQUA+ API is running",
    });
  });

  test("GET /api/collection blocks unauthenticated users", async () => {
    await request(app).get("/api/collection").expect(401);
  });
});
