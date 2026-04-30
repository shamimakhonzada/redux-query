"use client";

import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  selectCartItems,
  selectCartIsOpen,
  selectCartTotalPrice,
  removeItem,
  updateQuantity,
  clearCart,
  setCartOpen,
} from "@/features/cart/cartSlice";
import Image from "next/image";

export default function CartSidebar() {
  const dispatch = useAppDispatch();

  // Component only re-renders when one of THESE values changes
  const items = useAppSelector(selectCartItems);
  const isOpen = useAppSelector(selectCartIsOpen);
  const totalPrice = useAppSelector(selectCartTotalPrice);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={() => dispatch(setCartOpen(false))}
      />

      {/* Sidebar panel */}
      <aside
        className="fixed right-0 top-0 h-full w-96 bg-white z-50
        shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold">Your Cart ({items.length})</h2>
          <button
            onClick={() => dispatch(setCartOpen(false))}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div
            className="flex-1 flex flex-col items-center justify-center
            gap-3 text-gray-400"
          >
            <span className="text-5xl">🛒</span>
            <p className="text-sm">Your cart is empty</p>
          </div>
        )}

        {/* Cart Items */}
        <ul className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 items-start">
              <Image
                src={item.image}
                alt={item.title}
                width={64}
                height={64}
                className="rounded-lg object-cover border"
              />

              <div className="flex-1 flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1, // removes if hits 0
                        }),
                      )
                    }
                    className="w-7 h-7 rounded-full border flex items-center
                      justify-center text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="text-sm font-semibold w-4 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        }),
                      )
                    }
                    className="w-7 h-7 rounded-full border flex items-center
                      justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Line total + remove */}
              <div className="flex flex-col items-end gap-1">
                <p className="text-sm font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-xs text-red-400 hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-6 flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="w-full py-3 bg-violet-600 text-white rounded-xl
                font-medium hover:bg-violet-700 transition-colors"
            >
              Checkout
            </button>

            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 text-sm text-gray-400 hover:text-red-500
                transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
