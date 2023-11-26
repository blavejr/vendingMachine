import React, { FC } from "react";
import { NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface UserActionsProps {
  username: string;
  onLogout: () => void;
  onLogoutAll: () => void;
}

const UserActions: FC<UserActionsProps> = ({
  username,
  onLogout,
  onLogoutAll,
}) => {
  const navigate = useNavigate();
  return (
    <NavDropdown title={username} id="basic-nav-dropdown">
      <NavDropdown.Item onClick={() => navigate("/orders")}>
        Orders
      </NavDropdown.Item>
      <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
      <NavDropdown.Item onClick={onLogoutAll}>
        Logout All devices
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default UserActions;
