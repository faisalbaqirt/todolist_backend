const AuthModel = require("../models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

class AuthController {
  async register(req, res) {
    try {
      const { username, email, pin } = req.body;

      const existingUser = await db("users")
        .where("username", username)
        .orWhere("email", email)
        .first();

      if (existingUser) {
        if (
          existingUser.username === username &&
          existingUser.email === email
        ) {
          return res.json({
            message: "This user is already registered",
          });
        } else if (existingUser.username === username) {
          return res.json({
            message: "This username is already registered",
          });
        } else if (existingUser.email === email) {
          return res.json({
            message: "This email is already registered",
          });
        }
      }

      if (pin.length !== 6) {
        return res
          .status(400)
          .json({ message: "PIN must be exactly 6 digits." });
      }
      const hashedPin = bcrypt.hashSync(pin, 10);

      const user = await AuthModel.registerUser(
        username,
        email,
        hashedPin,
      );

      if (user && user[0]) {
        res.status(201).json({
          id: user[0].id,
          username: user[0].username,
          message: "User registration successfully!",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { username, pin } = req.body;

      const user = await AuthModel.loginByUsername(username);

      if (!user) {
        return res.json({
          message: "User not found",
        });
      }

      const isPinValid = await bcrypt.compare(pin, user.pin);
      if (!isPinValid) {
        return res.json({
          message: "Wrong pin",
        });
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        "secret"
      );

      return res.status(200).json({
        id: user.id,
        username: user.username,
        token: accessToken,
      });
    } catch (error) {
      res.status(500).json({
        message: "Login failed",
      });
    }
  }
}

module.exports = new AuthController();
