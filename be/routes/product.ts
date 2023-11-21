import express from "express";
import * as productController from "../controllers/product";
import { Product } from "../models/product";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("user route");
});

router.get("/:id", async (req, res) => {
  const product: Product = await productController.get(req.params.id);
  res.json(product);
});

router.post("/", async (req, res) => {
  const product: Product = await productController.create(req.body);
  res.json(product);
});

router.patch("/:id", async (req, res) => {
  const product: Product = await productController.update(req.params.id, req.body);
  res.json(product);
});

router.delete("/:id", async (req, res) => {
  const product: Product = await productController.delete_(req.params.id);
  res.json(product);
});

export default router;
