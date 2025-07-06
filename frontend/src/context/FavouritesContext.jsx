import React, { createContext, useContext, useReducer, useEffect } from "react";

/* ---------- actions ---------- */
const LOAD_LIST = "LOAD_LIST";
const ADD_FAV = "ADD_FAV";
const REMOVE_FAV = "REMOVE_FAV";

/* ---------- reducer ---------- */
function favReducer(state, action) {
  switch (action.type) {
    case LOAD_LIST:
      return action.payload.map((m) => m.tmdbId); // keep only IDs
    case ADD_FAV:
      return [...state, action.payload];
    case REMOVE_FAV:
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
}

/* ---------- context ---------- */
const FavCtx = createContext();

/* ---------- provider ---------- */
function FavouritesProvider({ children }) {
  const [state, dispatch] = useReducer(favReducer, []);

  /* fetch existing favourites once on mount */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/favourites");
        if (res.ok) {
          const json = await res.json();
          dispatch({ type: LOAD_LIST, payload: json });
        }
      } catch (err) {
        console.error("Failed to load favourites", err);
      }
    })();
  }, []);

  /* toggle helper */
  const toggleFav = async (movie) => {
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });
      const json = await res.json();

      if (json.removed) {
        dispatch({ type: REMOVE_FAV, payload: movie.tmdbId });
      } else {
        dispatch({ type: ADD_FAV, payload: movie.tmdbId });
      }
    } catch (err) {
      console.error("Toggle favourite failed", err);
    }
  };

  const value = { favIds: state, toggleFav };

  return <FavCtx.Provider value={value}>{children}</FavCtx.Provider>;
}

/* ---------- easy hook ---------- */
export const useFavourites = () => useContext(FavCtx);

/* ⬇ default export (provider) */
export default FavouritesProvider;
