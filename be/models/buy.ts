import { Schema, model, Types } from "mongoose";
export interface Buy {
  id: Types.ObjectId;
  productId: Types.ObjectId;
  buyerId: Types.ObjectId;
  sellerId: Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const BuySchema = new Schema<Buy>({
    productId: {type: Schema.Types.ObjectId, ref: "Product", required: true},
    buyerId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    sellerId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const BuyModel = model<Buy>("Buy", BuySchema);

export default BuyModel;
