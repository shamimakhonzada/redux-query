import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },

  reducers: {
    //increment
    increment(state) {
      state.value += 1;
    },
    //decrement
    decrement(state) {
      state.value -= 1;
    },

    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const countValue = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
