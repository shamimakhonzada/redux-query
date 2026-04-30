"use client";

import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { selectCategory, setCategory } from "./productSlice";
import { useGetProductsQuery } from "./api/productApi";

export default function ProductList() {
  const dispatch = useAppDispatch();

  // RTK Query hook
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useGetProductsQuery();

  // UI state from slice
  const selected = useAppSelector(selectCategory);

  // Derived data (was selector before)
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selected === "All"
      ? products
      : products.filter((p) => p.category === selected);

  // Loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Fetching products...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-red-500 font-medium">Failed to load products</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Success
  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => dispatch(setCategory(cat))}
            className={`px-4 py-1.5 rounded-full text-sm font-medium
              transition-colors border
              ${
                selected === cat
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400 py-10">
          No products in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
