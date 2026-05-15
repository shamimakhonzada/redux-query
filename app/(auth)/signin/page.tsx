"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSignInMutation } from "@/features/auth/api/authApi";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { LoginInput, LoginSchema } from "@/features/auth/model/auth.schema";

export default function SignIn() {
  const [signIn, { isLoading }] = useSignInMutation();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await signIn(data).unwrap();
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      console.error("Login failed:", err);
      setServerError(
        (err as { data?: { message?: string } }).data?.message ||
          "An unexpected error occurred",
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/login`; // Redirect to backend for Google OAuth
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 p-8 border "
      >
        <h2 className="text-2xl font-bold text-center">Sign In</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 absolute right-4 top-1/2 transform"
          >
            {showPassword ? <EyeClosed /> : <Eye />}
          </button>
        </div>

        {serverError && (
          <p className="text-red-500 text-sm mt-1">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <hr className="border-gray-500" />
        <p className="text-center text-sm">
          Don&apos;t have an account?
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>

        <button
          type="button"
          disabled={isGoogleLoading}
          onClick={handleGoogleLogin}
          className="w-full border text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <FaGoogle />
          {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
        </button>
      </form>
    </div>
  );
}
