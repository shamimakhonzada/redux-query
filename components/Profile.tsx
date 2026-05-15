"use client";

import { useSignOutMutation } from "@/features/auth/api/authApi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/features/users/api/userApi";

export default function Profile() {
  const router = useRouter();
  const { data } = useMeQuery();
  const user = data;

  const [signOut, { isLoading }] = useSignOutMutation();
  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      window.location.href = "/"; // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleViewProfile = () => {
    router.push("/profile");
    setIsProfileOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsProfileOpen((prev) => !prev)}
        className="flex items-center gap-3 focus:outline-none group relative"
      >
        {user?.profile_image ? (
          <Image
            src={user.profile_image}
            alt="Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-medium text-gray-700 border border-gray-200">
            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
        {user?.is_verified ? (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
        ) : (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 border-2 border-white rounded-full" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
          {/* User Info Header */}
          <div className="px-5 py-4 border-b border-gray-100">
            <div className="font-medium text-gray-900">{user?.full_name}</div>
            <div className="text-sm text-gray-500 truncate flex">
              {user?.email}{" "}
              {!user?.is_verified && (
                <span className="ml-2 text-xs text-red-500">(Unverified)</span>
              )}
            </div>
            {user?.role && (
              <span className="inline-block mt-1 text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
                {user.role}
              </span>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={handleViewProfile}
              className="w-full px-5 py-3 text-left flex items-center gap-3 hover:bg-gray-50 text-gray-700 transition-colors"
            >
              <User size={18} />
              <span className="text-sm">View Profile</span>
            </button>

            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="w-full px-5 py-3 text-left flex items-center gap-3 hover:bg-gray-50 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
