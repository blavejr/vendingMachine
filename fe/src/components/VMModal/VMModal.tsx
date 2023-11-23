import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import productsAPI from "../../api/product";

interface ModalProps {
  title?: string;
  buttonText?: string;
  isUpdate?: boolean;
  amountAvailable?: number;
  cost?: number;
  image?: string;
  productName?: string;
  productId?: string;
}

function VMModal({
  title = "Add Product",
  buttonText = "Add Product",
  isUpdate = false,
  amountAvailable,
  cost,
  image,
  productName,
  productId,
}: ModalProps) {
  const [show, setShow] = useState(false);

  const [product, setProduct] = useState({
    amountAvailable: amountAvailable || 0,
    cost: cost || 0,
    productName: productName || "",
    image: image || "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  
  const handleSubmit = () => {
    // Update product
    if (isUpdate && productId) {
      productsAPI
        .update(productId, product)
        .then((res: any) => {
          console.log(res);
          handleClose();
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      // Create product
      productsAPI
        .create(product)
        .then((res: any) => {
          console.log(res);
          handleClose();
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="modalForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Simba chips"
                autoFocus
                value={product.productName}
                onChange={handleChange}
                name="productName"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalForm.ControlInput2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="some Url...."
                autoFocus
                value={product.image}
                onChange={handleChange}
                name="image"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalForm.ControlInput3">
              <Form.Label>cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                autoFocus
                value={product.cost}
                onChange={handleChange}
                name="cost"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="modalForm.ControlInput4">
              <Form.Label>amountAvailable</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                autoFocus
                value={product.amountAvailable}
                onChange={handleChange}
                name="amountAvailable"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isUpdate ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VMModal;
