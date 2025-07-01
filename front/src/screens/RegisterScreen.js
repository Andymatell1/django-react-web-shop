import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message.js";
import FormContainer from "../components/FormContainer.js";
import { Register } from "../actions/userActions.js";

function RegisterScreen() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ use correct name for nav - way to change location
  const location = useLocation(); // curr url

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/"; // dynamically change the redirect link

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("sub");

    if (password !== confirmpassword) {
      setMessage("pswords do not match");
    } else {
      dispatch(Register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // ✅ navigate instead of history()
    }
  }, [navigate, userInfo, redirect]);

  return (
    <FormContainer>
      <h1>Reg</h1>
      {message && <Message variant={"danger"}>{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <h1>Loading...</h1>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>name</Form.Label>
          <Form.Control
            type="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Addr</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="passwordConfirm">
          <Form.Label>password Confirm</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password Confirm"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have Account{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
