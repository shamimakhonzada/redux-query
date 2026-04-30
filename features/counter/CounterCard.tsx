"use client";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  countValue,
  decrement,
  increment,
  incrementByAmount,
} from "./counterSlice";

export default function CounterCard() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(countValue);

  const handleIncrement = () => {
    dispatch(increment());
  };
  const handlDecrement = () => {
    dispatch(decrement());
  };
  const handleIncrementByAmount = (amount: number) => {
    return () => dispatch(incrementByAmount(amount));
  };
  return (
    <div className="flex justify-center items-center flex-col text-slate-900">
      <h1>Count: {count}</h1>
      <div className="grid grid-cols-3 gap-3 max-w-2xl">
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handlDecrement}>Decrement</button>
        <button onClick={handleIncrementByAmount(4)}>Increment 4+</button>
      </div>
    </div>
  );
}
