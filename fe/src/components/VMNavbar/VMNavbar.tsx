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

interface NavbarProps {
  username: string;
  deposit: number;
  role: string;
}

function VMNavbar({ username, deposit, role }: NavbarProps) {
  const navigate = useNavigate();

  const handleDeposit = (e:any, deposit: number) => {
    depositAPI.deposit(deposit).then((res) => {
      console.log(res);
      window.location.reload();
    }
    ).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <Navbar className={cx("bg-body-tertiary", "my-3")}>
        <Container>
            <Button className="mx-2">
              {/* TODO: Make this a loop */}
                <NavDropdown title="Deposit" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={(e)=>handleDeposit(e, 5)} >5</NavDropdown.Item>
                  <NavDropdown.Item onClick={(e)=>handleDeposit(e, 10)} >10</NavDropdown.Item>
                  <NavDropdown.Item onClick={(e)=>handleDeposit(e, 20)} >20</NavDropdown.Item>
                  <NavDropdown.Item onClick={(e)=>handleDeposit(e, 50)} >50</NavDropdown.Item>
                  <NavDropdown.Item onClick={(e)=>handleDeposit(e, 100)} >100</NavDropdown.Item>
                </NavDropdown>
              </Button>
            {role === "seller" && <VMModal />}
          <Navbar.Brand className="mx-2">N$ {deposit}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Row>
              <Nav className="me-auto">
                <NavDropdown title={username} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={
                    () => {
                      localStorage.clear();
                      navigate("/");
                    }
                  } >Logout</NavDropdown.Item>
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
