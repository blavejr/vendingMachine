import express, { Response } from "express";
// TODO: use the correct type for those any
import { IBasicAuthedRequest } from "express-basic-auth"
import * as productController from "../controllers/product";
import { Product } from "../models/product";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/", async (req: any, res: Response) => {
  const products: Array<Product> = await productController.getAll();
  res.json({
    items: products,
    total: products.length,
  });
});

router.get("/:id", async (req: any, res: Response) => {
  const product: Product = await productController.get(req.params.id);
  res.json(product);
});

router.post("/", authMiddleware, async (req: any, res: Response) => {
  const { user } = req.auth || {};
  const product: Product = await productController.create(user, req.body);
  res.json(product);
});

router.put("/", authMiddleware, async (req: any, res: Response) => {
  const { user } = req.auth || {};
  const product: Product = await productController.update(user, req.body);
  res.json(product);
});

router.delete("/:id", authMiddleware, async (req: any, res: Response) => {
  const product: Product = await productController.delete_(req.params.id);
  res.json(product);
});

export default router;
