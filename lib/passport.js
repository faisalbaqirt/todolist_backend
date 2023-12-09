const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../db/db");

const options = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: "secret",
};

const verify = (payload, done) => {
  db("users")
    .where({ id: payload.id })
    .first()
    .then((user) => {
      if (!user) {
        return done(null, false, {
          message: "User not found",
        });
      }
      return done(null, user);
    })
    .catch((err) => {
      return done(err, false, {
        message: err.message
      });
    });
};

passport.use(new JwtStrategy(options, verify))

module.exports = passport
