const db = require("../db/db")

class AuthModel {
  registerUser(username, email, hashedPin) {
    return db("users").returning(["id", "username"]).insert({
      username: username,
      email: email,
      pin: hashedPin,
    });
  }

  loginByUsername(username) {
    return db("users").where("username", username).first();
  }
}

module.exports = new AuthModel()
