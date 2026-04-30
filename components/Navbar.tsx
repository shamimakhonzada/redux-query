import CartBadge from "@/components/CartBadge";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-30 bg-white border-b px-6 py-4
      flex items-center justify-between"
    >
      <h1 className="text-lg font-semibold text-gray-900">
        <ShoppingCart />
        RTK Shop
      </h1>
      <CartBadge /> {/* CartBadge manages its own store subscription */}
    </nav>
  );
}
