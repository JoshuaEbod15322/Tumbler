import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  Truck,
  CreditCard,
  Lock,
  Shield,
  CheckCircle,
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Insulated Stainless Tumbler",
      size: "20oz",
      price: 34.99,
      quantity: 1,
      imageColor: "#2C3E50",
      category: "Stainless",
      inStock: true,
    },
    {
      id: 2,
      name: "Travel Mug",
      size: "16oz",
      price: 42.99,
      quantity: 2,
      imageColor: "#27AE60",
      category: "Outdoor",
      inStock: true,
    },
    {
      id: 3,
      name: "Sports Water Bottle",
      size: "24oz",
      price: 19.99,
      quantity: 1,
      imageColor: "#3498DB",
      category: "Plastic",
      inStock: true,
    },
  ]);

  const shippingOptions = [
    {
      id: 1,
      name: "Standard Shipping",
      price: 4.99,
      days: "5-7 business days",
    },
    { id: 2, name: "Express Shipping", price: 9.99, days: "2-3 business days" },
    { id: 3, name: "Next Day Delivery", price: 19.99, days: "1 business day" },
  ];

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) =>
    setCartItems(cartItems.filter((item) => item.id !== id));
  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const calculateTotal = () =>
    calculateSubtotal() + selectedShipping.price + calculateSubtotal() * 0.08;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <ShoppingCart className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-1">
                {cartItems.length} items in your cart
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow w-full md:w-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Shop
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center max-w-lg mx-auto">
            <ShoppingCart className="w-16 h-16 md:w-20 md:h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some amazing tumblers to your cart!
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">
                    Cart Items
                  </h2>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                    {cartItems.length} items
                  </span>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Item Image */}
                        <div
                          className="relative w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0"
                          style={{ backgroundColor: item.imageColor }}
                        >
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                            {item.category}
                          </div>
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-bold">
                            {item.size}
                          </div>
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {item.name}
                              </h3>
                              <div className="flex flex-wrap gap-2 items-center mb-4">
                                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-bold border border-blue-200">
                                  {item.size}
                                </div>
                                {item.inStock ? (
                                  <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                                    <CheckCircle className="w-4 h-4" /> In Stock
                                  </span>
                                ) : (
                                  <span className="text-red-600 text-sm font-medium">
                                    Out of Stock
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-lg font-bold text-blue-600 mb-1">
                                ${item.price.toFixed(2)}
                              </div>
                              <div className="text-xl font-bold text-green-600">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                              >
                                <Minus className="w-4 h-4 text-gray-700" />
                              </button>
                              <span className="min-w-[40px] text-center font-semibold text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                              >
                                <Plus className="w-4 h-4 text-gray-700" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors duration-200 font-medium"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                  <div className="flex items-center gap-2 text-green-600 font-semibold text-sm">
                    <Lock className="w-4 h-4" />
                    Secure Checkout
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Shipping</span>
                      <span className="font-semibold">
                        ${selectedShipping.price.toFixed(2)}
                      </span>
                    </div>
                    <select
                      value={selectedShipping.id}
                      onChange={(e) =>
                        setSelectedShipping(
                          shippingOptions.find(
                            (opt) => opt.id === parseInt(e.target.value)
                          )
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      {shippingOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Estimated Tax</span>
                    <span>${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          ${calculateTotal().toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Includes ${(calculateSubtotal() * 0.08).toFixed(2)} in
                          taxes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl mb-4"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <p className="text-center text-gray-500 text-sm mb-4">
                  All major payment methods accepted
                </p>

                <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  {[Shield, Lock, Package].map((Icon, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center text-gray-600"
                    >
                      <Icon className="w-5 h-5 text-blue-600 mb-1" />
                      <span className="text-xs font-medium">
                        {["SSL Secure", "Encrypted", "Guarantee"][idx]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-blue-600" />
                  Shipping Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      {selectedShipping.name}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {selectedShipping.days}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700 font-medium">
                    Free shipping on orders over $50
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
