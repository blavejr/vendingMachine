import React, { FC, useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import cx from "classnames";
import VMModal from "../VMModal/VMModal";
import { useNavigate } from "react-router-dom";
import depositAPI from "../../api/deposit";
import userAPI from "../../api/user";
import { useUser, User } from "../../context/UserContext";
import DepositDropdown from "./DepositDropdown/DepositDropdown";
import UserActions from "./UserActions/UserActions";
import styles from './VMNavbar.module.scss';

interface VMNavbarProps {}

const VMNavbar: FC<VMNavbarProps> = () => {
  const navigate = useNavigate();
  const { user, setUserData } = useUser();
  const [deposit, setDeposit] = useState<number>(user?.deposit || 0);

  const handleDeposit = (e: any, depositAmount: number) => {
    depositAPI
      .deposit(depositAmount)
      .then((res) => {
        setUserData({ ...user!, deposit: res.deposit + depositAmount });
        setDeposit((prevDeposit) => prevDeposit + depositAmount);
      })
      .catch((err) => {
        console.error("Error depositing:", err);
        alert("Error depositing. Please try again.");
      });
  };

  const resetDeposit = () => {
    depositAPI
      .resetDeposit()
      .then((res) => {
        setUserData({ ...user!, deposit: res!.deposit });
        setDeposit(0);
      })
      .catch((err: Error) => {
        console.error("Error resetting deposit:", err);
        alert("Error resetting deposit. Please try again.");
      });
  };

  const handleLogoutAll = () => {
    userAPI
      .logoutAll()
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((err: Error) => {
        console.error("Error logging out all devices:", err);
        alert("Error logging out all devices. Please try again.");
      });
  };

  useEffect(() => {
    setDeposit(user?.deposit || 0);
  }, [user?.deposit]);

  return (
    <div>
      <Navbar className={cx("bg-body-tertiary", "p-3", "my-3")}>
        <Container>
          <Navbar.Brand onClick={() => navigate("/home")} className={cx(styles.homeBrand, "mx-2")}>
            Vending Machine
          </Navbar.Brand>
          <DepositDropdown onDeposit={handleDeposit} onReset={resetDeposit} />
          {user?.role === "seller" && <VMModal />}
          <Navbar.Brand className={cx("mx-2")}>N$ {deposit}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <UserActions
              username={user!.username}
              onLogout={() => navigate("/")}
              onLogoutAll={handleLogoutAll}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default VMNavbar;
