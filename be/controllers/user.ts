import UserModel, { User } from "../models/user";
import { formatUser } from "../utils/user";
import bcrypt from "bcrypt";
import validationMessages from "../validation/messages.schema";

export async function login(username: string): Promise<any> {
  const user = await UserModel.findOne({ username: username });

  if (!user) {
    throw new Error(validationMessages.user.notFound.message);
  }

  return { ...formatUser(user), password: undefined };
}

export async function get(id: string): Promise<any> {
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

export async function update(username: string, user: User): Promise<any> {
  const updatedUser = await UserModel.findOneAndUpdate(
    {username: username},
    user,
    {
      new: true,
    }
  );

  return { ...formatUser(updatedUser!), password: undefined };
}

// reset deposit to 0
export async function resetDeposit(username: string): Promise<any> {
  // get user

  const currentUser = await UserModel.findOne({ username: username });
  // update user
  const updatedUser = await UserModel.findOneAndUpdate(
    currentUser!._id,
    { deposit: 0 },
    { new: true }
  );

  return { ...formatUser(updatedUser!), password: undefined };
}

export async function delete_(id: string): Promise<User> {
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
