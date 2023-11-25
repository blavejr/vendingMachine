import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import {
  generateBasicAuthHeaders,
  extractJwtToken,
  mockBuyer,
  mockSeller,
} from "./user.test";

import mockProducts from "../../db/products";

const mockProduct = {
  _id: new mongoose.Types.ObjectId("656216496381cdf3c94d6234"),
  amountAvailable: 35,
  cost: 10,
  productName: "chips by jest",
  image:
    "https://www.freepnglogos.com/uploads/potato-chips-png/lays-classic-potato-chips-packet-png-image--0.png",
  sellerId: mockSeller._id,
};

let globalToken: string;

// Mock agent for testing
const agent = request.agent(app);
agent.set("Content-Type", "application/json");
agent.set("User-Agent", "Jest Test");

describe("Product routes", () => {
  // Before all authenticate as a seller
  beforeAll(async () => {
    await mongoose.connect("mongodb://mongo:27017/vendingMachine");

    const loginResponse = await agent
      .get("/user")
      .set("Authorization", generateBasicAuthHeaders(mockSeller))
      .expect(200);

    globalToken = extractJwtToken(loginResponse);
  });

  afterEach(async () => {});

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should get all products", async () => {
    const response = await agent
      .get("/product")
      .set("Authorization", `Bearer ${globalToken}`)
      .expect(200);
  });

  it("should get a specific product by ID", async () => {
    const response = await agent
      .get(`/product/${mockProducts[0]._id}`)
      .set("Authorization", `Bearer ${globalToken}`)
      .expect(200);
  });

  it("should create a new product", async () => {
    const response = await agent
      .post("/product")
      .set("Authorization", `Bearer ${globalToken}`)
      .send(mockProduct)
      .expect(200);
  });

  it("should update a product", async () => {
    const productId = mockProducts[0]._id;
    mockProduct.cost = 20;
    const response = await agent
      .put("/product")
      .set("Authorization", `Bearer ${globalToken}`)
      .send({
        id: mockProduct._id,
        name: "Updated Product",
        cost: mockProduct.cost,
      })
      .expect(200);
  });

  it("should delete a product", async () => {
    const response = await agent
      .delete(`/product/${mockProduct._id}`)
      .set("Authorization", `Bearer ${globalToken}`)
      .expect(200);
  });
});
