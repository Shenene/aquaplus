import * as authService from "../services/authService.js";

// Create a new authenticated session
const REMEMBER_ME_DURATION = 30 * 24 * 60 * 60 * 1000;

const createSession = (req, userId, rememberMe = false) => {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) {
        return reject(error);
      }

      req.session.userId = userId;

      if (rememberMe) {
        req.session.cookie.maxAge = REMEMBER_ME_DURATION;
      }

      req.session.save((saveError) => {
        if (saveError) {
          return reject(saveError);
        }

        resolve();
      });
    });
  });
};

// -------------------------------------------------------------------------------------------

// POST / api/auth/register
export const register = async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  if ([...password].length < 15) {
    return res.status(400).json({
      message: "Password must be at least 15 characters.",
    });
  }

  if ([...password].length > 128) {
    return res.status(400).json({
      message: "Password must be 128 characters or fewer.",
    });
  }

  try {
    const existingUser = await authService.getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const user = await authService.createUser(email, password);

    await createSession(req, user.id);

    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Please enter a valid email address.",
      });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    console.error("Unable to register user:", error.message);

    return res.status(500).json({
      message: "Unable to create account.",
    });
  }
};

// -------------------------------------------------------------------------------------------

// POST /api/auth/login
export const login = async (req, res) => {
  const { email, password, rememberMe = false } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    return res.status(400).json({
      message: "Email and password are required.",
    });
  }

  try {
    const user = await authService.getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password. Please try again.",
      });
    }

    const passwordMatches = await authService.verifyPassword(user.passwordHash, password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Incorrect email or password. Please try again.",
      });
    }

    await createSession(req, user.id, rememberMe === true);

    return res.status(200).json({
      message: "Successfully logged in.",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Unable to log in user:", error.message);

    return res.status(500).json({
      message: "Unable to log in.",
    });
  }
};

// -------------------------------------------------------------------------------------------

// GET /api/auth/me
export const getCurrentUser = async (req, res) => {
  try {
    const user = await authService.getUserById(req.session.userId);

    if (!user) {
      return res.status(401).json({
        message: "Not authenticated.",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Unable to retrieve current user:", error.message);

    return res.status(500).json({
      message: "Unable to retrieve current user.",
    });
  }
};

// -------------------------------------------------------------------------------------------

// POST /api/auth/logout
export const logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Unable to log out user:", error.message);

      return res.status(500).json({
        message: "Unable to log out.",
      });
    }

    res.clearCookie("aquaplus.sid");

    return res.status(200).json({
      message: "Successfully logged out.",
    });
  });
};
