import express from "express";
import { getExhibits, getExhibitBySlug } from "../controllers/exhibitController.js";

const router = express.Router();

// GET all public exhibits
router.get("/", getExhibits);

// GET one public exhibit by slug
router.get("/:slug", getExhibitBySlug);

export default router;
