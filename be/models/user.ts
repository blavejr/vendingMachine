import { Schema, model } from "mongoose";

export interface User {
    name: string;
    username: string;
    // base64 encoded string
    password: string;
    created_at: Date;
    updated_at: Date;
    deposit: number;
    role: "seller" | "buyer";
}

const userSchema = new Schema<User>({
    name: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    deposit: {type: Number, default: 0},
    role: {type: String, enum: ["seller", "buyer"], default: "buyer"},
    created_at: {type:Date, default: Date.now},
    updated_at: {type:Date, default: Date.now},
});

const UserModel = model<User>("User", userSchema);

export default UserModel;