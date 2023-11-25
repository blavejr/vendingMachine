import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import { setToken, write } from "../../utils/localStorage";
import userAPI from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function LoginPage() {
  const { Formik } = formik;
  const navigate = useNavigate();
  const { login } = useUser();

  const schema = yup.object().shape({
    password: yup.string().required(),
    username: yup.string().required(),
  });

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        console.log(values);
        userAPI
          .login(values.username, values.password)
          .then((res) => {
            setToken(res.token);
            login(res);
            navigate("/home");
          })
          .catch((err) => {
            console.log(err);
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
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationFormik02">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" disabled={!isValid}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginPage;
