import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

const starterCart = [];

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState(starterCart);
  const [wishlistItems, setWishlistItems] = useState([]);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      subtotal,
      items: cartItems.length
    };
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((items) => {
      const customName = product.customName?.trim() || "";
      const customCity = product.customCity?.trim() || "";
      const cartKey = [product.slug, customName.toLowerCase(), customCity.toLowerCase()].join("|");
      const existing = items.find((item) => item.cartKey === cartKey);
      if (existing) return items.map((item) => item.cartKey === cartKey ? { ...item, quantity: item.quantity + 1 } : item);
      return [...items, { ...product, customName, customCity, cartKey, price: product.salePrice || product.price, quantity: 1 }];
    });
  }

  function removeFromCart(cartKey) {
    setCartItems((items) => items.filter((item) => (item.cartKey || item.slug) !== cartKey));
  }

  function updateCartQuantity(cartKey, quantity) {
    if (quantity < 1) return removeFromCart(cartKey);
    setCartItems((items) => items.map((item) => (item.cartKey || item.slug) === cartKey ? { ...item, quantity } : item));
  }

  function toggleWishlist(slug) {
    setWishlistItems((items) => items.includes(slug) ? items.filter((item) => item !== slug) : [...items, slug]);
  }

  const value = {
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    totals
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
