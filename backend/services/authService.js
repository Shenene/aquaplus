import argon2 from "argon2";
import User from "../models/user.js";

// Find a user using their email address
export const getUserByEmail = async (email) => {
  return User.findOne({
    where: {
      email: email.trim().toLowerCase(),
    },
  });
};

// ----------------------------------------------------------------

// Find a user using their unique ID
export const getUserById = async (id) => {
  return User.findByPk(id, {
    attributes: ["id", "email"],
  });
};

// ----------------------------------------------------------------

// Create a new user with a securely hashed password
export const createUser = async (email, password) => {
  const passwordHash = await argon2.hash(password);

  return User.create({
    email: email.trim().toLowerCase(),
    passwordHash,
  });
};

// ----------------------------------------------------------------

// Check whether a password matches the stored password hash
export const verifyPassword = async (passwordHash, password) => {
  return argon2.verify(passwordHash, password);
};
