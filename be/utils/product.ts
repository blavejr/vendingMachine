import { Document } from "mongoose";
import { Product } from "../models/product";

export function formatProduct<T extends Document>(
  product: T,
  isNew: Boolean = false
): Product {
  const {
    _id,
    amountAvailable,
    cost,
    productName,
    sellerId,
    image,
    created_at,
    updated_at,
  } = product.toObject();

  const formattedProduct: Product = {
    id: _id,
    amountAvailable,
    cost,
    productName,
    sellerId,
    image,
    created_at: !isNew ? created_at : new Date(),
    updated_at: !isNew ? updated_at : new Date(),
  };

  return formattedProduct;
}
