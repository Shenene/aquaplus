import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import sequelize from "./database.js";

const SequelizeStore = connectSessionSequelize(session.Store);

const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
});

const sessionMiddleware = session({
  name: "aquaplus.sid",
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.SESSION_COOKIE_SECURE === "true",
  },
});

export { sessionStore, sessionMiddleware };
