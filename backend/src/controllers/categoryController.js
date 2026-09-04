import Category from "../models/Category.js";

function makeSlug(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function getCategories(req, res) {
  const filter = {
    ...(req.query.store ? { store: req.query.store } : {})
  };

  if (req.query.kind === "category") {
    filter.$or = [{ kind: "category" }, { kind: { $exists: false } }];
  } else if (req.query.kind) {
    filter.kind = req.query.kind;
  }

  const categories = await Category.find(filter).sort({ name: 1 }).lean();
  res.json(categories);
}

export async function createCategory(req, res) {
  try {
    const category = await Category.create({ ...req.body, slug: req.body.slug || makeSlug(req.body.name) });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Unable to create category", error: error.message });
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Unable to update category", error: error.message });
  }
}

export async function deleteCategory(req, res) {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.status(204).end();
}
