import { User } from "../models/user";

export function formatUser(user: User, isNew: Boolean = false): User {
    return {
      name: user.name,
      username: user.username,
      password: user.password,
      deposit: user.deposit,
      role: user.role,
      created_at: !isNew ? user.created_at : new Date(),
      updated_at: !isNew ? user.updated_at : new Date(),
    };
  }
  