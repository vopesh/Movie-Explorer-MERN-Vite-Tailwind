import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import layout from "../styles/Layout.module.css";

const imgBase = "https://image.tmdb.org/t/p/w342";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/movie/${id}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const json = await res.json();
        setMovie(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Loading…</p>;
  if (error)
    return <p style={{ padding: "2rem", color: "red" }}>{error.message}</p>;
  if (!movie) return null;

  /* YouTube trailer (first official) */
  const trailer = movie.videos?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <main className={layout.wrapper}>
      <div style={{ maxWidth: "900px", width: "100%", padding: "1rem" }}>
        <Link to="/" style={{ marginBottom: "1rem", display: "inline-block" }}>
          ← Back
        </Link>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <img
            src={
              movie.poster_path
                ? `${imgBase}${movie.poster_path}`
                : "/placeholder-200x300.png"
            }
            alt={movie.title}
            style={{ width: "220px", borderRadius: "0.5rem" }}
          />

          <div style={{ flex: 1 }}>
            <h2>{movie.title}</h2>
            <p>
              <strong>Genres: </strong>
              {movie.genres?.map((g) => g.name).join(", ")}
            </p>
            <p>
              <strong>Release:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
            </p>

            <h3>Overview</h3>
            <p>{movie.overview}</p>

            {trailer && (
              <p>
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶ Watch Trailer
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
