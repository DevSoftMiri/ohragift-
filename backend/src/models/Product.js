import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    label: String,
    value: String,
    priceModifier: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    store: {
      type: String,
      enum: ["gifts", "wears"],
      required: true
    },
    category: String,
    occasion: String,
    subCategory: String,
    price: Number,
    salePrice: Number,
    images: [String],
    inventory: {
      type: Number,
      default: 0
    },
    variants: [variantSchema],
    attributes: {
      type: Map,
      of: String
    },
    description: String,
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);
