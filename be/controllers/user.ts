import UserModel, { User } from "../models/user";
import { formatUser } from "../utils/user";

export async function get(id: string): Promise<User> {
  const user = await UserModel.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return formatUser(user);
}

export async function create(user: User): Promise<User> {
  const newUser = new UserModel(user);
  await newUser.save();
  return formatUser(newUser, true);
}

export async function update(id: string, user: User): Promise<User> {
    const currentUser = await UserModel.findById(id);

    const newUser = {
        ...formatUser(currentUser!),
        ...user,
        updated_at: new Date(),
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, newUser, {new: true});
    
    return formatUser(updatedUser!);
}

export async function delete_(id: string): Promise<User> {
    const user = await UserModel.findByIdAndDelete(id);
    return formatUser(user!);
}