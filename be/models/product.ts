import { Schema, model } from "mongoose";

export interface Product {
  amountAvailable: number;
  cost: number;
  productName: string;
}

const userSchema = new Schema<Product>({
  amountAvailable: Number,
  cost: Number,
  productName: String,
});

const ProductModel = model<Product>("Product", userSchema);

export default ProductModel;
