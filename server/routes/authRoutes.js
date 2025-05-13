const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/login", passport.authenticate(), (req, res) => {
    res.json({ message: "Logged in", user: req.user });
});

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if(err) return res.status(500).json({ error: "Logout failed"});
        res.json({ message: "Logged out" });
    })
})

module.exports = router;