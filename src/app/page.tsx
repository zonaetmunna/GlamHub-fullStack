"use client";
import { useEffect, useState } from "react";
import ProductCard from "./_components/(card)/productCard";
import Banner from "./_components/(home)/banner";

const API_BASE_URL = "http://localhost:3000/api/products";
const API_BASE_URL_CATEGORIES = "http://localhost:3000/api/categories";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_BASE_URL_CATEGORIES);
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  return (
    <div className="container mx-auto ">
      {/* banner */}
      <Banner />
      {/* category */}
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">All Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.length > 0 ? (
            categories?.map((category: ICategory) => (
              <div key={category.id} className="border p-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      {/* products */}
      <div className="">
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products?.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
