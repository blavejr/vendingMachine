import express from "express";
import * as userController from "../controllers/user";
import { User } from "../models/user";
import { authMiddleware } from "../middleware/auth";
import cors from "cors";

const router = express.Router();

// TODO: fix the any type
// router.get("/", authMiddleware, async (req: any, res) => {
//   const user: User = await userController.login(req.auth.user);
//   res.json(user);
// });

// Returns a user from the database for the given id
router
  .get("/reset", authMiddleware, async (req: any, res) => {
    const user: User = await userController.resetDeposit(req.auth.user);
    res.json(user);
  })
  .get("/", authMiddleware, async (req: any, res) => {
    const user: User = await userController.login(req.auth.user);
    res.json(user);
  })
  .get("/:id", authMiddleware, async (req, res) => {
    const user: User = await userController.get(req.params.id);
    res.json(user);
  })
  .post("/", async (req, res) => {
    const user: User = await userController.create(req.body);
    res.json(user);
  })
  .patch("/:id", authMiddleware, async (req, res) => {
    const user: User = await userController.update(req.params.id, req.body);
    res.json(user);
  })
  .delete("/:id", authMiddleware, async (req, res) => {
    const user: User = await userController.delete_(req.params.id);
    res.json(user);
  });

export default router;
