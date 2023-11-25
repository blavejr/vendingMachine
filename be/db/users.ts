import mongoose from "mongoose";
import { Roles } from "../utils/user";

export default [
  {
    _id: new mongoose.Types.ObjectId("65616bf98efa03ab3f02d953"),
    name: "Buyer Test",
    username: "aBuy",
    password: "$2b$10$/l6aFdNEtgcRbfEa0dQ0MOjBEDQEfbEw00ldWFZ8t//HG/rnYqnlq",
    deposit: 200,
    role: Roles.BUYER,
  },
  {
    _id: new mongoose.Types.ObjectId("65616ce394184915d9664327"),
    name: "Seller Test",
    username: "aSell",
    password: "$2b$10$cBiINOf1ccw3fthyySGkwO9X3zJZtP3uoANDrc.xSw6hFO7CxZzaS",
    deposit: 0,
    role: Roles.SELLER,
  },
];
