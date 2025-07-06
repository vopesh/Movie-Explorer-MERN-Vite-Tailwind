import { Router } from "express";
import axios from "axios";
import axiosRetry from "axios-retry";

const router = Router();

/* axios with 2 retries on 5xx / network */
axiosRetry(axios, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (err) =>
    axiosRetry.isNetworkOrIdempotentRequestError(err) ||
    err.response?.status >= 500,
});

/* GET /api/movie/:id */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "id required" });

  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`;
    const { data } = await axios.get(url, { timeout: 7000 });
    res.json(data);
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    res.status(503).json({ error: "TMDB network error" });
  }
});

export default router;
