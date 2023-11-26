import React from "react";
import { Button } from "react-bootstrap";
import cx from "classnames";

interface VMPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const VMPagination: React.FC<VMPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className={cx("mt-3", "d-flex", "justify-content-center", "align-items-center")}>
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>{" "}
      <span className={cx("mx-3")}>Page {currentPage} of {totalPages}</span>
      <Button
        variant="secondary"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default VMPagination;
