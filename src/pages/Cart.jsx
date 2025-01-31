import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { state, removeItem, updateAmount, clearCart } = useCart();

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">Your cart is empty</h2>
        <Link
          to="/products"
          className="inline-block bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {state.cart.map((item) => (
            <div
              key={`${item.id}-${item.color}`}
              className="flex items-center gap-6 border-b py-6 hover:bg-gray-50 transition duration-200 group"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-md shadow-sm"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mt-1">
                  Color:{" "}
                  <span
                    className="inline-block w-4 h-4 rounded-full ml-1"
                    style={{ backgroundColor: item.color }}
                  />
                </p>
                <div className="flex items-center mt-3 gap-2">
                  <button
                    onClick={() =>
                      updateAmount(
                        item.id,
                        item.color,
                        Math.max(1, item.amount - 1)
                      )
                    }
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-lg font-semibold">{item.amount}</span>
                  <button
                    onClick={() =>
                      updateAmount(item.id, item.color, item.amount + 1)
                    }
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg text-gray-800">
                  ${(item.price * item.amount).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id, item.color)}
                  className="text-red-500 hover:text-red-700 mt-2 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="mt-6 text-red-500 hover:text-red-700 transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Order Summary</h3>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal:</span>
                <span>${state.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping:</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-gray-900">
                <span>Total:</span>
                <span>${state.totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
