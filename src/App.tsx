import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./views/Products";
import Report from "./views/Report";
import Login from "./views/Login";
import Cart from "./views/Cart";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/report" element={<Report />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
