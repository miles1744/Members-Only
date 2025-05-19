const express = require("express");
const router  = express.Router();
const { updateMembershipStatus } = require("../db/queries");

router.post("/join", async (req, res) => {

  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "You must be logged in" });
  }

  const { passcode } = req.body;
  if (passcode !== process.env.CLUB_PASSCODE) {
    return res.status(403).json({ error: "Incorrect passcode" });
  }

  try {
    const updated = await updateMembershipStatus(req.user.id, "active"); 
    req.login(updated, (err) => {
      if (err) return res.status(500).json({ error: "Login sync failed" });
      res.json({ message: "Welcome to the club!", user: updated });
    });
  } catch (err) {
    console.error("Join error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});




module.exports = router;
