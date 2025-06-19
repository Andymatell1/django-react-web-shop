import { Container } from "react-bootstrap";
import "./bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

function App() {
  // id is optional here in cart url
  return (
    <div>
      <Header />

      <main className="py-3">
        <Container>
          <Routes>
            {/* all routes like the urls.py in django  */}
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/products/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
}

export default App;
