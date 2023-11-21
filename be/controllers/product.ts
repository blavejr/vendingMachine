import ProductModel, { Product } from "../models/product";
import UserModel from "../models/user";

export async function get(id: string): Promise<Product> {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return formatProduct(product);
}

export async function create(authUserName: string, product: Product): Promise<Product> {
  const user = await UserModel.findOne({username: authUserName});
  console.log(user);
  console.log(!user && user!.role === "seller");
  
  if (!user) {
    throw new Error("User not found");
  }
  
  if (user.role !== "seller") {
    throw new Error("User not a seller");
  }

  const newProduct = new ProductModel({
    ...product,
    sellerId: user!._id,
  });
  await newProduct.save();
  return formatProduct(newProduct, true);
}

export async function update(id: string, product: Product): Promise<Product> {
  const currentProduct = await ProductModel.findById(id);

  const newProduct = {
    ...formatProduct(currentProduct!),
    ...product,
    updated_at: new Date(),
  };

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, newProduct, {
    new: true,
  });

  return formatProduct(updatedProduct!);
}

export async function delete_(id: string): Promise<Product> {
  const product = await ProductModel.findByIdAndDelete(id);
  return formatProduct(product!);
}

function formatProduct(product: Product, isNew: Boolean = false): Product {
  return {
    amountAvailable: product.amountAvailable,
    cost: product.cost,
    productName: product.productName,
    sellerId: product.sellerId,
  };
}
