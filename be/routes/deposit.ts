import express from "express";
import * as depositController from "../controllers/deposit";
import { User } from "../models/user";

const router = express.Router();

router.patch("/:id", async (req, res) => {
  const { deposit } = req.body || 0;
  const { id } = req.params || null;

  const user: User = await depositController.update(id, deposit);
  res.json(user);
});

export default router;
