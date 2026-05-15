"use client";

import { useSignupMutation } from "@/features/auth/api/authApi";
import {
  RegistrationInput,
  RegistrationSchema,
} from "@/features/auth/model/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [signup] = useSignupMutation();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      full_name: "",
    },
  });

  const onSubmit = async (data: RegistrationInput) => {
    setServerError(null);
    setIsSubmitting(true);

    try {
      await signup(data).unwrap();
      toast.success("Registration successful! Please log in.");
      router.push("/signin");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      setServerError(
        (error as { data?: { message?: string } }).data?.message ||
          "An unexpected error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "mt-1 block w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";

  const errorInput = "border-red-500";
  const normalInput = "border-gray-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign up to get started with your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("full_name")}
              className={`${inputBase} ${
                errors.full_name ? errorInput : normalInput
              }`}
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.full_name.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className={`${inputBase} ${
                errors.username ? errorInput : normalInput
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`${inputBase} ${errors.email ? errorInput : normalInput}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={`${inputBase} ${
                errors.password ? errorInput : normalInput
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {serverError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
