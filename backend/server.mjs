/* -----------------------------------------------------------
   01) Top-level imports
----------------------------------------------------------- */
import express from "express"; // The web-framework
import dotenv from "dotenv"; // Loads .env / .env.local
import cookieParser from "cookie-parser"; // Reads cookies into req.cookies
import session from "express-session"; // Session middleware
import MongoStore from "connect-mongo"; // Stores sessions in MongoDB
import connectDB from "./config/db.js"; // Our helper that calls mongoose.connect()

/* -----------------------------------------------------------
   02) Load env vars + connect database
----------------------------------------------------------- */
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url)); // /backend

// 1. load .env  (non-secret)
dotenv.config({ path: path.resolve(root, "..", ".env") });
// 2. load .env.local  (secrets) and override duplicates
dotenv.config({ path: path.resolve(root, "..", ".env.local"), override: true });
// 3. connect to MongoDB
//    (this will cache the connection for future use)
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in .env.local");
}
await connectDB(); // Opens Mongo connection once

console.log("TMDB key loaded?", !!process.env.TMDB_API_KEY);

/* -----------------------------------------------------------
   03) App-level middleware
----------------------------------------------------------- */
const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser(process.env.JWT_SECRET || "dev_fallback_secret")); // Parse Cookie header → req.cookies
app.use(
  session({
    secret: process.env.JWT_SECRET, // Signed cookie value
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Persist to Mongo
    }),
  })
);

/* -----------------------------------------------------------
   04)  API routes
----------------------------------------------------------- */
import searchRoutes from "./routes/searchRoutes.mjs";
import favouriteRoutes from "./routes/favouriteRoutes.mjs";
import movieRoutes from "./routes/movieDetailsRoutes.mjs";
app.use("/api/search", searchRoutes);
app.use("/api/favourites", favouriteRoutes);
console.log("🔗  /api/favourites route mounted");
console.log("🔗  /api/search route mounted");
app.use("/api/movie", movieRoutes);

/* -----------------------------------------------------------
   05) Simple health-check route
----------------------------------------------------------- */
app.get("/api/health", (_, res) => res.json({ status: "ok" }));

/* -----------------------------------------------------------
   06) Start server
----------------------------------------------------------- */
const PORT = process.env.PORT || 2005; // Use env PORT if provided
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
