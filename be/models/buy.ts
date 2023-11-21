import { Schema, model } from "mongoose";

export interface Buy {
  userID: string;
  products: number;
}

const BuySchema = new Schema<Buy>({
    userID: String,
    products: Number,
});

const BuyModel = model<Buy>("Buy", BuySchema);

export default BuyModel;
