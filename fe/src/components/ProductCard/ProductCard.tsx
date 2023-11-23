import React, { FC } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import VMModal from "../VMModal/VMModal";
import styles from "./ProductCard.module.scss";
import cx from "classnames";
import buyAPI from "../../api/buy";

interface ProductCardProps {
  amountAvailable: number;
  cost: number;
  productName: string;
  sellerId: string;
  id: string;
  userId: string;
  userRole?: string;
  image?: string;
  handleBuy: (productCost: number, productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  amountAvailable,
  cost,
  productName,
  id,
  userId,
  sellerId = "@seller",
  userRole = "buyer",
  image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fcocacola%2Fcoca_cola_PNG8910.png&f=1&nofb=1&ipt=b64e2024e140993ad84936b2c6974c0c6dc58d775dc2a7b89f436c6398044c72&ipo=images",
  handleBuy,
}) => {
  return (
    <Card className={cx(styles.productCard, "my-2")} style={{ width: "18rem" }}>
      <Card.Img
        className={cx(styles.productCardImg, "m-5")}
        variant="top"
        src={image}
        alt={productName}
      />
      <Card.Body>
        <Card.Title>{productName}</Card.Title>
        <Card.Text>sellerId: {sellerId}</Card.Text>
        <Card.Text>productId: {id}</Card.Text>
        <Card.Text>Available: {amountAvailable}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Price: N${cost}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link onClick={(e)=>handleBuy(cost, id)} className="mx-2">
          Buy
        </Card.Link>
        {userRole === "seller" && sellerId === userId && (
          <VMModal
            title="Update Product"
            buttonText="Update"
            isUpdate={true}
            amountAvailable={amountAvailable}
            cost={cost}
            image={image}
            productName={productName}
            productId={id}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
