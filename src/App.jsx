import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function App() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [currentTab, setCurrentTab] = useState("login");
  const [currentToast, setCurrentToast] = useState({
    title: "",
    message: "",
  });
  const [formdata, setFormData] = useState({});

  const showToast = (t, m) => {
    setCurrentToast({
      title: t,
      message: m,
    });
    setShow(true);
  };

  const loginHandle = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      showToast("No Data", "Please provide a valid email and password");
      setValidated(true);
      return;
    }
    setValidated(true);

    const storedData = JSON.parse(localStorage.getItem("data"));
    if (!storedData) {
      console.log("No stored data found");
      return;
    }

    const formData = new FormData(event.target);
    const formObj = Object.fromEntries(formData.entries());

    console.log("Form Data:", formObj);
    console.log("Stored Data:", storedData);

    if (
      formObj.email === storedData.email &&
      formObj.password === storedData.password
    ) {
      showToast("Login Successful", "Last Login was at 56");
    } else {
      showToast("Login Unsuccessful", "Email & Password are not valid");
    }
  };

  const signupHandle = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      showToast("No Data", "Please provide a valid email and password");
      setValidated(true);
      return;
    }
    setValidated(true);

    const formData = new FormData(event.target);
    const formObj = Object.fromEntries(formData.entries());
    setFormData(formObj);
    localStorage.setItem("data", JSON.stringify(formObj));
    showToast("Registration Successful", "Please login into your account");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <Row className="wrapper elevated-card gap-1">
        <Col className="card-left">
          <div className="card-logo">
            <img src="src\assets\logo-removebg.png" alt="" srcSet="" />
          </div>
          {currentTab === "login" ? (
            <div className="card-content">
              <h1 className="card-content-title">New User</h1>
              <p className="card-content-subtitle">
                Great! Join The Community Of Neighbors And Friends.!
              </p>
              <Button
                type="button"
                onClick={() => {
                  document
                    .querySelector(".card-left")
                    .classList.add("translateX-card");
                  setCurrentTab("signup");
                  document
                    .querySelector(".card-right")
                    .classList.add("translateX-reverse-card");
                }}
                className="w-50 mt-2 bg-new-2"
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="card-content">
              <h1 className="card-content-title">Already Registered</h1>
              <p className="card-content-subtitle">
                WonderFul! Click here to login into your super app!
              </p>
              <Button
                type="button"
                onClick={() => {
                  document
                    .querySelector(".card-left")
                    .classList.remove("translateX-card");
                  document
                    .querySelector(".card-right")
                    .classList.remove("translateX-reverse-card");

                  setCurrentTab("login");
                }}
                className="w-50 mt-2 bg-new-2"
              >
                Login
              </Button>
            </div>
          )}
        </Col>
        <Col className="card-right my-2">
          {currentTab === "login" ? (
            <Form noValidate validated={validated} onSubmit={loginHandle}>
              <div className="form-header mb-5">
                <h1 className="form-title">Loign</h1>
                <p className="form-subtile">
                  Welcome back! Please login to your account
                </p>
              </div>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className="input-label">Email address</Form.Label>
                <Form.Control
                  required
                  name="email"
                  className="input-field shadow-none"
                  type="email"
                  placeholder="user@gmail.com"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter email.
                </Form.Control.Feedback>
                <Form.Control.Feedback></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="input-label">Password</Form.Label>
                <Form.Control
                  required
                  name="password"
                  className="input-field shadow-none"
                  type="password"
                  placeholder="*******"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter password.
                </Form.Control.Feedback>
              </Form.Group>
              <div className="form-middle my-1">
                <Form.Check
                  type="checkbox"
                  label="Remember Me"
                  id="default-checkbox"
                  className="form-checkbox"
                />
                <p className="form-forget-pass">Forget password!</p>
              </div>
              <Button type="submit" className="w-100 mt-2 bg-new">
                Login
              </Button>
            </Form>
          ) : (
            <Form className="mx-2" noValidate validated={validated} onSubmit={signupHandle}>
              <div className="form-header mb-5">
                <h1 className="form-title">Sign Up</h1>
                <p className="form-subtile">
                  New here! Please sign in to experience the awesome features.
                </p>
              </div>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className="input-label">Email address</Form.Label>
                <Form.Control
                  required
                  name="email"
                  className="input-field shadow-none"
                  type="email"
                  placeholder="user@gmail.com"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter email.
                </Form.Control.Feedback>
                <Form.Control.Feedback></Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="input-label">Password</Form.Label>
                <Form.Control
                  required
                  name="password"
                  className="input-field shadow-none"
                  type="password"
                  placeholder="*******"
                />
                <Form.Control.Feedback type="invalid">
                  Please enter password.
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="w-100 mt-2 bg-new">
                Sign Up
              </Button>
            </Form>
          )}
        </Col>
      </Row>
      <ToastContainer
        className="p-3"
        position="bottom-end"
        style={{ zIndex: 3 }}
      >
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header closeButton={true}>
            <img
              src="src\assets\logo-removebg.png"
              className="rounded me-2 toast-icon"
              alt=""
            />
            <strong className="me-auto">{currentToast.title}</strong>
          </Toast.Header>
          <Toast.Body>{currentToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default App;

// TO-DO
// toast-dynamic
// input-Onchange Validation
// Handle-multiple user Login
// Responsive UI**
