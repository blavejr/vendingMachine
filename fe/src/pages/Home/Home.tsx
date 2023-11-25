import React, { useEffect } from "react";
import userAPI from "../../api/user";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import productsAPI from "../../api/product";
import buyAPI from "../../api/buy";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import VMNavbar from "../../components/VMNavbar/VMNavbar";
import cx from "classnames";
import loading from "../../loading.jpg";
import { useUser } from "../../context/UserContext";

interface Product {
  id: string;
  amountAvailable: number;
  cost: number;
  productName: string;
  sellerId: string;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const { user, logout, setUserData } = useUser();
  const [products, setProducts] = React.useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    productsAPI
      .getAll()
      .then((res) => {
        setProducts(res.products);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          logout();
          navigate("/");
        }
      });
  }, []);

  const handleBuy = (productCost: number, productId: string) => {
    if (user?.role === "seller" && user?.deposit > productCost) {
      return alert("You cannot buy with seller account");
    }
    buyAPI
      .create(productId, 1)
      .then((res) => {
        alert("Product bought successfully");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Error buying product");
      });
  };

  return (
    <div>
      <VMNavbar
      />
      <Row>
        {!products ? (
          <img src={loading} alt="loading animation" />
        ) : (
          products.map((product: Product) => (
            <Col lg={3} md={6} xs={12}>
              {user && (
                <ProductCard
                  {...product}
                  userId={user.id}
                  userRole={user.role}
                  handleBuy={handleBuy}
                />
              )}
            </Col>
          ))
        )}
      </Row>
    </div>
  );
}
