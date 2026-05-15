import { cookies } from "next/headers";
import Profile from "./Profile";

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  return (
    <nav
      className="sticky top-0 z-30 bg-white border-b px-6 py-4
      flex items-center justify-between"
    >
      <h1 className="text-lg font-semibold text-gray-900 flex gap-2">SKD.</h1>
      {token && (
        <div className="flex gap-4 justify-center items-center">
          <Profile />
        </div>
      )}
    </nav>
  );
}
