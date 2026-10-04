import "dotenv/config";

import app from "./app.js";

import sequelize from "./config/database.js";
import { sessionStore } from "./config/session.js";

import User from "./models/user.js";
import Exhibit from "./models/exhibit.js";
import SavedExhibit from "./models/savedExhibit.js";

const PORT = process.env.PORT || 3000;

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
