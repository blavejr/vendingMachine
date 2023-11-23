import express, { Response } from "express";
import * as productController from "../controllers/product";
import { Product } from "../models/product";
import { authMiddleware } from "../middleware/auth";
import * as productSchema from "../validation/product.schema";

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
  await productSchema.create.validate(req.body, { abortEarly: false });
  const product: Product = await productController.create(user, req.body);
  res.json(product);
});

// TODO: This should be a PATCH
// Keeping it as a PUT because thats what the requirements say
router.put("/", authMiddleware, async (req: any, res: Response) => {
  const { user } = req.auth || {};
  await productSchema.update.validate(req.body, { abortEarly: false });
  const { id } = req.body;
  if (!id || !user) {
    throw new Error("Product id is required");
  }
  const product: Product = await productController.update(user, req.body);
  res.json(product);
});

router.delete("/:id", authMiddleware, async (req: any, res: Response) => {
  const product: Product = await productController.delete_(req.params.id);
  res.json(product);
});

export default router;
