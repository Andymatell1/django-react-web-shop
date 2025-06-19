import React, { useState, useEffect, Component } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { listProducts } from "../actions/productActions.js";
import Product from "../components/Product.js";
import Message from '../components/Message.js'

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts()); // so you have to call lsitproducts and it fired the state management thing
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
