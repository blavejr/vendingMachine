import mongoose from "mongoose";
import config from "../utils/config";

const DB_ = mongoose.connection;

DB_.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

DB_.once("connected", () => {
  console.log("Connected to MongoDB");
});

export function connectMongoDB(): void {
  const mongoURI: string = config.mongodbUri;
  mongoose.connect(mongoURI);
}