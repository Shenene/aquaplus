import "dotenv/config";
import express from "express";

import path from "node:path";
import { fileURLToPath } from "node:url";

import { sessionMiddleware } from "./config/session.js";

import exhibitRoutes from "./routes/exhibitRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

/* Serves the React production build */
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "public");

  app.use(express.static(frontendPath));

  app.get("/{*splat}", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }

    return res.sendFile(path.join(frontendPath, "index.html"));
  });
}

export default app;
