import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import userAPI from "../../api/user";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/localStorage";

function Register() {
  const navigate = useNavigate();
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .matches(/^[A-Za-z\- ]+$/, "First name is not valid")
      .required("First name is required"),
    lastName: yup
      .string()
      .matches(/^[A-Za-z\- ]+$/, "Last name is not valid")
      .required("Last name is required"),
    username: yup
      .string()
      .matches(/^[a-zA-Z0-9_-]+$/, "Username is not valid")
      .required("Username is required"),
    password: yup
      .string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/, "Password is not valid")
      .required("Password is required"),
    role: yup.boolean().required().default(false),
    deposit: yup.number().required().default(0),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  interface FormValues {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: boolean;
    terms: boolean;
  }

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    userAPI.register({
      name: `${values.firstName} ${values.lastName}`,
      username: values.username,
      password: values.password,
      role: values.role ? "seller" : "buyer",
      deposit: 0,
    }).then((res) => {
      // save token to local storage
      // TODO: Save a JWT token from the response instead but for now this works
      setToken(res.username, values.password);
      navigate("/home")
    }).catch((err) => {
      console.log(err);
    });
    
    setSubmitting(false);
    
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
            <Form.Group as={Col} md="6" controlId="validationFormikFirstName">
              <Form.Label>First name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Remigius"
                  aria-describedby="inputGroupPrepend"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationFormikLastName">
              <Form.Label>Last Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Kalimba"
                  aria-describedby="inputGroupPrepend"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md="12" controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="remz"
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

            <Form.Group as={Col} md="12" controlId="validationFormikUsername">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Register as a Seller?"
              name="role" // Add a name attribute
              onChange={handleChange}
              checked={values.role} // Use checked instead of value
            />
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit" disabled={!isValid}>
            Submit form
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
