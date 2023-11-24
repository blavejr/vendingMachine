import express from "express";
import * as userController from "../controllers/user";
import * as sessionController from "../controllers/session";
import { User } from "../models/user";
import { basicAuthMiddleware, jwtAuthMiddleware } from "../middleware/auth";
import * as userSchema from "../validation/users.schema";

const router = express.Router();

router
  .get("/reset", jwtAuthMiddleware, async (req: any, res) => {
    const user: User = await userController.resetDeposit(req.auth.user);
    res.json(user);
  })
  // TODO: login controller should issue a new session
  .get("/", basicAuthMiddleware, async (req: any, res) => {
    const {user} = req.auth;
    const { headers } = req;

    const loggedInUser: User = await userController.findByUserName(user);
    const session = await sessionController.create(loggedInUser.id, headers['user-agent']);
    // session id must be the same as user id
    res.json({...loggedInUser, token:session.token});
  })
  .get("/:id", jwtAuthMiddleware, async (req, res) => {
    const user: User = await userController.get(req.params.id);
    res.json(user);
  })
  .post("/", async (req, res) => {
    await userSchema.create.validate(req.body, { abortEarly: false });
    const user: User = await userController.create(req.body);
    res.json(user);
  })
  .patch("/", jwtAuthMiddleware, async (req: any, res) => {
    const {userId} = req.auth;
    await userSchema.update.validate(req.body, { abortEarly: false });
    const updatedUser: User = await userController.update(userId, req.body);
    res.json(updatedUser);
  })
  .delete("/:id", jwtAuthMiddleware, async (req, res) => {
    const user: User = await userController.delete_(req.params.id);
    res.json(user);
  });

export default router;
