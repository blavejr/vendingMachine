import mongoose from "mongoose";
import ProductModel from "../models/product";
import UserModel from "../models/user";
import BuyModel from "../models/buy";
import productsArray from "./products";
import usersArray from "./users";
import buysArray from "./buys";

const DB_ = mongoose.connection;

DB_.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

DB_.once("connected", () => {
  console.log("Connected to MongoDB for prefill");
});

async function prefill() {
  try {
    await mongoose.connect("mongodb://mongo:27017/vendingMachine");
    console.log("Before inserting users");
    await UserModel.insertMany(usersArray);
    console.log("After inserting users");

    await ProductModel.insertMany(productsArray);
    await BuyModel.insertMany(buysArray);
  } finally {
    console.log("Database prefill complete");
    mongoose.connection.close();
  }
}

prefill();
