import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../Api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-2xl font-semibold">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group block transform transition duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="w-full h-72 object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {product.attributes.title}
                </h2>
                <p className="text-lg text-gray-700 mt-2">${product.attributes.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}