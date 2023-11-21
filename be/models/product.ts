import { Schema, model, Types } from "mongoose";

export interface Product {
  id: Types.ObjectId;
  amountAvailable: number;
  cost: number;
  productName: string;
  sellerId: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<Product>({
  amountAvailable: Number,
  cost: Number,
  productName: String,
  sellerId: {type: Schema.Types.ObjectId, ref: "User"},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProductModel = model<Product>("Product", userSchema);

export default ProductModel;
