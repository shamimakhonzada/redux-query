import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "./cartType";
import { RootState } from "@/app/store";
import { Product } from "../products/productTypes";

const initialState: CartState = {
  items: [],
  isOpen: false,
};

//slice
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    //add item
    addItem(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    //remove item
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    //update quantity
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }
      const existing = state.items.find((item) => item.id === id);
      if (existing) {
        existing.quantity = quantity;
      }
    },

    //clear cart
    clearCart(state) {
      state.items = [];
    },

    //toggle cart sidebar
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },

    setCartOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

// These are functions that READ from state — used with useAppSelector

//Basic Selector
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;

// Memoized derived selectors (for calculations)
export const selectCartTotalPrice = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0),
);

export const selectCartTotalItems = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

// Parameterized selectors (factory pattern)
export const selectCartItemById = (id: string) =>
  createSelector([selectCartItems], (items) =>
    items.find((item) => item.id === id),
  );

// actions
export const {
  addItem,
  removeItem,
  clearCart,
  updateQuantity,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

// reducer
export default cartSlice.reducer;
