import { Schema, model, Types } from "mongoose";

export interface Product {
  id: Types.ObjectId;
  amountAvailable: number;
  cost: number;
  productName: string;
  image: string;
  sellerId: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<Product>({
  amountAvailable: Number,
  cost: Number,
  productName: String,
  image: {type: String, default: "https://www.freepnglogos.com/uploads/potato-chips-png/lays-classic-potato-chips-packet-png-image--0.png"},
  sellerId: {type: Schema.Types.ObjectId, ref: "User"},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProductModel = model<Product>("Product", userSchema);

export default ProductModel;
