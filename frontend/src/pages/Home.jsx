import React, { useState, useEffect, useRef } from "react";
import useMovieSearch from "../hooks/useMovieSearch.js";
import MovieCard from "../components/MovieCard.jsx";

import grid from "../styles/MoviesGrid.module.css";
import layout from "../styles/Layout.module.css";

const Home = () => {
  const [q, setQ] = useState("");

  /* custom hook */
  const { data, loading, error, loadMore, end } = useMovieSearch(q);

  /* sentinel div observed by IntersectionObserver */
  const sentinelRef = useRef(null);

  /* ---------- set up / tear down observer ---------- */
  useEffect(() => {
    if (!sentinelRef.current) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading && !end) {
          loadMore(); // fetch next page
        }
      },
      { rootMargin: "200px" } // start 200 px before bottom
    );

    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [loadMore, loading, end]);

  /* ---------- render ---------- */
  return (
    <main className={layout.wrapper}>
      <div className={layout.searchRow}>
        <input
          className={layout.searchInput}
          placeholder="Search movies…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error.message}</p>}

      {data.length > 0 && (
        <>
          <div className={grid.grid}>
            {data.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
          {error && !loading && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>
              {error.message.includes("tmdb_proxy_failed")
                ? "TMDB is busy – please retry."
                : error.message}
            </p>
          )}
        </>
      )}

      {/* sentinel → height 1 px, invisible */}
      <div ref={sentinelRef} style={{ height: "1px" }} />

      {loading && <p style={{ marginTop: "1rem" }}>Loading…</p>}

      {end && !loading && (
        <p style={{ marginTop: "1rem", color: "#999" }}>— no more results —</p>
      )}
    </main>
  );
};

export default Home; /* bottom export */
