import React, { useEffect } from "react";
import userAPI from "../../api/user";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import productsAPI from "../../api/product";
import { read, write } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import VMNavbar from "../../components/VMNavbar/VMNavbar";
import cx from "classnames";

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
  const [user, setUser] = React.useState<any>(read("user") || null);
  const [products, setProducts] = React.useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }

    // Load all products
    productsAPI
      .getAll()
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    userAPI
      .getUser(user?.id)
      .then((res) => {
        setUser(res);
        write("user", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <VMNavbar username={user?.name} deposit={user?.deposit} role={user?.role} />
      <Row>
        {products &&
          products?.items?.map((product: Product) => (
            <Col lg={3} md={6} xs={12}>
              <ProductCard {...product} userId={user?.id} userRole={user?.role}/>
            </Col>
          ))}
      </Row>
    </div>
  );
}
