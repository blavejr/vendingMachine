import UserModel, { User } from "../models/user";
import { formatUser } from "../utils/user";
import validationMessages from "../validation/messages.schema";
import { Types } from "mongoose";

export async function update(userId: Types.ObjectId , deposit: number): Promise<User> {
  const currentUser = await UserModel.findById(userId);

//   TODO: create an error class that takes a message and a status code
  if (!currentUser) {
    throw new Error(validationMessages.user.notFound.message);
  }

  if (!isDenomination(deposit)) {
    throw new Error(validationMessages.deposit.invalidAmount.message);
  }

  const newUser = {
    ...formatUser(currentUser),
    deposit: deposit + currentUser.deposit,
    updated_at: new Date(),
  };
  
  const updatedUser = await UserModel.findByIdAndUpdate(
    currentUser.id,
    newUser,
    { new: true }
  );

  return formatUser(updatedUser!);
}

function isDenomination(amount: number): boolean {
  const denominations = [5, 10, 20, 50, 100];
  return denominations.includes(amount);
}
