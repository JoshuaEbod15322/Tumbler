import React from "react";
import { AlertTriangle } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "delete",
}) => {
  if (!isOpen) return null;

  const colors = {
    delete: "bg-red-100 text-red-600 border-red-200",
    warning: "bg-yellow-100 text-yellow-600 border-yellow-200",
    info: "bg-blue-100 text-blue-600 border-blue-200",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className={`p-6 border-b ${colors[type]}`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-600">{message}</p>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${
                type === "delete"
                  ? "bg-red-600 hover:bg-red-700"
                  : type === "warning"
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
