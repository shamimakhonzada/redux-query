"use client";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import { selectCartTotalItems, toggleCart } from "@/features/cart/cartSlice";

export default function CartBadge() {
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(selectCartTotalItems);

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      aria-label="Open cart"
    >
      {/* Cart icon */}
      <svg
        className="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184
             1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {/* Badge — only shown when cart has items */}
      {totalItems > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-violet-600 text-white
          text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}
