import React, { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import buyAPI from "../../api/buy";
import VMNavbar from "../../components/VMNavbar/VMNavbar";
import VMPagination from "../../components/VMPagination/VMPagination";

interface Order {
  _id: string;
  productId: {
    productName: string;
    cost: number;
    image: string;
  };
  created_at: string;
}

interface OrdersState {
  orders: Order[];
  currentPage: number;
  totalPages: number;
}

const Orders: React.FC = () => {
  const [ordersState, setOrdersState] = useState<OrdersState>({
    orders: [],
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    fetchOrders(ordersState.currentPage);
  }, [ordersState.currentPage]);

  const fetchOrders = async (page: number) => {
    try {
      const res = await buyAPI.getAll(page);
      setOrdersState((prevState) => ({
        ...prevState,
        orders: res.purchases,
        totalPages: res.totalPages,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setOrdersState((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
  };

  return (
    <div>
      <VMNavbar />
      <h2>Your Orders</h2>
      <Accordion defaultActiveKey={"0"}>
        {ordersState.orders.map((order: Order, index: number) => (
          <Accordion.Item key={order._id} eventKey={String(index)}>
            <Accordion.Header as={Button} variant="link">
              {order.productId.productName} :{" "}
              {new Date(order.created_at).toLocaleString()}
            </Accordion.Header>
            <Accordion.Body>
              <p>Order ID: {order._id}</p>
              <p>Cost: {order.productId.cost}</p>
              <p>created_at: {new Date(order.created_at).toLocaleString()}</p>
              <img
                src={order.productId.image}
                alt={order.productId.productName}
                style={{ maxWidth: "100px" }}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      
      <VMPagination
        currentPage={ordersState.currentPage}
        totalPages={ordersState.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Orders;
