"use client";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { addItem, selectCartItemById } from "../cart/cartSlice";
import Image from "next/image";
import { Product } from "./productTypes";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(selectCartItemById(product.id));
  console.log("object", cartItem);
  const isInCart = Boolean(cartItem);

  const handleAdd = () => {
    dispatch(addItem(product));
  };

  return (
    <div className="group border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col bg-white">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Category Badge */}
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Title - Limited to 2 lines */}
        <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 min-h-10">
          {product.title}
        </h3>

        {/* Description - Limited to 2 lines */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-auto pt-2">
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
            ${
              isInCart
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                : "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]"
            }`}
        >
          {isInCart ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              In Cart ({cartItem?.quantity})
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add to Cart
            </span>
          )}
        </button>
      </div>
    </div>
  );
}