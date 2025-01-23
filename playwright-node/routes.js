const express = require("express");
const router = express.Router();
const scraper = require("./scraper");

// Get articles
router.post("/articles", async (req, res, next) => {
  const url = req.body?.url;
  if (!url) {
    res.status(400).json({ error: "failed to get url from request body" });
    next();
  }
  try {
    const articles = await scraper(url);
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
