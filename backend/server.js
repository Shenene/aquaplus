import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to read JSON request bodies
app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "AQUA+ API is running",
  });
});

app.listen(PORT, () => {
  console.log(`AQUA+ server is running on port ${PORT}`);
});
