import { useState, useEffect, useRef, useCallback } from "react";

function useMovieSearch(query) {
  /* ---------- local state ---------- */
  const [data, setData] = useState([]);
  const [totalPages, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // banner text only
  const [end, setEnd] = useState(false); // no more pages

  /* ---------- refs ---------- */
  const pageRef = useRef(1);
  const lastFetchTime = useRef(0);

  /* ---------- reset when query changes ---------- */
  useEffect(() => {
    setData([]);
    setError(null);
    setEnd(false);
    pageRef.current = 1;
    setTotal(1);
  }, [query]);

  /* ---------- helper ---------- */
  const fetchPage = useCallback(
    async (page) => {
      if (!query) return;

      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(query)}&page=${page}`
        );

        /* -------- non-200 handling -------- */
        if (res.status === 404) {
          setEnd(true); // no hits at all
          return;
        }
        if (!res.ok) {
          throw new Error(
            res.status === 503
              ? "TMDB busy – retry soon."
              : `Server ${res.status}`
          );
        }

        /* -------- success -------- */
        const json = await res.json();

        /* keyword spell-assist?  (only on first page) */
        if (page === 1 && json.__keyword && json.__keyword !== query) {
          setError(new Error(`Did you mean “${json.__keyword}”?`));
        } else {
          setError(null);
        }

        /* save data / pagination */
        setTotal(json.total_pages || 1);
        setEnd(page >= (json.total_pages || 1));
        setData((prev) =>
          page === 1 ? json.results : [...prev, ...json.results]
        );
      } catch (err) {
        // network or explicit throw above
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  /* ---------- initial fetch with 400 ms debounce ---------- */
  useEffect(() => {
    if (!query) return;
    const timer = setTimeout(() => fetchPage(1), 400);
    return () => clearTimeout(timer);
  }, [query, fetchPage]);

  /* ---------- load more (infinite scroll) ---------- */
  const loadMore = () => {
    if (loading || end) return;
    if (pageRef.current >= totalPages) return;

    /* 200 ms throttle */
    const now = Date.now();
    if (now - lastFetchTime.current < 200) return;
    lastFetchTime.current = now;

    pageRef.current += 1;
    fetchPage(pageRef.current);
  };

  return { data, loading, error, loadMore, end };
}

export default useMovieSearch;
