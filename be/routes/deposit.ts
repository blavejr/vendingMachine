import express, { Request, Response } from "express";
import * as depositController from "../controllers/deposit";
import { User } from "../models/user";

const router = express.Router();

router.patch("/", async (req:any, res: Response) => {
  const { deposit } = req.body || 0;
  const { userId } = req.auth || null;

  if (!userId || !deposit) {
    throw new Error("Invalid request");
  }

  const updatedUser: User = await depositController.update(userId, deposit);
  res.json(updatedUser);
});

export default router;
