import { Router } from "express";
import axios from "axios";
import axiosRetry from "axios-retry";

const router = Router();
const TMDB = "https://api.themoviedb.org/3";
const KEY = process.env.TMDB_API_KEY;

/* axios with retry */
axiosRetry(axios, {
  retries: 4,
  retryDelay: (_, n) => n * 800, // 0.8,1.6,2.4,3.2 s
  retryCondition: (err) =>
    axiosRetry.isNetworkOrIdempotentRequestError(err) ||
    err.response?.status >= 500,
});

/* helper */
const tmdbGet = (path, params = {}) =>
  axios.get(`${TMDB}${path}`, {
    params: { include_adult: false, ...params },
    headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
    timeout: 8000,
  });

/* GET /api/search?query=…&page=… */
router.get("/", async (req, res) => {
  let { query = "", page = 1 } = req.query;
  query = query.trim();
  if (query.length < 2)
    return res.status(400).json({ error: "query min 2 chars" });

  try {
    /* 1️⃣ normal title search */
    const { data } = await tmdbGet("/search/movie", { query, page });

    if (data.total_results > 0) return res.json(data);

    /* 2️⃣ zero results → keyword spell-assist */
    const kw = await tmdbGet("/search/keyword", { query, page: 1 });
    if (kw.data.total_results === 0)
      return res.status(404).json({ results: [] });

    const bestId = kw.data.results[0].id;

    /* 3️⃣ discover by keyword */
    const disco = await tmdbGet("/discover/movie", {
      with_keywords: bestId,
      page,
      sort_by: "popularity.desc",
    });

    disco.data.__keyword = kw.data.results[0].name;
    res.json(disco.data);
  } catch (err) {
    //console.error("TMDB proxy error:", err.message);
    if (process.env.NODE_ENV !== "production") {
      console.error("TMDB proxy error:", err.message);
    }
    const code = err.response?.status ?? 503;
    res.status(code).json({ error: "tmdb_proxy_failed", code });
  }
});

export default router; /* bottom export */
