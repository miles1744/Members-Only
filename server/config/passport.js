const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcrypt");

function initialize(passport) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await db.getUserByUsername(username); 
        if (!user) return done(null, false, { message: "No user found" });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.getUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initialize;
