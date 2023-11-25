import express, { Response } from "express";
import * as productController from "../controllers/product";
import { Product } from "../models/product";
import * as productSchema from "../validation/product.schema";
import { Types } from "mongoose";

const router = express.Router();

router
  .get("/", async (req: any, res: Response) => {
    const products: Array<Product> = await productController.getAll();
    res.json({
      items: products,
      total: products.length,
    });
  })

  .get("/:id", async (req: any, res: Response) => {
    const productId = new Types.ObjectId(req.params.id);
    const product: Product = await productController.get(productId);
    res.json(product);
  })

  .post("/", async (req: any, res: Response) => {
    const { userId } = req.auth || {};
    await productSchema.create.validate(req.body, { abortEarly: false });
    const product: Product = await productController.create(userId, req.body);
    res.json(product);
  })

  // TODO: This should be a PATCH
  // Keeping it as a PUT because thats what the requirements say
  .put("/", async (req: any, res: Response) => {
    await productSchema.update.validate(req.body, { abortEarly: false });
    const { userId } = req.auth;
    const { id } = req.body;
    if (!id || !userId) {
      throw new Error("Product id is required");
    }
    const product: Product = await productController.update(userId, req.body);
    res.json(product);
  })

  .delete("/:id", async (req: any, res: Response) => {
    const product: Product = await productController.delete_(req.params.id);
    res.json(product);
  });

export default router;
