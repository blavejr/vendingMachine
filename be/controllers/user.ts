import UserModel, { User } from "../models/user";
import { formatUser } from "../utils/user";
import bcrypt from "bcrypt";
import validationMessages from "../validation/messages.schema";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export async function findByUserName(username: string): Promise<any> {
  // find the authenticated user
  const user = await UserModel.findOne({ username: username });
  if (!user) {
    throw new Error(validationMessages.user.notFound.message);
  }
  const formattedUser = formatUser(user);

  return { ...formattedUser, password: undefined };
}

export async function get(id: Types.ObjectId): Promise<any> {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new Error(validationMessages.user.notFound.message);
  }

  return { ...formatUser(user), password: undefined };
}

export async function getAll(): Promise<any> {
  const users = await UserModel.find();
  return users.map((user: any) => {
    return { ...formatUser(user), password: undefined };
  });
}

export async function create(user: User): Promise<any> {
  const newUser = new UserModel({
    ...user,
    password: await hashPassword(user.password),
  });
  await newUser.save();
  const formattedUser = formatUser(newUser, true);
  return { ...formattedUser, password: undefined };
}

export async function update(userId: Types.ObjectId, user: User): Promise<any> {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, user, {
    new: true,
  });

  return { ...formatUser(updatedUser!), password: undefined };
}

// reset deposit to 0
export async function resetDeposit(userId: Types.ObjectId): Promise<any> {
  const updatedUser = await UserModel.findOneAndUpdate(
    {_id: userId},
    { deposit: 0 },
    { new: true }
  );

  return { ...formatUser(updatedUser!), password: undefined };
}

export async function delete_(id: Types.ObjectId): Promise<User> {
  const user = await UserModel.findByIdAndDelete(id);
  return formatUser(user!);
}

async function hashPassword(plaintextPassword: string) {
  const saltRounds = 10;
  return await bcrypt.hash(String(plaintextPassword), saltRounds);
}

export async function comparePasswords(
  hash: string,
  plaintextPassword: string
) {
  return await bcrypt.compare(String(plaintextPassword), hash);
}
