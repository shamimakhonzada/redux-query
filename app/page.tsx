import CartSidebar from "@/components/CartSidebar";
import Navbar from "@/components/Navbar";
import ProductList from "@/features/products/ProductList";
import RecipeList from "@/features/recipes/RecipeList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <CartSidebar />
      <ProductList />
      <RecipeList />
    </main>
  );
}
