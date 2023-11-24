import express, { Request, Response } from "express";
import * as depositController from "../controllers/deposit";
import { User } from "../models/user";
import { jwtAuthMiddleware } from "../middleware/auth";

const router = express.Router();

router.patch("/", jwtAuthMiddleware, async (req:any, res: Response) => {
  const { deposit } = req.body || 0;
  const { user } = req.auth || null;

  if (!user || !deposit) {
    throw new Error("Invalid request");
  }

  const updatedUser: User = await depositController.update(user, deposit);
  res.json(updatedUser);
});

export default router;
