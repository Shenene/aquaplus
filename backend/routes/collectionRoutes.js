import express from "express";

import { getCollection, removeExhibit, saveExhibit, updateNote } from "../controllers/collectionController.js";

import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// All collection routes require an authenticated user
router.use(requireAuth);

// Get the authenticated user's collection
router.get("/", getCollection);

// Save an exhibit
router.post("/", saveExhibit);

// Update a saved exhibit note
router.patch("/:exhibitId", updateNote);

// Remove an exhibit
router.delete("/:exhibitId", removeExhibit);

export default router;
