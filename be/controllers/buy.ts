import BuyModel, { Buy } from "../models/buy";
import UserModel, { User } from "../models/user";
import ProductModel, { Product } from "../models/product";
import validationMessages from "../validation/messages.schema";
import { Roles } from "../utils/user";

// Promise<Buy[]>
export async function getAll(username: string): Promise<Buy[]> {
  // TODO: also use populate in product controller when getting all products
  const purchases = await BuyModel.find({
    buyerId: (await UserModel.findOne({ username }))?.toObject()!.id,
  }).populate("productId");
  return purchases;
}

export async function create(
  product_id: string,
  amount: number,
  username: string
): Promise<Buy> {
  const buyer = (await UserModel.findOne({ username }))?.toObject()!;
  const product = (await ProductModel.findById(product_id))?.toObject()!;
  const seller = (await UserModel.findById(product.sellerId))?.toObject()!;

  if (!buyer || buyer.role !== Roles.BUYER || !product || !seller) {
    throw new Error(validationMessages.user.notFound.message);
  }

  const session = await UserModel.startSession();
  session.startTransaction();

  try {
    // 1. Check if buyer has enough money
    if (buyer.deposit < product.cost * amount) {
      throw new Error(validationMessages.user.notEnoughMoney.message);
    }

    // 2. Check if seller has enough product
    if (product.amountAvailable < amount) {
      throw new Error(validationMessages.product.notEnoughProduct.message);
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
    await ProductModel.updateOne(
      { _id: product._id },
      { amountAvailable: newProductAmount }
    );

    // Just in case a user buys from themselves
    // Shouldn't be possible because sellers cant buy, but just in case
    if (buyer._id !== seller._id) {
      await UserModel.updateOne(
        { _id: buyer._id },
        { deposit: newBuyerBalance }
      );
      await UserModel.updateOne(
        { _id: seller._id },
        { deposit: newSellerBalance }
      );
    }

    // MongoDB transaction commits here
    await session.commitTransaction();
    session.endSession();

    return newBuy;
  } catch (error) {
    // If any error occurs, MongoDB transaction rolls back
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    throw error;
  }
}
