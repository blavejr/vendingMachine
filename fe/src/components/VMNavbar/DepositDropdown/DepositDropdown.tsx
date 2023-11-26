import React, { FC } from "react";
import { Button, NavDropdown } from "react-bootstrap";

interface DepositDropdownProps {
  onDeposit: (e: any, deposit: number) => void;
  onReset: () => void;
}

const DepositDropdown: FC<DepositDropdownProps> = ({ onDeposit, onReset }) => {
  return (
    <Button className="mx-2">
      <NavDropdown title="Deposit" id="basic-nav-dropdown">
        <NavDropdown.Item onClick={(e) => onDeposit(e, 5)}>N$ 5</NavDropdown.Item>
        <NavDropdown.Item onClick={(e) => onDeposit(e, 10)}>N$ 10</NavDropdown.Item>
        <NavDropdown.Item onClick={(e) => onDeposit(e, 20)}>N$ 20</NavDropdown.Item>
        <NavDropdown.Item onClick={(e) => onDeposit(e, 50)}>N$ 50</NavDropdown.Item>
        <NavDropdown.Item onClick={(e) => onDeposit(e, 100)}>N$ 100</NavDropdown.Item>
        <NavDropdown.Item onClick={onReset}>reset</NavDropdown.Item>
      </NavDropdown>
    </Button>
  );
};

export default DepositDropdown;
