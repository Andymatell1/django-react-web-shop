import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer.js";
import CheckoutSteps from "../components/CheckoutSteps.js";

import { saveShippingAddress } from "../actions/cartActions.js";

function ShippingScreen() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const shippingFromState = cart?.shippingAddress || {}; // before this was returning nothing even tho shippingAddress had a vaue in the state, weird

  console.log("shippingFromState", shippingFromState.address);
  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingFromState?.address || "");
  const [city, setCity] = useState(shippingFromState?.city || "");
  const [postal, setPostal] = useState(shippingFromState?.postal || "");
  const [country, setCountry] = useState(shippingFromState?.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("hi");
    dispatch(saveShippingAddress({ address, city, postal, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postal">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="postal code"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
