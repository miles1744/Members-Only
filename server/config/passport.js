// server/config/passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("../db/queries");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // 1) Look up the user
      const user = await db.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // 2) Make sure there *is* a password hash in the record
      if (!user.password) {
        return done(null, false, { message: "No password on record" });
      }

      // 3) Now safely compare
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      // 4) Everything checks out
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
