// server/routes/membersRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the members route!" });
});

module.exports = router;
