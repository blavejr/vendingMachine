import { Document } from "mongoose";
import { User } from "../models/user";

export function formatUser<T extends Document>(
  user: T,
  isNew: Boolean = false
): User {
  const {
    _id,
    name,
    username,
    password,
    deposit,
    role,
    created_at,
    updated_at,
  } = user.toObject();

  const formattedUser: User = {
    id: _id,
    name,
    username,
    password,
    deposit,
    role,
    created_at: !isNew ? created_at : new Date(),
    updated_at: !isNew ? updated_at : new Date(),
  };

  return formattedUser;
}
