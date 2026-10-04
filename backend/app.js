import "dotenv/config";
import express from "express";

import { sessionMiddleware } from "./config/session.js";

import exhibitRoutes from "./routes/exhibitRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";

const app = express();

/* Middleware to read JSON request bodies */
app.use(express.json());

/* Session middleware */
app.use(sessionMiddleware);

/* Authentication API routes */
app.use("/api/auth", authRoutes);

/* Public exhibit API routes */
app.use("/api/exhibits", exhibitRoutes);

/* Authenticated collection API routes */
app.use("/api/collection", collectionRoutes);

/* Health check endpoint */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "AQUA+ API is running",
  });
});

export default app;
