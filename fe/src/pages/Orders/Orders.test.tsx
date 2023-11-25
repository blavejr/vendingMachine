import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Orders from "./Orders";
import buyAPI from "../../api/buy";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../api/buy");

const mockOrders = [
  {
    _id: "6561d8cbbd31e8ec42778013",
    productId: {
      _id: "656216496381cdf3c94d6018",
      amountAvailable: 35,
      cost: 10,
      productName: "fanta",
      image:
        "https://banner2.cleanpng.com/20180516/uge/kisspng-fanta-fizzy-drinks-sprite-coca-cola-orange-soft-dr-5afc51fabb8917.6200781615264854987682.jpg",
      sellerId: "65616ce394184915d9664327",
      created_at: "2023-11-25T17:36:00.707Z",
      updated_at: "2023-11-25T17:36:00.707Z",
      __v: 0,
    },
    buyerId: "65616bf98efa03ab3f02d953",
    sellerId: "65616ce394184915d9664327",
    created_at: "2023-11-25T17:36:00.714Z",
    updated_at: "2023-11-25T17:36:00.714Z",
    __v: 0,
  },
  {
    _id: "6561d8cfbd31e8ec42778024",
    productId: {
      _id: "656216496381cdf3c94d6016",
      amountAvailable: 35,
      cost: 10,
      productName: "biltong",
      image:
        "https://www.checkers.co.za/medias/10158607EA-20190726-Media-checkers300Wx300H?context=bWFzdGVyfGltYWdlc3wxMDIwODh8aW1hZ2UvcG5nfGltYWdlcy9oNGEvaDZlLzg4NTgwMDkxNDEyNzgucG5nfDQxMTYwN2ZiNmUyNWVlOGFkYmQ5ODAxOWZjZDE5ZGJlY2UyMGEzYjVkOWJjYmE1ZTljY2E0ZTVhNDJiYWMwZWQwNGU",
      sellerId: "65616ce394184915d9664327",
      created_at: "2023-11-25T17:36:00.706Z",
      updated_at: "2023-11-25T17:36:00.706Z",
      __v: 0,
    },
    buyerId: "65616bf98efa03ab3f02d953",
    sellerId: "65616ce394184915d9664327",
    created_at: "2023-11-25T17:36:00.715Z",
    updated_at: "2023-11-25T17:36:00.715Z",
    __v: 0,
  },
];

beforeEach(() => {
  (buyAPI.getAll as jest.Mock).mockReset();
  (buyAPI.getAll as jest.Mock).mockResolvedValue(mockOrders);
});

test("renders orders with correct information", async () => {
  render(
    <BrowserRouter>
      <Orders />
    </BrowserRouter>
  );

  await waitFor(() => screen.getByText("fanta : 11/25/2023, 5:36:00 PM"));

  expect(
    screen.getByText("Order ID: 6561d8cbbd31e8ec42778013")
  ).toBeInTheDocument();
  expect(screen.getAllByText("Cost: 10")).toHaveLength(mockOrders.length);
  expect(
    screen.getByAltText(mockOrders[0].productId.productName)
  ).toBeInTheDocument();
});
