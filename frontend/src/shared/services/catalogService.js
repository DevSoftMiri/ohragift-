const sampleCatalog = [
  {
    name: "Birthday Bloom Box",
    slug: "birthday-bloom-box",
    store: "gifts",
    price: 1299,
    salePrice: 1099,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80",
    eyebrow: "Personalised Gifts",
    description: "A keepsake box with blooms, note cards, and celebration details."
  },
  {
    name: "Golden Hour Gift Hamper",
    slug: "golden-hour-gift-hamper",
    store: "gifts",
    price: 999,
    salePrice: 899,
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80",
    eyebrow: "Festivals",
    description: "Warm-toned festive gifting with premium packaging and message options."
  },
  {
    name: "Personalised Wooden Photo Lamp",
    slug: "personalised-wooden-photo-lamp",
    store: "gifts",
    price: 1799,
    salePrice: 1299,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80",
    category: "Photo Gifts",
    occasion: "Anniversary",
    eyebrow: "Best Selling Gifts",
    description: "A warm wooden photo lamp customised with a favourite memory."
  },
  {
    name: "Luxury Gift Hamper For Him",
    slug: "luxury-gift-hamper-for-him",
    store: "gifts",
    price: 3299,
    salePrice: 2499,
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80",
    category: "Gift Hampers",
    occasion: "For Him",
    eyebrow: "Best Selling Gifts",
    description: "A premium hamper curated with elegant keepsakes and treats."
  },
  {
    name: "Personalised Name Leather Wallet",
    slug: "personalised-name-leather-wallet",
    store: "gifts",
    price: 1299,
    salePrice: 899,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=80",
    category: "Fashion & Accessories",
    occasion: "For Him",
    eyebrow: "Best Selling Gifts",
    description: "A sleek leather wallet finished with a personalised name detail."
  },
  {
    name: "Scented Candle Gift Set",
    slug: "scented-candle-gift-set",
    store: "gifts",
    price: 1699,
    salePrice: 1199,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
    category: "Home & Living",
    occasion: "Housewarming",
    eyebrow: "Best Selling Gifts",
    description: "Softly scented candles packed for a calm, thoughtful gifting moment."
  },
  {
    name: "Custom Couple Caricature Frame",
    slug: "custom-couple-caricature-frame",
    store: "gifts",
    price: 1999,
    salePrice: 1499,
    image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=900&q=80",
    category: "Photo Gifts",
    occasion: "Anniversary",
    eyebrow: "Best Selling Gifts",
    description: "A playful custom couple frame made for anniversaries and celebrations."
  },
  {
    name: "Oversized Essential Tee",
    slug: "oversized-essential-tee",
    store: "wears",
    price: 899,
    salePrice: 799,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    eyebrow: "Best Sellers",
    description: "Heavyweight cotton, relaxed drape, and an editorial everyday silhouette."
  },
  {
    name: "Tropic Parade Relaxed Fit Printed Shirt",
    slug: "tropic-parade-relaxed-fit-printed-shirt",
    store: "wears",
    price: 2999,
    salePrice: 2999,
    image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Summer Drop",
    description: "A relaxed printed shirt made for warm days, easy movement, and good noise."
  },
  {
    name: "The Fallen Star Relaxed Fit Printed Shirt",
    slug: "the-fallen-star-relaxed-fit-printed-shirt",
    store: "wears",
    price: 2799,
    salePrice: 2799,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Summer Drop",
    description: "An expressive printed shirt with a relaxed fit and lightweight everyday feel."
  },
  {
    name: "Out Of Office Regular Fit Printed Shirt",
    slug: "out-of-office-regular-fit-printed-shirt",
    store: "wears",
    price: 2699,
    salePrice: 2699,
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Summer Drop",
    description: "A clean regular-fit shirt designed for off-duty plans and everyday styling."
  },
  {
    name: "Pavilions Regular Fit Printed Shirt",
    slug: "pavilions-regular-fit-printed-shirt",
    store: "wears",
    price: 2799,
    salePrice: 2799,
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Summer Drop",
    description: "A statement regular-fit shirt with considered details and an easy drape."
  },
  {
    name: "Powerless Influence Relaxed Fit Printed Shirt",
    slug: "powerless-influence-relaxed-fit-printed-shirt",
    store: "wears",
    price: 2799,
    salePrice: 2799,
    image: "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Best Sellers",
    description: "A relaxed printed layer with a confident silhouette and soft hand feel."
  },
  {
    name: "Sad Holidays Oversized Fit Printed Jersey",
    slug: "sad-holidays-oversized-fit-printed-jersey",
    store: "wears",
    price: 2499,
    salePrice: 2499,
    image: "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Best Sellers",
    description: "An oversized jersey built for comfort, layering, and expressive everyday looks."
  },
  {
    name: "An Evil Door And A Well Short Sleeve Shirt",
    slug: "an-evil-door-and-a-well-short-sleeve-shirt",
    store: "wears",
    price: 2799,
    salePrice: 2799,
    image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Best Sellers",
    description: "A short sleeve statement shirt with a relaxed attitude and considered finish."
  },
  {
    name: "It's O' Brooklyn Relaxed Fit Shirt",
    slug: "it-s-o-brooklyn-relaxed-fit-shirt",
    store: "wears",
    price: 2699,
    salePrice: 2699,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Best Sellers",
    description: "A relaxed fit shirt with an effortless city-ready shape and feel."
  },
  {
    name: "Banjara Bucket Hat",
    slug: "banjara-bucket-hat",
    store: "wears",
    price: 1299,
    salePrice: 1299,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Accessories",
    description: "A statement bucket hat made to finish relaxed OHRA Wears looks."
  },
  {
    name: "Checkers & Hukam Socks",
    slug: "checkers-hukam-socks",
    store: "wears",
    price: 499,
    salePrice: 499,
    image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Accessories",
    description: "Comfort-first socks with a playful graphic finish."
  },
  {
    name: "The Mascot Socks",
    slug: "the-mascot-socks",
    store: "wears",
    price: 499,
    salePrice: 499,
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Accessories",
    description: "A soft everyday pair with a distinct OHRA Wears point of view."
  },
  {
    name: "Endless Rides Socks",
    slug: "endless-rides-socks",
    store: "wears",
    price: 499,
    salePrice: 499,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=720&q=85",
    eyebrow: "Accessories",
    description: "Everyday socks designed for comfort, movement, and repeat wear."
  },
  {
    name: "Studio Layer Shirt",
    slug: "studio-layer-shirt",
    store: "wears",
    price: 1699,
    salePrice: 1499,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    eyebrow: "New Arrivals",
    description: "A clean layering piece built around structure, texture, and movement."
  }
];

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function normalizeProduct(product) {
  return {
    ...product,
    image: product.image || product.images?.[0] || "",
    eyebrow: product.eyebrow || product.category || "OHRA Collection"
  };
}

export async function getProductsByStore(store) {
  try {
    const response = await fetch(`${apiUrl}/products?store=${store}`);
    if (!response.ok) throw new Error("Catalog API is unavailable");
    return (await response.json()).map(normalizeProduct);
  } catch {
    return sampleCatalog.filter((item) => item.store === store);
  }
}

export async function getCatalogGroups(store, kind = "category") {
  try {
    const response = await fetch(`${apiUrl}/products/groups?store=${store}&kind=${kind}`);
    if (!response.ok) throw new Error("Catalog groups are unavailable");
    return response.json();
  } catch {
    return [];
  }
}

export async function getGiftProducts(filters = {}) {
  const query = new URLSearchParams({ store: "gifts" });
  Object.entries(filters).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });

  try {
    const response = await fetch(`${apiUrl}/products?${query}`);
    if (!response.ok) throw new Error("Catalog API is unavailable");
    return (await response.json()).map(normalizeProduct);
  } catch {
    return sampleCatalog.filter((item) => (
      item.store === "gifts" &&
      (!filters.category || item.category === filters.category) &&
      (!filters.occasion || item.occasion === filters.occasion)
    ));
  }
}

export async function getProductBySlug(slug) {
  try {
    const response = await fetch(`${apiUrl}/products/${slug}`);
    if (!response.ok) throw new Error("Catalog API is unavailable");
    return normalizeProduct(await response.json());
  } catch {
    return sampleCatalog.find((item) => item.slug === slug);
  }
}
