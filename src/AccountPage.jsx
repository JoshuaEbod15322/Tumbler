import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Edit,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  LogOut,
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";

const AccountPage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    country: "United States",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    joinDate: "January 2023",
  };

  const orders = [
    {
      id: 1,
      orderNumber: "ORD-123456",
      date: "2024-01-15",
      items: 3,
      total: 149.97,
      status: "delivered",
      tracking: "TRK-789456123",
    },
    {
      id: 2,
      orderNumber: "ORD-123457",
      date: "2024-01-10",
      items: 2,
      total: 89.98,
      status: "shipped",
      tracking: "TRK-789456124",
    },
    {
      id: 3,
      orderNumber: "ORD-123458",
      date: "2024-01-05",
      items: 1,
      total: 34.99,
      status: "processing",
      tracking: "TRK-789456125",
    },
  ];

  const trackingSteps = [
    { status: "Order Placed", time: "Jan 10, 2024 10:30 AM", completed: true },
    { status: "Processing", time: "Jan 10, 2024 11:45 AM", completed: true },
    { status: "Shipped", time: "Jan 11, 2024 09:15 AM", completed: true },
    {
      status: "Out for Delivery",
      time: "Jan 12, 2024 08:00 AM",
      completed: false,
    },
    { status: "Delivered", time: "Estimated Jan 12, 2024", completed: false },
  ];

  const statusConfig = {
    delivered: {
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    shipped: { icon: Truck, color: "text-blue-600", bg: "bg-blue-100" },
    processing: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
    cancelled: { icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
    default: { icon: Package, color: "text-gray-600", bg: "bg-gray-100" },
  };

  const getStatusIcon = (status) => {
    const {
      icon: Icon,
      color,
      bg,
    } = statusConfig[status] || statusConfig.default;
    return <Icon className={`w-5 h-5 ${color}`} />;
  };

  const getStatusBadgeClass = (status) => {
    const { color, bg } = statusConfig[status] || statusConfig.default;
    return `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${bg} ${color}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Account
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your profile, orders, and preferences
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative w-20 h-20 mb-4">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <h3 className="font-semibold text-lg">{userData.name}</h3>
              <p className="text-gray-600 text-sm">{userData.email}</p>
              <span className="text-gray-500 text-xs mt-1">
                Member since {userData.joinDate}
              </span>
            </div>

            <div className="space-y-1">
              {[
                { id: "profile", label: "Profile", icon: User },
                { id: "orders", label: "Orders", icon: ShoppingCart },
                { id: "tracking", label: "Tracking", icon: Truck },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}

              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Details
                  </h2>
                  <p className="text-gray-600">
                    Manage your personal information
                  </p>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isEditing
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isEditing ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "Full Name",
                    value: userData.name,
                    icon: User,
                    key: "name",
                  },
                  {
                    label: "Email Address",
                    value: userData.email,
                    icon: Mail,
                    key: "email",
                  },
                  {
                    label: "Phone Number",
                    value: userData.phone,
                    icon: Phone,
                    key: "phone",
                  },
                  {
                    label: "Country",
                    value: userData.country,
                    icon: Globe,
                    key: "country",
                  },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <field.icon className="w-4 h-4" />
                      {field.label}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <div className="px-4 py-2 bg-gray-50 rounded-lg">
                        {field.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={userData.address}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <div className="px-4 py-2 bg-gray-50 rounded-lg">
                    {userData.address}
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Order History
                </h2>
                <p className="text-gray-600">View and manage your orders</p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start shopping to see your orders here
                  </p>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <h3 className="font-semibold">{order.orderNumber}</h3>
                          <span className={getStatusBadgeClass(order.status)}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: "Date", value: order.date },
                          { label: "Items", value: `${order.items} items` },
                          {
                            label: "Total Amount",
                            value: `$${order.total.toFixed(2)}`,
                            className: "font-bold text-gray-900",
                          },
                          { label: "Tracking", value: order.tracking },
                        ].map((item, idx) => (
                          <div key={idx}>
                            <span className="text-sm text-gray-600 block">
                              {item.label}
                            </span>
                            <span
                              className={`font-medium ${item.className || ""}`}
                            >
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tracking Tab */}
          {activeTab === "tracking" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Order Tracking
                </h2>
                <p className="text-gray-600">Track your orders in real-time</p>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Order TRK-789456123
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Estimated delivery: Jan 12, 2024
                      </p>
                    </div>
                    <span className={getStatusBadgeClass("shipped")}>
                      <Truck className="w-4 h-4" />
                      Shipped
                    </span>
                  </div>
                </div>

                <div className="relative">
                  {trackingSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-4 relative pb-8 last:pb-0"
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <div className="w-3 h-3 rounded-full bg-gray-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{step.status}</h4>
                        <p className="text-gray-600 text-sm">{step.time}</p>
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`absolute left-4 top-8 w-0.5 h-full ${
                            step.completed ? "bg-green-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
