import ProductModel, { Product } from "../models/product";

export async function get(id: string): Promise<Product> {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return formatProduct(product);
}

export async function create(product: Product): Promise<Product> {
  const newProduct = new ProductModel(product);
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
  };
}
