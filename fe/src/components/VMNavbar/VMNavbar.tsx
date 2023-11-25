import react from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Nav, NavDropdown } from "react-bootstrap";
import cx from "classnames";
import VMModal from "../VMModal/VMModal";
import { useNavigate } from "react-router-dom";
import depositAPI from "../../api/deposit";
import userAPI from "../../api/user";
import { useUser } from "../../context/UserContext";

function VMNavbar() {
  const navigate = useNavigate();
  const { user } = useUser();
  console.log(user);
  const handleDeposit = (e: any, deposit: number) => {
    depositAPI
      .deposit(deposit)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetDeposit = () => {
    depositAPI
      .resetDeposit()
      .then((res: any) => {
        window.location.reload();
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar className={cx("bg-body-tertiary", "my-3")}>
        <Container>
          <Navbar.Brand onClick={() => navigate("/home")} className="mx-2">
            Vending Machine
          </Navbar.Brand>
          <Button className="mx-2">
            {/* TODO: Make this a loop */}
            <NavDropdown title="Deposit" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={(e) => handleDeposit(e, 5)}>
                5
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => handleDeposit(e, 10)}>
                10
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => handleDeposit(e, 20)}>
                20
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => handleDeposit(e, 50)}>
                50
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => handleDeposit(e, 100)}>
                100
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => resetDeposit()}>
                reset
              </NavDropdown.Item>
            </NavDropdown>
          </Button>
          {user?.role === "seller" && <VMModal />}
          <Navbar.Brand className="mx-2">N$ {user?.deposit}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Row>
              <Nav className="me-auto">
                <NavDropdown title={user?.username} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => navigate("/orders")}>
                    Orders
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => {
                      localStorage.clear();
                      navigate("/");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    onClick={() => {
                      userAPI
                        .logoutAll()
                        .then((res: any) => {
                          localStorage.clear();
                          navigate("/");
                        })
                        .catch((err: Error) => {
                          console.log(err);
                        });
                    }}
                  >
                    Logout All devices
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default VMNavbar;
