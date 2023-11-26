import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Alert } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { setToken } from "../../utils/localStorage";
import userAPI from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import cx from "classnames";
import styles from "./Login.module.scss";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [loginError, setLoginError] = useState<string | null>(null);

  const schema = yup.object().shape({
    password: yup.string().required("Password is required"),
    username: yup.string().required("Username is required"),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setLoginError(null); // Reset login error

        userAPI
          .login(values.username, values.password)
          .then((res) => {
            setToken(res.token);
            login(res);
            navigate("/home");
          })
          .catch((err) => {
            console.error(err);
            setLoginError("Invalid username or password. Please try again.");
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
      initialValues={{
        password: "",
        username: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isValid }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
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

            <Form.Group as={Col} md="12" controlId="validationFormikPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          {loginError && <Alert variant="danger">{loginError}</Alert>}

          <Button type="submit" disabled={!isValid}>
            Login
          </Button>

          <p>
            Dont have an account?{" "}
            <span className={cx(styles.registerLink)} onClick={(e) => navigate("/register")}>Register</span>
          </p>

        </Form>
      )}
    </Formik>
  );
}

export default LoginPage;
