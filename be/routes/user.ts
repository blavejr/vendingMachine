import express from "express";
import * as userController from "../controllers/user";
import { User } from "../models/user";
import { authMiddleware } from "../middleware/auth";
import * as userSchema from "../validation/users.schema";

const router = express.Router();

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
    await userSchema.create.validate(req.body, { abortEarly: false });
    const user: User = await userController.create(req.body);
    res.json(user);
  })
  .patch("/", authMiddleware, async (req: any, res) => {
    const {user} = req.auth;
    await userSchema.update.validate(req.body, { abortEarly: false });
    const updatedUser: User = await userController.update(user, req.body);
    res.json(updatedUser);
  })
  .delete("/:id", authMiddleware, async (req, res) => {
    const user: User = await userController.delete_(req.params.id);
    res.json(user);
  });

export default router;
