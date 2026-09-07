const wearProducts = [
  {
    name: "Ambala City Graphic T-Shirt",
    slug: "ambala-city-graphic-t-shirt",
    store: "wears",
    price: 899,
    salePrice: 899,
    image: "/images/wears/ambala%20main.png",
    secondaryImage: "/images/wears/ambala%20t%20shirt.png",
    eyebrow: "Summer Drop",
    description: "Add your chosen city, location, or name to create a personal everyday tee."
  },
  {
    name: "Ambala Heritage Graphic T-Shirt",
    slug: "ambala-heritage-graphic-t-shirt",
    store: "wears",
    price: 899,
    salePrice: 899,
    image: "/images/wears/ambala%202%20main.png",
    secondaryImage: "/images/wears/ambala%202%20tshirt.png",
    eyebrow: "Summer Drop",
    description: "Customize the front artwork with a place or person that matters to you."
  },
  {
    name: "Ambala Statement Graphic T-Shirt",
    slug: "ambala-statement-graphic-t-shirt",
    store: "wears",
    price: 899,
    salePrice: 899,
    image: "/images/wears/ambala%203%20main.png",
    secondaryImage: "/images/wears/ambala%203%20tshit.png",
    eyebrow: "Summer Drop",
    description: "Made for custom names and locations with a relaxed, easy-to-style fit."
  },
  {
    name: "Bathinda City Graphic T-Shirt",
    slug: "bathinda-city-graphic-t-shirt",
    store: "wears",
    price: 899,
    salePrice: 899,
    image: "/images/wears/bathinda%20main.png",
    secondaryImage: "/images/wears/bathinda%20t%20shirt.png",
    eyebrow: "Summer Drop",
    description: "Turn a favorite city, hometown, or personal name into a wearable graphic."
  },
  {
    name: "Delhi City Graphic T-Shirt",
    slug: "delhi-city-graphic-t-shirt",
    store: "wears",
    price: 899,
    salePrice: 899,
    image: "/images/wears/delhi%20main.png",
    secondaryImage: "/images/wears/delhi%20t%20shirt.png",
    eyebrow: "Best Sellers",
    description: "Personalize the design with your selected city name, location, or initials."
  },
  {
    name: "Hisar City Graphic T-Shirt",
    slug: "hisar-city-graphic-t-shirt",
    store: "wears",
    price: 899,
    salePrice: 899,
    image: "/images/wears/hisar%20main.png",
    secondaryImage: "/images/wears/hisar%20tshirt.png",
    eyebrow: "Best Sellers",
    description: "A clean custom tee for names, places, groups, trips, and local memories."
  },
  {
    name: "Karnal City Graphic T-Shirt",
    slug: "karnal-city-graphic-t-shirt",
    store: "wears",
    price: 899,
    salePrice: 899,
    image: "/images/wears/Karnal%20main.png",
    secondaryImage: "/images/wears/karnal%20t%20shirt.png",
    eyebrow: "Best Sellers",
    description: "Built for custom place names or personal text while keeping a premium look."
  },
  {
    name: "Sirsa Women's Graphic T-Shirt",
    slug: "sirsa-women-s-graphic-t-shirt",
    store: "wears",
    price: 899,
    salePrice: 899,
    image: "/images/wears/women%20and%20sirsa.png",
    secondaryImage: "/images/wears/women%20and%20sirsa%20t%20shirt.png",
    eyebrow: "Best Sellers",
    description: "Create a simple statement tee using a loved one's name or favorite place."
  },
  {
    name: "Custom Name Car Graphic T-Shirt",
    slug: "custom-name-car-graphic-t-shirt",
    store: "wears",
    price: 899,
    salePrice: 899,
    image: "/images/wears/custom%20name%20with%20car.png",
    secondaryImage: "/images/wears/custom%20name%20with%20car%20t%20shirt.png",
    eyebrow: "Custom Drop",
    description: "Add a name, city, or location to create a custom car-themed T-shirt."
  }
];

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
    name: "Signature Gift Hamper",
    slug: "signature-gift-hamper",
    store: "gifts",
    price: 999,
    salePrice: 799,
    image: "/images/gifts/hamper%201.png",
    category: "Gift Hampers",
    occasion: "Birthday",
    eyebrow: "Gift Hampers",
    description: "A polished all-occasion hamper with sweets, keepsakes, and premium gift-ready packaging."
  },
  {
    name: "Corporate Thank You Hamper",
    slug: "corporate-thank-you-hamper",
    store: "gifts",
    price: 1499,
    salePrice: 1299,
    image: "/images/gifts/hamper%202.png",
    category: "Corporate Hampers",
    occasion: "Corporate",
    eyebrow: "Corporate Hampers",
    description: "A refined desk-friendly selection for clients, teams, onboarding, and thoughtful business gifting."
  },
  {
    name: "Birthday Celebration Hamper",
    slug: "birthday-celebration-hamper",
    store: "gifts",
    price: 1199,
    salePrice: 999,
    image: "/images/gifts/hamper%203.png",
    category: "Birthday Hampers",
    occasion: "Birthday",
    eyebrow: "Birthday Hampers",
    description: "A cheerful birthday hamper with treats, a note-card feel, and celebratory finishing touches."
  },
  {
    name: "Anniversary Memory Hamper",
    slug: "anniversary-memory-hamper",
    store: "gifts",
    price: 1799,
    salePrice: 1599,
    image: "/images/gifts/hamper%204.png",
    category: "Anniversary Hampers",
    occasion: "Anniversary",
    eyebrow: "Anniversary Hampers",
    description: "A romantic hamper curated for couples, milestones, and warm personal moments."
  },
  {
    name: "Premium Festive Hamper",
    slug: "premium-festive-hamper",
    store: "gifts",
    price: 1999,
    salePrice: 1799,
    image: "/images/gifts/hamper%205.png",
    category: "Festive Hampers",
    occasion: "Diwali",
    eyebrow: "Festive Hampers",
    description: "A festive-ready hamper with elegant presentation, rich gifting cues, and a premium finish."
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
  ...wearProducts
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
