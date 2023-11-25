import BuyModel, { Buy } from "../models/buy";
import UserModel, { User } from "../models/user";
import ProductModel, { Product } from "../models/product";
import validationMessages from "../validation/messages.schema";
import { Roles } from "../utils/user";
import { Types } from "mongoose";

export async function getAll(userId: Types.ObjectId, page: number = 1, pageSize: number = 10): Promise<{ purchases: Buy[], totalPages: number, count: number }> {
  const user = (await UserModel.findById(userId))?.toObject()!;
  
  const totalItems = await BuyModel.countDocuments({
    buyerId: user._id,
  });

  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const currentPage = Math.min(page, totalPages);

  const purchases = await BuyModel.find({
    buyerId: user._id,
  })
    .populate("productId")
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize);

  return { purchases, totalPages, count: totalItems };
}



export async function create(
  product_id: string,
  amount: number,
  userId: Types.ObjectId
): Promise<Buy> {
  const buyer = (await UserModel.findById(userId))!.toObject()!;
  const product = (await ProductModel.findById(product_id))!.toObject()!;
  const seller = (await UserModel.findById(product.sellerId))!.toObject()!;

  if (!buyer || !seller) {
    throw new Error(validationMessages.user.notFound.message);
  }

  if (buyer.role !== Roles.BUYER) {
    throw new Error(validationMessages.user.notBuyer.message);
  }

  if (!product) {
    throw new Error(validationMessages.product.notFound.message);
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
