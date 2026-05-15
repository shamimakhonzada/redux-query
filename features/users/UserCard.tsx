"use client";

import { User } from "@/features/users/model/user.types";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { BadgeCheck, PenSquare } from "lucide-react";
import { useState } from "react";
import EditUserCard from "./EditUserCard";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = () => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center border p-4 rounded-2xl border-gray-500 relative">
        {/* Profile Image */}
        <div className="relative">
          <Image
            src={user.profile_image || "/default-avatar.png"}
            alt={user.full_name}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover ring-4 ring-gray-100 transition group-hover:ring-gray-200"
          />

          {/* Verification Badge */}
          {user.is_verified && (
            <div className="absolute bottom-0 right-0">
              <BadgeCheck className="fill-blue-500" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="mt-5 space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            {user.full_name}
          </h2>

          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Role Badge */}
        <div className="mt-4">
          <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
            {user.role}
          </span>
        </div>

        <div className="flex justify-center items-center gap-2 mt-4">
          <p className="text-xs text-gray-500">Status</p>
          <p
            className={`text-sm font-semibold ${
              user.is_verified ? "text-green-600" : "text-orange-500"
            }`}
          >
            {user.is_verified ? "Verified" : "Pending"}
          </p>
        </div>

        <Button
          onClick={handleEdit}
          variant={"outline"}
          className="absolute top-4 right-4"
        >
          <PenSquare />
          Edit
        </Button>
      </div>

      {isOpen && selectedUser && (
        <EditUserCard user={selectedUser} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
