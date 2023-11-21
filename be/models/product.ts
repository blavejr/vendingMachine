import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface Product {
  amountAvailable: number;
  cost: number;
  productName: string;
  sellerId: Types.ObjectId;
}

const userSchema = new Schema<Product>({
  amountAvailable: Number,
  cost: Number,
  productName: String,
  sellerId: {type: Schema.Types.ObjectId, ref: "User"},
});

const ProductModel = model<Product>("Product", userSchema);

export default ProductModel;
