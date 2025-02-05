import express, { Request, Response, NextFunction } from "express";
import { scraper } from "./scraper";

export const router = express.Router();

// Define a post request handler
router.post(
  "/articles",
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);
