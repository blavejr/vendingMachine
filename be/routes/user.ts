import express from "express";
import * as userController from "../controllers/user";
import * as sessionController from "../controllers/session";
import { User } from "../models/user";
import { basicAuthMiddleware } from "../middleware/auth";
import * as userSchema from "../validation/users.schema";

const router = express.Router();

router
  // Users can reset their deposits
  .get("/reset/deposit", async (req: any, res) => {
    const { userId } = req.auth;
    const user: User = await userController.resetDeposit(userId);
    res.json(user);
  })
  // users cam reset their sessions
  .get("/reset/sessions", async (req: any, res) => {
    const { userId } = req.auth;
    const session: any = await sessionController.deleteAll(userId);
    res.json({
      message: "All sessions deleted",
      count: session.deletedCount,
    });
  })

  .get("/", basicAuthMiddleware, async (req: any, res) => {
    const { user } = req.auth;
    const { headers } = req;

    const loggedInUser: User = await userController.findByUserName(user);
    const session = await sessionController.create(
      loggedInUser.id,
      headers["user-agent"]
    );
    res.json({ ...loggedInUser, token: session.token });
  })
  // Users can only get other users, should be admin only
  .get("/:id", async (req, res) => {
    const user: User = await userController.get(req.params.id);
    res.json(user);
  })
  // Users can create themselves
  .post("/", async (req, res) => {
    await userSchema.create.validate(req.body, { abortEarly: false });
    const user: User = await userController.create(req.body);
    res.json(user);
  })
  // Users can only update themselves
  .patch("/", async (req: any, res) => {
    const { userId } = req.auth;
    await userSchema.update.validate(req.body, { abortEarly: false });
    const updatedUser: User = await userController.update(userId, req.body);
    res.json(updatedUser);
  })
  // Users can only delete themselves
  .delete("/", async (req: any, res) => {
    const { userId } = req.auth;
    const user: User = await userController.delete_(userId);
    res.json(user);
  });

export default router;
