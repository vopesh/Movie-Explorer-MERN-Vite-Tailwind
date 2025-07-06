import mongoose from "mongoose";

/* helper – create userId once per document */
function createUserId() {
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random8 = Math.random().toString().slice(2, 5); // 3 random digits
  return `vop_${today}_${random8}`;
}

/* Schema definition */
const favouriteSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, required: true },
    title: { type: String, required: true },
    poster: { type: String },
    userId: {
      type: String,
      default: createUserId, // <-- generates vop_yyyymmdd_xxxxxxxx
      unique: true, // optional: enforce uniqueness at DB level
    },
  },
  /* -------- schema options -------- */
  {
    timestamps: true,
    collection: "movieExplorer",
  }
);

/* bottom export */
export default mongoose.model("MovieFavourite", favouriteSchema);
