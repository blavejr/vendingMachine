import express, { Request } from "express";
import { IBasicAuthedRequest } from "express-basic-auth";
import * as buyController from "../controllers/buy";

const router = express.Router();

router
.get("/", async (req: any, res) => {
  const { userId } = req.auth;
  const { page = 1, pageSize = 10 } = req.query;
  const purchases = await buyController.getAll(userId, page, pageSize);
  res.json(purchases);
})
.post("/", async (req: any, res) => {
  const { product_id, amount } = req.body;
  const { userId } = req.auth;
  const purchase = await buyController.create(product_id, amount, userId);
  res.json(purchase);
});

export default router;
