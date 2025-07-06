import mongoose from "mongoose";

/*  connectDB()
    -----------
    Opens a single Mongo connection and prints a friendly log.
*/
async function connectDB() {
  // 1. try to connect; mongoose caches the pool for future reuse
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME, // optional: choose DB name
  });

  // 2. success log (will show once on server start)
  console.log("✅  MongoDB connected");
}

export default connectDB;
