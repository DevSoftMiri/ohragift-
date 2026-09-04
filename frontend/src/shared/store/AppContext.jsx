import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

const starterCart = [
  {
    slug: "oversized-essential-tee",
    name: "Oversized Essential Tee",
    store: "wears",
    price: 899,
    quantity: 1
  },
  {
    slug: "birthday-bloom-box",
    name: "Birthday Bloom Box",
    store: "gifts",
    price: 1299,
    quantity: 1
  }
];

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState(starterCart);
  const [wishlistItems, setWishlistItems] = useState(["birthday-bloom-box"]);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      subtotal,
      items: cartItems.length
    };
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((items) => {
      const existing = items.find((item) => item.slug === product.slug);
      if (existing) return items.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item);
      return [...items, { ...product, price: product.salePrice || product.price, quantity: 1 }];
    });
  }

  function removeFromCart(slug) {
    setCartItems((items) => items.filter((item) => item.slug !== slug));
  }

  function updateCartQuantity(slug, quantity) {
    if (quantity < 1) return removeFromCart(slug);
    setCartItems((items) => items.map((item) => item.slug === slug ? { ...item, quantity } : item));
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
