import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AccountPage from "./AccountPage";
import Cart from "./cart";
import AdminDashboard from "./AdminDashboard";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<OrderSuccess />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
