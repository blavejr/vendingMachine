import BuyModel, { Buy } from "../models/buy";
import UserModel, { User } from "../models/user";
import ProductModel, { Product } from "../models/product";

// Promise<Buy[]>
export async function getAll(username: string) {
    // TODO: also use populate in product controller when getting all products
    const purchases = await BuyModel.find({ buyerId: (await UserModel.findOne({ username }))?.toObject()!._id }).populate("productId");
    return purchases;
}

export async function create(product_id: string, amount: number, username: string): Promise<Buy> {
    // TODO: run this as an aggregate transaction
    const buyer = (await UserModel.findOne({ username }))?.toObject()!;
    const product = (await ProductModel.findById(product_id))?.toObject()!;
    const seller = (await UserModel.findById(product.sellerId))?.toObject()!;
    
    if(!buyer) {
        throw new Error("User not found");
    }

    if (buyer.role !== "buyer") {
        throw new Error("User is not a buyer");
    }

    if(!product) {
        throw new Error("Product not found");
    }

    if(!seller) {
        throw new Error("Seller not found");
    }

    // 1. Check if buyer has enough money
    if(buyer.deposit < product.cost * amount) {
        throw new Error("Not enough money");
    }

    // 2. Check if seller has enough product
    if(product.amountAvailable < amount) {
        throw new Error("Not enough product");
    }

    // 3. Update buyer balance
    const newBuyerBalance = buyer.deposit - product.cost * amount;

    // 4. Update seller balance
    const newSellerBalance = seller.deposit + product.cost * amount;

    // 5. Update product amount
    const newProductAmount = product.amountAvailable - amount;

    // 6. Save all changes
    const newBuy = new BuyModel({
        amount,
        buyerId: buyer._id,
        productId: product._id,
        sellerId: seller._id,
    });

    await newBuy.save();

    // 7. Update product amount
    await ProductModel.updateOne({ _id: product._id }, { amountAvailable: newProductAmount });

    // Just in case a user buys from themselves
    // Shouldn't be possible, but just in case
    if(buyer._id !== seller._id) {
        await UserModel.updateOne({ _id: buyer._id }, { deposit: newBuyerBalance });
        await UserModel.updateOne({ _id: seller._id }, { deposit: newSellerBalance });
    }

    return newBuy;
}
