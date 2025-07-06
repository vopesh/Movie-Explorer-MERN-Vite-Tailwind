/* MovieCard.jsx */
import React from "react";
import styles from "../styles/MovieCard.module.css"; // ← make sure this line exists
import { useFavourites } from "../context/FavouritesContext.jsx";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const { favIds, toggleFav } = useFavourites();
  const isFav = favIds.includes(movie.id);

  return (
    <div className={styles.card}>
      <img
        loading="lazy"
        className={styles.poster}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "/placeholder-200x300.png" /* fallback image */
        }
        alt={movie.title}
      />

      <div className={styles.info}>
        <h4 className={styles.title}>
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h4>

        <button
          className={styles.favBtn}
          onClick={() =>
            toggleFav({
              tmdbId: movie.id,
              title: movie.title,
              poster: movie.poster_path,
            })
          }
          aria-label="toggle favourite"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard; // bottom export
