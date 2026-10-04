import { describe, expect, jest, test } from "@jest/globals";

import { removeExhibit, saveExhibit, updateNote } from "../controllers/collectionController.js";

function createMockResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
}

describe("Collection controller validation", () => {
  test("saveExhibit rejects an invalid exhibit ID", async () => {
    const req = {
      session: {
        userId: 1,
      },
      body: {
        exhibitId: 0,
        note: "Test note",
      },
    };

    const res = createMockResponse();

    await saveExhibit(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "A valid exhibit ID is required.",
    });
  });

  test("saveExhibit rejects notes longer than 200 characters", async () => {
    const req = {
      session: {
        userId: 1,
      },
      body: {
        exhibitId: 1,
        note: "a".repeat(201),
      },
    };

    const res = createMockResponse();

    await saveExhibit(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "Note must be 200 characters or fewer.",
    });
  });

  test("updateNote rejects an invalid exhibit ID", async () => {
    const req = {
      session: {
        userId: 1,
      },
      params: {
        exhibitId: "invalid",
      },
      body: {
        note: "Updated note",
      },
    };

    const res = createMockResponse();

    await updateNote(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "A valid exhibit ID is required.",
    });
  });

  test("removeExhibit rejects an invalid exhibit ID", async () => {
    const req = {
      session: {
        userId: 1,
      },
      params: {
        exhibitId: "-1",
      },
    };

    const res = createMockResponse();

    await removeExhibit(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      message: "A valid exhibit ID is required.",
    });
  });
});
