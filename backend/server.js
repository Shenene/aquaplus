import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import { sessionStore, sessionMiddleware } from "./config/session.js";

import User from "./models/user.js";
import Exhibit from "./models/exhibit.js";
import SavedExhibit from "./models/savedExhibit.js";
import exhibitRoutes from "./routes/exhibitRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to read JSON request bodies
app.use(express.json());

// Session Middleware
app.use(sessionMiddleware);

// Authentication API routes
app.use("/api/auth", authRoutes);

// Public exhibit API routes
app.use("/api/exhibits", exhibitRoutes);

// Authenticated collection API routes
app.use("/api/collection", collectionRoutes);

// ------------------------------------------

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "AQUA+ API is running",
  });
});

// Connecting to MySQL before starting the server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to AQUA+ MySQL database");

    await sessionStore.sync();
    console.log("AQUA+ sessions table is ready");

    await User.sync();
    console.log("AQUA+ users table is ready");

    await Exhibit.sync();
    console.log("AQUA+ exhibits table is ready");

    await SavedExhibit.sync();
    console.log("AQUA+ saved_exhibits table is ready");

    app.listen(PORT, () => {
      console.log(`AQUA+ server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to AQUA+ MySQL database:", error.message);
    process.exit(1);
  }
};

startServer();
