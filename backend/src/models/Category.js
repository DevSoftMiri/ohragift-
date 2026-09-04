import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    store: { type: String, enum: ["gifts", "wears"], required: true },
    kind: { type: String, enum: ["category", "occasion"], default: "category" },
    description: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["active", "hidden"], default: "active" }
  },
  { timestamps: true }
);

categorySchema.index({ store: 1, kind: 1, slug: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);
