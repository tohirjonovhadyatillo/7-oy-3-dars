import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProduct } from "../Api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    getProduct(id)
      .then((data) => {
        setProduct(data);
        setSelectedColor(data.attributes.colors[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-2xl font-semibold">Loading...</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen text-2xl font-semibold text-red-500">Product not found</div>;
  }

  const { attributes } = product;

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      title: attributes.title,
      price: attributes.price,
      image: attributes.image,
      amount,
      color: selectedColor,
      company: attributes.company,
    };
    addToCart(cartItem, amount, selectedColor);
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <img
          src={attributes.image}
          alt={attributes.title}
          className="w-full h-96 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
        <div>
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{attributes.title}</h1>
          <p className="text-2xl font-semibold text-blue-600 mb-4">${attributes.price}</p>
          <p className="text-gray-600 mb-6 leading-relaxed">{attributes.description}</p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Colors:</h3>
            <div className="flex space-x-3">
              {attributes.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-4 transition-all duration-300 ${
                    selectedColor === color ? "border-gray-900 scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Amount:</h3>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setAmount(Math.max(1, amount - 1))}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                -
              </button>
              <span className="text-xl font-semibold">{amount}</span>
              <button
                onClick={() => setAmount(amount + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}