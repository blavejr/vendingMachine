import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { Roles } from "../../utils/user";

let globalToken: string;

// Mock user data for testing
export const mockSeller = {
  _id: new mongoose.Types.ObjectId("65616ce394184915d9664327"),
  name: "Seller Test",
  username: "aSell",
  password: "passWord1",
  deposit: 0,
  role: Roles.SELLER,
};

export const mockBuyer = {
  _id: new mongoose.Types.ObjectId("65616bf98efa03ab3f02d953"),
  name: "Buyer Test",
  username: "aBuy",
  password: "passWord1",
  deposit: 200,
  role: Roles.BUYER,
};

const mockUser = {
  _id: new mongoose.Types.ObjectId("65616bf98efa03ab3f02d933"),
  name: "mockUser Test",
  username: "mockUser",
  password: "passWord1",
  deposit: 200,
  role: Roles.BUYER,
};

beforeAll(async () => {
  await mongoose.connect("mongodb://mongo:27017/vendingMachine");
});

afterEach(async () => {});

afterAll(async () => {
  await mongoose.connection.close();
});

// Mock basic auth headers for testing
export const generateBasicAuthHeaders = (user: any) => {
  const base64Credentials = Buffer.from(
    `${user.username}:${user.password}`
  ).toString("base64");
  return `Basic ${base64Credentials}`;
};

// Mock JWT token extraction function for testing
export const extractJwtToken = (response: any) => {
  return response.body.token;
};

// Mock agent for testing
const agent = request.agent(app);
agent.set("Content-Type", "application/json");
agent.set("User-Agent", "Jest Test");

describe("User routes", () => {
  it("should create a new user", async () => {
    const response = await agent.post("/user").send(mockUser).expect(200);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(mockUser.name);
    expect(response.body.deposit).toBe(mockUser.deposit);
    expect(response.body.role).toBe(mockUser.role);
  });

  it("should login and get a JWT token", async () => {
    const response = await agent
      .get("/user")
      .set("Authorization", generateBasicAuthHeaders(mockUser))
      .expect(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.id).toBe(mockUser._id.toString());
    globalToken = extractJwtToken(response);
  });

  it("should reset user deposit", async () => {
    const response = await agent
      .get("/user/reset/deposit")
      .set("Authorization", `Bearer ${globalToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.deposit).toBe(0);
  });

  it("should get user details", async () => {
    const response = await agent
      .get(`/user/${mockUser._id.toString()}`)
      .set("Authorization", `Bearer ${globalToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(mockUser.name);
    expect(response.body.deposit).toBe(0); // Assuming deposit was reset
    expect(response.body.role).toBe(mockUser.role);
  });

  it("should update user details", async () => {
    const response = await agent
      .patch("/user")
      .set("Authorization", `Bearer ${globalToken}`)
      .send({
        name: "Updated TesterMan",
        deposit: 50,
      })
      .expect(200);
    mockUser.name = "Updated TesterMan";
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(mockUser.name);
    expect(response.body.deposit).toBe(50);
    expect(response.body.role).toBe(mockUser.role);
  });

  it("should delete user", async () => {
    const response = await agent
      .delete("/user")
      .set("Authorization", `Bearer ${globalToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.name).toBe("Updated TesterMan");
    expect(response.body.deposit).toBe(50);
    expect(response.body.role).toBe(mockUser.role);
  });

  it("should reset user sessions", async () => {
    const response = await agent
      .get("/user/reset/sessions")
      .set("Authorization", `Bearer ${globalToken}`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("All sessions deleted");
    expect(response.body.count).toBe(1);
  });
});
