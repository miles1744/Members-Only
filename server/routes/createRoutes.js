
const express = require("express");
const router  = express.Router();
const { addMessage } = require("../db/queries");



router.post("/create", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
  
    const { title, body } = req.body;
    try {
      const message = await addMessage({
        user_id: req.user.id,
        title,
        body
      });
      res.status(201).json({ message });
    } catch (err) {
      console.error("Create message error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  
  module.exports = router;