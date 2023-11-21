import mongoose from "mongoose";

const DB_ = mongoose.connection;

DB_.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

DB_.once("connected", () => {
  console.log("Connected to MongoDB");
});

export function connectMongoDB(): void {
  const mongoURI = "mongodb://localhost:27017/vendingMachine";
  mongoose.connect(mongoURI);
}