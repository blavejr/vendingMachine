import express from "express";
import * as userController from "../controllers/user";
import { User } from "../models/user";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("user route");
});

// Returns a user from the database for the given id
router.get("/:id", async (req, res) => {
  const user: User = await userController.get(req.params.id);
  res.json(user);
});

// // TODO: should not require authentication
router.post("/", async (req, res) => {
  console.log(req.body);
  const user: User = await userController.create(req.body);
  res.json(user);
});

router.patch("/:id", async (req, res) => {
  const user: User = await userController.update(req.params.id, req.body);
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const user: User = await userController.delete_(req.params.id);
  res.json(user);
});

export default router;
