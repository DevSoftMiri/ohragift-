const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}, token) {
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "The request could not be completed");
  }

  return response.status === 204 ? null : response.json();
}

export function loginAdmin(credentials) {
  return request("/admin/login", { method: "POST", body: JSON.stringify(credentials) });
}

export function getAdminCatalog(store, token) {
  return Promise.all([
    request(`/admin/categories?store=${store}`, {}, token),
    request(`/admin/products?store=${store}`, {}, token)
  ]);
}

export function saveCategory(category, token) {
  const isEditing = Boolean(category._id);
  return request(`/admin/categories${isEditing ? `/${category._id}` : ""}`, {
    method: isEditing ? "PATCH" : "POST",
    body: JSON.stringify(category)
  }, token);
}

export function removeCategory(id, token) {
  return request(`/admin/categories/${id}`, { method: "DELETE" }, token);
}

export function saveProduct(product, token) {
  const isEditing = Boolean(product._id);
  return request(`/admin/products${isEditing ? `/${product._id}` : ""}`, {
    method: isEditing ? "PATCH" : "POST",
    body: JSON.stringify(product)
  }, token);
}

export function removeProduct(id, token) {
  return request(`/admin/products/${id}`, { method: "DELETE" }, token);
}
