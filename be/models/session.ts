import { Schema, model, Types } from "mongoose";

export interface Session {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  deviceInfo: string;
  expirationDate: Date;
  created_at: Date;
}

const sessionSchema = new Schema<Session>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  deviceInfo: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
});

const SessionModel = model<Session>("Session", sessionSchema);

export default SessionModel;
