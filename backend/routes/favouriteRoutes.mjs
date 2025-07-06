import { Router } from "express";
import MovieFavourite from "../models/movieFavourite.js";

const router = Router();

router.get("/", async (_req, res) => {
  const favs = await MovieFavourite.find().sort("-createdAt");
  res.json(favs);
});

router.post("/", async (req, res) => {
  const { tmdbId, title, poster } = req.body || {};

  // 💡 guard against bad / missing body
  if (!tmdbId || !title) {
    return res.status(400).json({ error: "tmdbId and title required" });
  }

  /* toggle logic (ignore userId for now) */
  const existing = await MovieFavourite.findOne({ tmdbId });

  if (existing) {
    await existing.deleteOne();
    return res.json({ removed: true, tmdbId });
  }

  const doc = await MovieFavourite.create({ tmdbId, title, poster });

  res.status(201).json(doc);
});

export default router;
