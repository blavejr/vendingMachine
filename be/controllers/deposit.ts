import UserModel, { User } from "../models/user";
import { formatUser } from "../utils/user";

export async function update(id: string, deposit: number): Promise<User> {
    const currentUser = await UserModel.findById(id);

    if(!isDenomination(deposit)) {
        throw new Error("Invalid deposit amount");
    }
    
    const newUser = {
        ...formatUser(currentUser!),
        deposit: deposit + currentUser!.deposit,
        updated_at: new Date(),
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, newUser, {new: true});
    
    return formatUser(updatedUser!);
}

function isDenomination(amount: number): boolean {
    const denominations = [5, 10, 20, 50, 100];
    return denominations.includes(amount);
  }