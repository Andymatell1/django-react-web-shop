import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message.js";
import { getUserDetail, updateUser } from "../actions/userActions.js";
import { USER_RESET } from "../constants/userConstants.js";

function ProfileScreen() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ use correct name for nav - way to change location
  const location = useLocation(); // curr url

  const userDetail = useSelector((state) => state.userDetail);
  const { error, loading, user } = userDetail; // state is userDetail: user

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // state is userLogin: userInfo

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate; // state is userLogin: userInfo

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("sub");

    if (password !== confirmpassword) {
      setMessage("pswords do not match");
    } else {
      dispatch(
        updateUser({
          id: user._id,
          name: name,
          password: password,
          email: email,
        })
      );
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // ✅ navigate instead of history()
    } else {
      if (!user || !user.name || success) {
        // before and after
        dispatch({ type: USER_RESET });
        dispatch(getUserDetail("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, dispatch, user, userInfo, success]);

  return (
    <Row>
      <Col md={3}>
        <h2> User prof</h2>
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
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="passwordConfirm">
            <Form.Label>password Confirm</Form.Label>
            <Form.Control
              type="password"
              placeholder="password Confirm"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
        <h1>{email}</h1>
      </Col>
      <Col md={9}>
        <h2> Orders</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
