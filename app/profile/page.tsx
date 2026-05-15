"use client";

import UserCard from "@/features/users/UserCard";
import { useMeQuery } from "@/features/users/api/userApi";

export default function Profile() {
  const { data, isLoading, isError, error } = useMeQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError && error) {
    if ("status" in error) {
      const errorData = error.data as { message?: string };
      return <div>{errorData?.message || "An error occurred"}</div>;
    }
  }

  if (!data) return null;
  return (
    <div>
      <UserCard user={data} />
    </div>
  );
}
