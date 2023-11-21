import express, { Response } from "express";
// TODO: use the correct type for those any
import { IBasicAuthedRequest } from "express-basic-auth"
import * as productController from "../controllers/product";
import { Product } from "../models/product";

const router = express.Router();

router.get("/", (req: any, res: Response) => {
  res.send("product route");
});

router.get("/:id", async (req: any, res: Response) => {
  const product: Product = await productController.get(req.params.id);
  res.json(product);
});

router.post("/", async (req: any, res: Response) => {
  const product: Product = await productController.create(req.auth.user, req.body);
  res.json(product);
});

router.patch("/:id", async (req: any, res: Response) => {
  const product: Product = await productController.update(req.params.id, req.body);
  res.json(product);
});

router.delete("/:id", async (req: any, res: Response) => {
  const product: Product = await productController.delete_(req.params.id);
  res.json(product);
});

export default router;
