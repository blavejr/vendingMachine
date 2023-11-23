import ProductModel, { Product } from "../models/product";
import UserModel from "../models/user";
import { formatProduct } from "../utils/product";
import validationMessages from "../validation/messages.schema";

export async function get(id: string): Promise<Product> {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new Error(validationMessages.product.notFound.message);
  }

  return formatProduct(product);
}

// TODO: return a list of products belonging to a authenticated user
export async function getAll(): Promise<Array<Product>> {
  const product = await ProductModel.find({});
  return product.map((product) => {
    return formatProduct(product);
  });
}

export async function create(
  authUserName: string,
  product: Product
): Promise<Product> {
  const user = await UserModel.findOne({ username: authUserName });

  if (!user) {
    throw new Error(validationMessages.user.notFound.message);
  }

  if (user.role !== "seller") {
    throw new Error(validationMessages.user.notSeller.message);
  }

  const newProduct = new ProductModel({
    ...product,
    sellerId: user!._id,
  });
  await newProduct.save();
  return formatProduct(newProduct, true);
}

export async function update(
  username: string,
  product: Product
): Promise<Product> {
  const authenticatedUser = await UserModel.findOne({ username: username });
  const currentProduct = await ProductModel.findById(product.id);

  // check if the userid and sellerid match

  if (!currentProduct) {
    throw new Error(validationMessages.product.notFound.message);
  }

  if (!authenticatedUser) {
    throw new Error(validationMessages.user.notFound.message);
  }

  if (authenticatedUser.role !== "seller") {
    throw new Error(validationMessages.user.notSeller.message);
  }

  if (authenticatedUser._id.toString() !== currentProduct.sellerId.toString()) {
    throw new Error(validationMessages.user.notOwner.message);
  }

  const newProduct = {
    ...formatProduct(currentProduct!),
    ...product,
    updated_at: new Date(),
  };

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    product.id,
    newProduct,
    {
      new: true,
    }
  );

  return formatProduct(updatedProduct!);
}

export async function delete_(id: string): Promise<Product> {
  const product = await ProductModel.findByIdAndDelete(id);
  return formatProduct(product!);
}
