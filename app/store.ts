import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counter/counterSlice";
import { authApi } from "@/features/auth/api/authApi";
import { userApi } from "@/features/users/api/userApi";

export const store = configureStore({
  reducer: {
    // we'll add slices here as we build them
    counter: counterReducer,

    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  // Add the API middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

// RootState = the shape of your entire global state
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch = the type of the dispatch function
export type AppDispatch = typeof store.dispatch;
