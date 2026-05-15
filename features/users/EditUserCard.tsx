"use client";

import { User } from "@/features/users/model/user.types";
import Image from "next/image";
import { useState } from "react";

interface Props {
  user: User;
  onClose: () => void;
}

export default function EditUserCard({ user, onClose }: Props) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    profile_image: user.profile_image || "",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-xl transition-colors dark:border-gray-700 dark:bg-gray-900">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit User
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
          >
            ✕
          </button>
        </div>

        {/* Profile Image Preview */}
        <div className="mb-4 flex items-center gap-4">
          <Image
            width={96}
            height={96}
            src={formData.profile_image || "/default-avatar.png"}
            alt="profile"
            className="h-16 w-16 rounded-full object-cover border dark:border-gray-700"
          />
          {/* make the above image upload also, i mean when click on image i can change image also work like upload button  */}
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
