import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  ChevronDown,
  X,
  Minus,
  Plus,
  Check,
  Menu,
  CheckCircle,
  Filter,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // State declarations
  const [products] = useState([
    {
      id: 1,
      name: "Insulated Tumbler",
      feature: "Keeps drinks hot/cold for hours",
      category: "Stainless",
      price: 34.99,
      color: "#2C3E50",
      imageUrl:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      sizes: ["12oz", "16oz", "20oz", "24oz"],
      availableSizes: ["16oz", "20oz", "24oz"],
      inStock: true,
    },
    {
      id: 2,
      name: "Travel Mug",
      feature: "Leak-proof with ergonomic handle",
      category: "Outdoor",
      price: 42.99,
      color: "#27AE60",
      imageUrl:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
      sizes: ["12oz", "16oz"],
      availableSizes: ["12oz", "16oz"],
      inStock: true,
    },
    {
      id: 3,
      name: "Sports Bottle",
      feature: "BPA-free with carrying loop",
      category: "Plastic",
      price: 19.99,
      color: "#3498DB",
      imageUrl:
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&h=600&fit=crop",
      sizes: ["24oz", "32oz", "40oz"],
      availableSizes: ["24oz", "32oz"],
      inStock: true,
    },
    {
      id: 4,
      name: "Double Wall Cup",
      feature: "Premium ceramic-coated design",
      category: "Stainless",
      price: 29.99,
      color: "#E74C3C",
      imageUrl:
        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=600&fit=crop",
      sizes: ["8oz", "12oz", "16oz"],
      availableSizes: ["12oz", "16oz"],
      inStock: true,
    },
    {
      id: 5,
      name: "Camping Bottle",
      feature: "Rugged with carabiner clip",
      category: "Outdoor",
      price: 39.99,
      color: "#D35400",
      imageUrl:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
      sizes: ["32oz", "40oz", "64oz"],
      availableSizes: ["32oz", "64oz"],
      inStock: false,
    },
    {
      id: 6,
      name: "Reusable Tumbler",
      feature: "Eco-friendly with bamboo lid",
      category: "Plastic",
      price: 14.99,
      color: "#E84393",
      imageUrl:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop",
      sizes: ["16oz", "20oz"],
      availableSizes: ["16oz", "20oz"],
      inStock: true,
    },
  ]);

  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const brandDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileFiltersRef = useRef(null);

  // Brands and Categories data
  const brands = ["HydroFlask", "Yeti", "Stanley", "Contigo", "CamelBak"];
  const categories = ["Outdoor", "Stainless", "Plastic", "Accessories"];

  // Filtered products based on selections
  const filteredProducts = products.filter((product) => {
    if (
      selectedBrand &&
      !product.name.toLowerCase().includes(selectedBrand.toLowerCase())
    )
      return false;
    if (selectedCategory && product.category !== selectedCategory) return false;
    return true;
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        brandDropdownRef.current &&
        !brandDropdownRef.current.contains(event.target)
      ) {
        setShowBrandDropdown(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        mobileFiltersRef.current &&
        !mobileFiltersRef.current.contains(event.target) &&
        !event.target.closest(".filter-toggle")
      ) {
        setShowMobileFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-hide notification
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleAccountClick = () => {
    navigate("/account");
    setIsMobileMenuOpen(false);
  };

  const openAddToCartModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.availableSizes[0] || "");
    setQuantity(1);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSize("");
    setQuantity(1);
  };

  const handleSizeSelect = (size) => {
    if (selectedProduct.availableSizes.includes(size)) {
      setSelectedSize(size);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 20) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setNotificationMessage("Please select a size");
      setShowNotification(true);
      return;
    }

    const message = `Added ${quantity}x ${selectedProduct.name} (${selectedSize}) to cart!`;
    setNotificationMessage(message);
    setShowNotification(true);
    closeModal();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand === selectedBrand ? null : brand);
    setShowBrandDropdown(false);
    setShowMobileFilters(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setShowCategoryDropdown(false);
    setShowMobileFilters(false);
  };

  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setShowMobileFilters(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Notification Modal */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slideIn">
          <div className="bg-green-50 border border-green-200 rounded-xl shadow-lg p-4 flex items-center gap-3 min-w-[300px]">
            <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
            <div className="flex-1">
              <p className="text-green-800 font-medium">
                {notificationMessage}
              </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-green-600 hover:text-green-800"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 lg:px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-blue-600 lg:text-2xl">
            DrinksCart
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <a
              href="#Home"
              className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1 px-2"
            >
              Home
            </a>
            <a
              href="#Shop"
              className="text-gray-600 font-medium hover:text-blue-600 transition px-2"
            >
              Shop
            </a>

            {/* Brand Dropdown */}
            <div className="relative" ref={brandDropdownRef}>
              <button
                className={`flex items-center gap-1 font-medium px-2 transition ${
                  selectedBrand
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => {
                  setShowBrandDropdown(!showBrandDropdown);
                  setShowCategoryDropdown(false);
                }}
              >
                Brand{" "}
                <ChevronDown
                  size={16}
                  className={showBrandDropdown ? "rotate-180 transition" : ""}
                />
              </button>
              {showBrandDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleBrandSelect(brand)}
                      className={`w-full text-left px-4 py-2 flex items-center justify-between transition-all ${
                        selectedBrand === brand
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                    >
                      {brand}
                      {selectedBrand === brand && (
                        <Check size={16} className="text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="relative" ref={categoryDropdownRef}>
              <button
                className={`flex items-center gap-1 font-medium px-2 transition ${
                  selectedCategory
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowBrandDropdown(false);
                }}
              >
                Category{" "}
                <ChevronDown
                  size={16}
                  className={
                    showCategoryDropdown ? "rotate-180 transition" : ""
                  }
                />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 animate-fadeIn">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full text-left px-4 py-2 flex items-center justify-between transition-all ${
                        selectedCategory === category
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                    >
                      {category}
                      {selectedCategory === category && (
                        <Check size={16} className="text-blue-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-40 text-gray-700 placeholder-gray-400"
            />
          </div>

          <button
            onClick={handleAccountClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition text-sm"
          >
            <User size={18} /> <span>Account</span>
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition text-sm"
          >
            <ShoppingCart size={18} /> <span>Cart</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition text-sm"
          >
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile Filters Toggle */}
          <button
            onClick={toggleMobileFilters}
            className="filter-toggle p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Filter size={20} className="text-gray-600" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="menu-toggle p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={24} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Mobile Filters Panel */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity lg:hidden"
          onClick={() => setShowMobileFilters(false)}
        />
      )}

      <div
        ref={mobileFiltersRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white z-40 transform transition-transform lg:hidden ${
          showMobileFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">Brands</h4>
            <div className="space-y-1">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleBrandSelect(brand)}
                  className={`w-full text-left px-3 py-2 rounded flex items-center justify-between transition ${
                    selectedBrand === brand
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {brand}
                  {selectedBrand === brand && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3">Categories</h4>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`w-full text-left px-3 py-2 rounded flex items-center justify-between transition ${
                    selectedCategory === category
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {(selectedBrand || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity lg:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-72 bg-white z-40 transform transition-transform lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Menu</h3>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400 text-sm"
            />
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-1">
            <a
              href="#Home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium"
            >
              Home
            </a>
            <a
              href="#Shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg hover:bg-gray-50 text-gray-600 font-medium"
            >
              Shop
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleAccountClick}
            className="w-full flex items-center justify-center gap-2 mb-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition text-sm"
          >
            <User size={18} /> Account
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="w-full flex items-center justify-center gap-2 mb-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:text-blue-600 transition text-sm"
          >
            <ShoppingCart size={18} /> Cart
          </button>
          <button
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-gray-200 hover:border-red-300 hover:text-red-600 transition text-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Hero Section - Compact */}
      <section className="bg-gray-100 rounded-lg mx-3 my-6 p-10 md:p-16 lg:p-20 min-h-[400px] flex items-center">
        <div className="max-w-6xl mx-auto text-center w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Grab up to 50% off on selected tumblers
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Discover premium insulated tumblers for every adventure.
          </p>
          <a
            href="#Shop"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl text-base"
          >
            Shop Now
          </a>
        </div>
      </section>
      {/* Main Content - Compact */}
      <div className="max-w-7xl mx-auto px-3 py-4 md:py-6">
        {/* Active Filters */}
        {(selectedBrand || selectedCategory) && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Active:</span>
            {selectedBrand && (
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                {selectedBrand}{" "}
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                {selectedCategory}{" "}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-green-500 hover:text-green-700"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 hover:underline transition"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Products */}
        <section id="Shop" className="mb-5">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Premium Tumblers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-300 transition-all duration-300 flex flex-col h-[530px]"
              >
                {/* Image Container - Larger */}
                <div className="h-[280px] bg-gradient-to-br from-gray-50 to-gray-200 relative flex items-center justify-center p-2">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-auto h-auto max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.style.background = product.color;
                      }}
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
                    {product.category}
                  </div>
                </div>

                {/* Product Info - More space for button */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 flex-1 line-clamp-2">
                    {product.feature}
                  </p>

                  <div className="mb-3">
                    <span className="text-xl font-extrabold text-blue-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.inStock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">
                    Available: {product.availableSizes.join(", ")}
                  </p>

                  <button
                    onClick={() => openAddToCartModal(product)}
                    disabled={!product.inStock}
                    className={`w-full py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all mt-auto text-sm ${
                      product.inStock
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-md"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart size={16} />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Add to Cart Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Add to Cart
              </h3>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-28 h-28 bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg flex items-center justify-center p-3 flex-shrink-0">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {selectedProduct.feature}
                  </p>
                  <p className="text-xl font-extrabold text-blue-600">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2 text-sm">
                  Select Size
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.sizes.map((size) => {
                    const isAvailable =
                      selectedProduct.availableSizes.includes(size);
                    const isSelected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        disabled={!isAvailable}
                        className={`px-3 py-1.5 rounded-lg border font-medium text-sm transition-all ${
                          isSelected
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : isAvailable
                            ? "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                            : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {size}{" "}
                        {isSelected && (
                          <Check size={14} className="inline ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700 mb-2 text-sm">
                  Quantity
                </h4>
                <div className="flex items-center gap-3 max-w-[180px]">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-bold text-gray-900 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 20}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 text-sm">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    ${(selectedProduct.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-lg border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold flex items-center justify-center gap-1.5 hover:from-blue-700 hover:to-blue-800 transition text-sm"
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
