import SessionModel, { Session } from "../models/session";
import validationMessages from "../validation/messages.schema";
import moment from "moment";
import config from "../utils/config";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export async function create(
  userId: Types.ObjectId,
  userAgent: string
): Promise<any> {
  const expirationDate = moment().add(30, "days").toDate();

  const existingSession = await SessionModel.findOne({
    userId,
    deviceInfo: userAgent,
    expirationDate: { $gt: moment() },
  });

  if (existingSession) {
    await SessionModel.deleteOne({ _id: existingSession._id });
  }

  // Create a new session
  const newSession = new SessionModel({
    userId: userId,
    deviceInfo: userAgent,
    expirationDate,
    created_at: moment(),
  });

  await newSession.save();

  const { _id } = newSession.toObject();

  const token = jwt.sign({ userId, sessionId: _id }, config.jwt.secret, {
    expiresIn: "30d",
  });

  return { ...newSession.toObject(), token };
}

export async function deleteAll(userId: Types.ObjectId): Promise<any> {
  const session = await SessionModel.deleteMany({
    userId
  });
  return session;
}
