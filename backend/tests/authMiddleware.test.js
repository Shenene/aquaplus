import { describe, expect, jest, test } from "@jest/globals";

import { requireAuth } from "../middleware/authMiddleware.js";

describe("requireAuth middleware", () => {
  test("returns 401 when the user is not authenticated", () => {
    const req = {
      session: {},
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);

    expect(res.json).toHaveBeenCalledWith({
      message: "Not authenticated.",
    });

    expect(next).not.toHaveBeenCalled();
  });

  test("calls next when the user is authenticated", () => {
    const req = {
      session: {
        userId: 1,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    requireAuth(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
