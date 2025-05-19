const express = require("express");
const passport = require("passport");
const bcrypt   = require("bcrypt");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { getUserByUsername, addUser } = require("../db/queries");


router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Logged in", user: req.user });
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if(err) return res.status(500).json({ error: "Logout failed"});
        res.json({ message: "Logged out" });
    })
})

router.post(
  "/signup",
  [
    body("username").isEmail().withMessage("Enter a valid email."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters."),
    body("confirmPassword")
      .custom((val, { req }) => val === req.body.password)
      .withMessage("Passwords do not match.")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    console.log("↗️  Signup payload:", req.body);

    if (await getUserByUsername(req.body.username)) {
      return res.status(409).json({ errors: [{ msg: "Email already in use" }] });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await addUser({
      first_name:       req.body.first_name,
      last_name:        req.body.last_name,
      username:         req.body.username,
      password:         hash,
      membership_status:req.body.membership_status || "active"
    });

    console.log("✔️  Created user:", newUser);
    return res.json({ message: "Signup successful", user: newUser });
  }
);

router.get("/authorize", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ user: req.user });
  }
  res.status(401).json({ user: null });
});


module.exports = router;