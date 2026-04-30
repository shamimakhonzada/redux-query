import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import counterReducer from "@/features/counter/counterSlice";
import productReducer from "@/features/products/productSlice";
import { productApi } from "@/features/products/api/productApi";
import { recipeApi } from "@/features/recipes/api/recipeApi";

export const store = configureStore({
  reducer: {
    // we'll add slices here as we build them
    cart: cartReducer,
    counter: counterReducer,
    products: productReducer,

    [productApi.reducerPath]: productApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
  },

  // Add the API middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, recipeApi.middleware),
});

// RootState = the shape of your entire global state
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch = the type of the dispatch function
export type AppDispatch = typeof store.dispatch;
