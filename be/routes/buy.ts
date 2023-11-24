import express, { Request } from "express";
import { IBasicAuthedRequest } from "express-basic-auth";
import * as buyController from "../controllers/buy";
import { jwtAuthMiddleware } from "../middleware/auth";

const router = express.Router();

router
.get("/", jwtAuthMiddleware, async (req: any, res) => {
  const { user } = req.auth || null;
  const purchases = await buyController.getAll(user);
  res.json(purchases);
})
.post("/", jwtAuthMiddleware, async (req: any, res) => {
  const { product_id, amount } = req.body || null;
  const { user } = req.auth || null;
  const purchase = await buyController.create(product_id, amount, user);
  res.json(purchase);
});

export default router;
