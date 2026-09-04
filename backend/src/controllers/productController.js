import Product from "../models/Product.js";

function makeSlug(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const sampleProducts = [
  {
    name: "Birthday Bloom Box",
    slug: "birthday-bloom-box",
    store: "gifts",
    category: "Gift Hampers",
    occasion: "Birthday",
    subCategory: "Gift Box",
    price: 1299,
    salePrice: 1099,
    images: ["https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80"],
    inventory: 12,
    attributes: {
      recipient: "For Her",
      personalizable: "Yes",
      wrapping: "Premium"
    },
    description: "A curated celebration box with flowers, notes, and keepsakes.",
    status: "active"
  },
  {
    name: "Oversized Essential Tee",
    slug: "oversized-essential-tee",
    store: "wears",
    category: "Unisex",
    subCategory: "T-Shirts",
    price: 899,
    salePrice: 799,
    images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80"],
    inventory: 30,
    attributes: {
      fit: "Oversized",
      fabric: "Cotton",
      color: "Black"
    },
    description: "A heavyweight cotton tee designed for an elevated everyday wardrobe.",
    status: "active"
  }
];

export const getProducts = async (req, res) => {
  const { category, occasion, store } = req.query;
  const filter = {
    ...(store ? { store } : {}),
    ...(category ? { category } : {}),
    ...(occasion ? { occasion } : {})
  };

  try {
    const products = await Product.find(filter).lean();
    const source = products.length
      ? products
      : sampleProducts.filter((product) => (
        (!store || product.store === store) &&
        (!category || product.category === category) &&
        (!occasion || product.occasion === occasion)
      ));

    res.json(source);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch products", error: error.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();
    const fallback = sampleProducts.find((entry) => entry.slug === req.params.slug);

    if (!product && !fallback) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product || fallback);
  } catch (error) {
    res.status(500).json({ message: "Unable to fetch product", error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, slug: req.body.slug || makeSlug(req.body.name) });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Unable to create product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Unable to update product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.status(204).end();
};
