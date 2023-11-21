import BuyModel, { Buy } from "../models/buy";
import UserModel, { User } from "../models/user";

export async function create(id: string, product_id: string, amount: number): Promise<Buy> {
    const user = UserModel.findById(id);
    if(!user) {
        throw new Error("User not found");
    }

    const buy = {
        userID: id,
        products: amount,
    }

    const newBuy = await BuyModel.create(buy);
    return newBuy;
}
