import React, { useEffect, useState } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import buyAPI from "../../api/buy";
import VMNavbar from "../../components/VMNavbar/VMNavbar";

export default function Orders() {
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    buyAPI
      .getAll()
      .then((res) => {
        setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <VMNavbar />
      <h2>Your Orders</h2>
      <Accordion defaultActiveKey={"0"}>
        {orders &&
          orders.map((order: any, index: number) => (
            <Accordion.Item eventKey={String(index)}>
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
    </div>
  );
}
