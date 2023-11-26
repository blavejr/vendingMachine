import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import productsAPI from "../../api/product";
import buyAPI from "../../api/buy";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import VMNavbar from "../../components/VMNavbar/VMNavbar";
import loading from "../../loading.jpg";
import { useUser } from "../../context/UserContext";
import VMPagination from "../../components/VMPagination/VMPagination";

interface Product {
  id: string;
  amountAvailable: number;
  cost: number;
  productName: string;
  sellerId: string;
  created_at: string;
  updated_at: string;
}

const PRODUCTS_PER_PAGE = 3;

interface PageState {
  products: any[];
  currentPage: number;
  totalPages: number;
}

const Home: React.FC = () => {
  const { user, logout } = useUser();
  const [pageState, setPageState] = useState<PageState>({
    products: [],
    currentPage: 1,
    totalPages: 1,
  });
  const navigate = useNavigate();

  const fetchProducts = async (page: number) => {
    try {
      const res = await productsAPI.getAll(page, PRODUCTS_PER_PAGE);
      setPageState((prevState) => ({
        ...prevState,
        products: res.products,
        totalPages: res.totalPages,
      }));
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        logout();
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchProducts(pageState.currentPage);
  }, [pageState.currentPage]);

  const handlePageChange = (newPage: number) => {
    setPageState((prevState) => ({
      ...prevState,
      currentPage: newPage,
    }));
  };

  const handleBuy = async (productCost: number, productId: string) => {
    try {
      if (user?.role === "seller" && user?.deposit > productCost) {
        return alert("You cannot buy with a seller account");
      }

      await buyAPI.create(productId, 1);
      alert("Product bought successfully");

      fetchProducts(pageState.currentPage);
    } catch (error) {
      console.error(error);
      alert("Error buying product");
    }
  };

  return (
    <Container>
      <VMNavbar />
      <Row xs={1} md={2} lg={3} xl={4} className="justify-content-center">
        {!pageState.products ? (
          <img src={loading} alt="loading animation" />
        ) : (
          pageState.products.map((product: Product) => (
            <Col key={product.id} className="mb-4">
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

      <VMPagination
        currentPage={pageState.currentPage}
        totalPages={pageState.totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default Home;
