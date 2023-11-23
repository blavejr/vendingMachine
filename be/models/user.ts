import { Schema, model, Types } from "mongoose";
import { Roles } from "../utils/user";

export interface User {
  id: Types.ObjectId;
  name: string;
  username: string;
  // base64 encoded string
  password: string;
  created_at: Date;
  updated_at: Date;
  deposit: number;
  role: Roles;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  deposit: { type: Number, default: 0 },
  role: { type: String, enum: Roles, default: Roles.BUYER },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const UserModel = model<User>("User", userSchema);

export default UserModel;
