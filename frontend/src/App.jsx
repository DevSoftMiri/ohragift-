import { Navigate, Route, Routes } from "react-router-dom";
import GatewayPage from "./shared/pages/GatewayPage";
import CartPage from "./shared/pages/CartPage";
import CheckoutPage from "./shared/pages/CheckoutPage";
import WishlistPage from "./shared/pages/WishlistPage";
import AccountPage from "./shared/pages/AccountPage";
import OrdersPage from "./shared/pages/OrdersPage";
import GiftsHomePage from "./gifts/pages/GiftsHomePage";
import WearsHomePage from "./wears/pages/WearsHomePage";
import WearsAboutPage from "./wears/pages/WearsAboutPage";
import WearsInfoPage from "./wears/pages/WearsInfoPage";
import ProductListingPage from "./shared/pages/ProductListingPage";
import ProductDetailPage from "./shared/pages/ProductDetailPage";
import AdminPage from "./admin/pages/AdminPage";
import GiftsCollectionPage from "./gifts/pages/GiftsCollectionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GatewayPage />} />
      <Route path="/gifts" element={<GiftsHomePage />} />
      <Route path="/gifts/products" element={<ProductListingPage store="gifts" />} />
      <Route path="/gifts/:collection" element={<GiftsCollectionPage />} />
      <Route path="/gifts/product/:slug" element={<ProductDetailPage />} />
      <Route path="/wears" element={<WearsHomePage />} />
      <Route path="/wears/about" element={<WearsAboutPage />} />
      <Route path="/wears/products" element={<Navigate to="/wears" replace />} />
      <Route path="/wears/product/:slug" element={<ProductDetailPage />} />
      <Route path="/wears/info/:page" element={<WearsInfoPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
