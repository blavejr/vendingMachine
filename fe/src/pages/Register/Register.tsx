import React from "react";
import { Button, Col, Form, InputGroup, Row, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import userAPI from "../../api/user";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/localStorage";
import cx from "classnames";
import styles from "./Register.module.scss";

function Register() {
  const [registerError, setRegisterError] = React.useState<{
    details: Array<string>;
    error: string;
  } | null>(null);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .matches(
        /^[A-Za-z\- ]+$/,
        "First name should only contain letters, hyphens, and spaces"
      )
      .required("First name is required"),
    lastName: yup
      .string()
      .matches(
        /^[A-Za-z\- ]+$/,
        "Last name should only contain letters, hyphens, and spaces"
      )
      .required("Last name is required"),
    username: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_-]+$/,
        "Username should only contain letters, numbers, underscores, and hyphens"
      )
      .required("Username is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
        "Password should be at least 5 characters long and include at least one lowercase letter, one uppercase letter, and one number"
      )
      .required("Password is required"),
    role: yup.boolean().required().default(false),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      const response = await userAPI.register({
        name: `${values.firstName} ${values.lastName}`,
        username: values.username,
        password: values.password,
        role: values.role ? "seller" : "buyer",
        deposit: 0,
      });
      setToken(response.token);
      navigate("/login");
    } catch (error: any) {
      setRegisterError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: false,
        terms: false,
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isValid }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="validationFormikFirstName">
                <Form.Label>First name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Remigius"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isInvalid={touched.firstName && !!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md="6">
              <Form.Group controlId="validationFormikLastName">
                <Form.Label>Last Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Kalimba"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isInvalid={touched.lastName && !!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="validationFormikUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="remz"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="validationFormikPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Register as a Seller?"
              name="role"
              onChange={handleChange}
              checked={values.role}
            />
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={touched.terms && !!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
            />
          </Form.Group>

          {errors.firstName && (
            <Alert variant="danger">{errors.firstName}</Alert>
          )}
          {errors.lastName && <Alert variant="danger">{errors.lastName}</Alert>}
          {errors.username && <Alert variant="danger">{errors.username}</Alert>}
          {errors.password && <Alert variant="danger">{errors.password}</Alert>}
          {errors.terms && <Alert variant="danger">{errors.terms}</Alert>}
          {registerError?.details &&
            registerError?.details.map((detail) => (
              <Alert variant="danger">{detail}</Alert>
            ))}

          <Button type="submit" disabled={!isValid}>
            Submit form
          </Button>

          <p>
            Already a have an account{" "}
            <span className={cx(styles.loginLink)} onClick={(e) => navigate("/login")}>login</span>
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
