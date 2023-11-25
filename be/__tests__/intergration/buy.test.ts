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

let globalToken: string;
let userId: string;

// Mock agent for testing
const agent = request.agent(app);
agent.set("Content-Type", "application/json");
agent.set("User-Agent", "Jest Test");

describe("Buy routes", () => {
  // Before all authenticate as a buyer
  beforeAll(async () => {
    await mongoose.connect("mongodb://mongo:27017/vendingMachine");

    const loginResponse = await agent
      .get("/user")
      .set("Authorization", generateBasicAuthHeaders(mockBuyer))
      .expect(200);

    globalToken = extractJwtToken(loginResponse);
  });

  afterEach(async () => {});

  afterAll(async () => {
    // delete all authenticated users sessions
    await agent
      .get("/user/reset/sessions")
      .set("Authorization", `Bearer ${globalToken}`)
      .expect(200);
    await mongoose.connection.close();
  });

  it("should create a new purchase", async () => {
    const response = await agent
      .post("/buy")
      .set("Authorization", `Bearer ${globalToken}`)
      .send({
        product_id: mockProducts[0]._id,
        amount: 5,
      })
      .expect(200);
  });

  it("should get all purchases", async () => {
    // Mock data for the request body
    const requestData = {
      userId: "mockUserId",
    };

    const response = await agent
      .get("/buy")
      .set("Authorization", `Bearer ${globalToken}`)
      .send(requestData)
      .expect(200);
  });
});
