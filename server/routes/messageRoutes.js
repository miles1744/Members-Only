const express = require("express");
const router  = express.Router();
const { getMessages, deleteMessage } = require("../db/queries");



router.get("/home", async (req, res) => {
  try {
    const messages = await getMessages();
    res.json({ messages });
  } catch (err) {
    console.error("Fetch messages error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
  

router.delete('/home/:id', async (req, res) => {
  console.log('Deleting message id:', req.params.id);    // ← sanity check
  const id = parseInt(req.params.id, 10);
  try {
    const count = await deleteMessage(id);
    if (!count) return res.status(404).json({ error: 'No such message' });
    res.json({ message: 'Deleted', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

  module.exports = router;