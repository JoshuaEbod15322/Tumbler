import React from "react";
import {
  X,
  Package,
  User,
  Calendar,
  DollarSign,
  Truck,
  CreditCard,
} from "lucide-react";

const ViewOrderModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const statusColors = {
    delivered: "bg-green-100 text-green-800",
    shipped: "bg-blue-100 text-blue-800",
    processing: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Order Details: {order.orderNumber}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>
                  <strong>Name:</strong> {order.customer}
                </p>
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Order Date:</strong> {order.date}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Status
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      statusColors[order.status]
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </p>
                {order.tracking && (
                  <p>
                    <strong>Tracking Number:</strong> {order.tracking}
                  </p>
                )}
                <p>
                  <strong>Payment:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.payment === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.payment.charAt(0).toUpperCase() +
                      order.payment.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              Order Items
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 p-4 font-medium text-gray-700">
                <div>Item</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Total</div>
              </div>
              <div className="p-4 border-t">
                <p className="text-center text-gray-500">
                  Items would be displayed here
                </p>
              </div>
            </div>
          </div>

          {/* Total Summary */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
