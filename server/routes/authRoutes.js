const express = require("express");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const router = express.Router();


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
      body("password").isLength({ min: 8 }).withMessage("Password too short."),
      body("confirmPassword")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords do not match.")
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
        res.json({ message: "Signup successful" });
    }
  );
  

module.exports = router;