import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminCatalog, loginAdmin, removeCategory, removeProduct, saveCategory, saveProduct } from "../../shared/services/adminService";
import OptimizedImage from "../../shared/components/OptimizedImage";

const emptyCategory = { name: "", kind: "category", description: "", image: "", status: "active" };
const emptyProduct = { name: "", category: "", occasion: "", subCategory: "", description: "", price: "", salePrice: "", inventory: "0", images: "", status: "draft" };
const giftCategoryNames = ["Photo Frames", "Decor", "Gifts"];
const giftOccasionNames = ["Anniversary", "Birthday", "Wedding"];
const personalisedProductTypes = ["Mugs", "Keychains", "Pens"];

function ProductRows({ products, token, loadCatalog, onEdit }) {
  if (!products.length) return <p>No products yet.</p>;
  return <div className="admin-list">
    {products.map((product) => <article key={product._id}>
      <OptimizedImage src={product.images?.[0]} alt="" sizes="70px" />
      <div><strong>{product.name}</strong><small>{product.subCategory || product.category || "Uncategorised"} - Rs. {product.salePrice || product.price}</small></div>
      <small>{product.status}</small>
      <div><button onClick={() => onEdit(product)}>Edit</button><button onClick={() => removeProduct(product._id, token).then(loadCatalog)}>Delete</button></div>
    </article>)}
  </div>;
}

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem("ohra-admin-token") || "");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [store, setStore] = useState("gifts");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const categoryOptions = store === "gifts"
    ? giftCategoryNames.map((name) => ({ name }))
    : categories.filter((category) => (category.kind || "category") === "category");
  const occasionOptions = store === "gifts"
    ? giftOccasionNames.map((name) => ({ name }))
    : categories.filter((category) => category.kind === "occasion");
  const visibleCategories = store === "gifts"
    ? categories.filter((category) => (category.kind === "occasion" && giftOccasionNames.includes(category.name)) || (category.kind !== "occasion" && giftCategoryNames.includes(category.name)))
    : categories;

  async function loadCatalog() {
    if (!token) return;
    setLoading(true);
    try {
      const [nextCategories, nextProducts] = await getAdminCatalog(store, token);
      setCategories(nextCategories);
      setProducts(nextProducts);
    } catch (error) {
      setNotice(error.message);
      if (error.message.includes("session")) {
        localStorage.removeItem("ohra-admin-token");
        setToken("");
      }
    } finally { setLoading(false); }
  }

  useEffect(() => { loadCatalog(); }, [store, token]);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const result = await loginAdmin(credentials);
      localStorage.setItem("ohra-admin-token", result.token);
      setToken(result.token);
      setNotice("Signed in. Your catalog is ready to manage.");
    } catch (error) { setNotice(error.message); }
  }

  async function handleCategory(event) {
    event.preventDefault();
    try {
      await saveCategory({ ...categoryForm, store }, token);
      setCategoryForm(emptyCategory);
      setNotice("Category saved.");
      loadCatalog();
    } catch (error) { setNotice(error.message); }
  }

  async function handleProduct(event) {
    event.preventDefault();
    try {
      await saveProduct({
        ...productForm,
        store,
        price: Number(productForm.price),
        salePrice: Number(productForm.salePrice || productForm.price),
        inventory: Number(productForm.inventory),
        images: productForm.images.split(",").map((image) => image.trim()).filter(Boolean)
      }, token);
      setProductForm(emptyProduct);
      setNotice("Product saved.");
      loadCatalog();
    } catch (error) { setNotice(error.message); }
  }

  function editProduct(product) {
    setProductForm({ ...product, images: (product.images || []).join(", ") });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function signOut() {
    localStorage.removeItem("ohra-admin-token");
    setToken("");
  }

  if (!token) return <main className="admin-login">
    <Link to="/">OHRA</Link>
    <section>
      <p>OHRA Commerce</p><h1>Admin sign in</h1>
      <span>Manage the Gifts and Wears catalog from one protected workspace.</span>
      <form onSubmit={handleLogin}>
        <label>Email<input type="email" required value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} /></label>
        <label>Password<input type="password" required value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} /></label>
        <button>Sign in</button>
      </form>
      {notice && <small>{notice}</small>}
    </section>
  </main>;

  return <main className="admin-page">
    <header className="admin-header">
      <Link to="/">OHRA <small>ADMIN</small></Link>
      <div>
        <button className={store === "gifts" ? "selected gifts" : ""} onClick={() => setStore("gifts")}>OHRA Gifts</button>
        <button className={store === "wears" ? "selected wears" : ""} onClick={() => setStore("wears")}>OHRA Wears</button>
      </div>
      <button className="sign-out" onClick={signOut}>Sign out</button>
    </header>

    <section className="admin-intro">
      <p>{store === "gifts" ? "Gifts catalog" : "Wears catalog"}</p>
      <h1>Manage {store === "gifts" ? "thoughtful gifting" : "the editorial wardrobe"}</h1>
      <span>Create categories, occasions and product listings that only appear in this store.</span>
    </section>
    {notice && <p className="admin-notice">{notice}</p>}

    <div className="admin-workspace">
      <section className="admin-card">
        <div className="admin-card-title"><h2>{categoryForm._id ? `Edit ${categoryForm.kind === "occasion" ? "occasion" : "category"}` : "Add category / occasion"}</h2><button onClick={() => setCategoryForm(emptyCategory)}>New</button></div>
        <form onSubmit={handleCategory} className="admin-form">
          <label>Entry type<select value={categoryForm.kind || "category"} onChange={(event) => setCategoryForm({ ...categoryForm, kind: event.target.value, name: "" })}><option value="category">Category</option><option value="occasion">Occasion</option></select></label>
          <label>Name{store === "gifts" ? <select required value={categoryForm.name} onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })}><option value="">Choose {categoryForm.kind === "occasion" ? "occasion" : "category"}</option>{(categoryForm.kind === "occasion" ? giftOccasionNames : giftCategoryNames).map((name) => <option key={name} value={name}>{name}</option>)}</select> : <input required value={categoryForm.name} onChange={(event) => setCategoryForm({ ...categoryForm, name: event.target.value })} placeholder={categoryForm.kind === "occasion" ? "Birthday" : "Unisex"} />}</label>
          <label>Description<textarea value={categoryForm.description} onChange={(event) => setCategoryForm({ ...categoryForm, description: event.target.value })} placeholder="Short category description" /></label>
          <label>Image URL<input value={categoryForm.image} onChange={(event) => setCategoryForm({ ...categoryForm, image: event.target.value })} placeholder="https://..." /></label>
          <label>Status<select value={categoryForm.status} onChange={(event) => setCategoryForm({ ...categoryForm, status: event.target.value })}><option value="active">Visible</option><option value="hidden">Hidden</option></select></label>
          <button className="admin-save">Save entry</button>
        </form>
      </section>

      <section className="admin-card admin-product-form">
        <div className="admin-card-title"><h2>{productForm._id ? "Edit product" : "Add product"}</h2><button onClick={() => setProductForm(emptyProduct)}>New</button></div>
        <form onSubmit={handleProduct} className="admin-form product-fields">
          <label>Product name<input required value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} /></label>
          <label>Category<select required value={productForm.category} onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}><option value="">Choose category</option>{categoryOptions.map((category) => <option key={category._id} value={category.name}>{category.name}</option>)}</select></label>
          {store === "gifts" && <label>Occasion<select value={productForm.occasion || ""} onChange={(event) => setProductForm({ ...productForm, occasion: event.target.value })}><option value="">Choose occasion</option>{occasionOptions.map((occasion) => <option key={occasion._id} value={occasion.name}>{occasion.name}</option>)}</select></label>}
          {store === "gifts" && <label>Personalised type<select value={productForm.subCategory || ""} onChange={(event) => setProductForm({ ...productForm, subCategory: event.target.value })}><option value="">Not a personalised product</option>{personalisedProductTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>}
          <label className="wide">Description<textarea value={productForm.description} onChange={(event) => setProductForm({ ...productForm, description: event.target.value })} /></label>
          <label>Regular price<input required min="0" type="number" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} /></label>
          <label>Sale price<input min="0" type="number" value={productForm.salePrice} onChange={(event) => setProductForm({ ...productForm, salePrice: event.target.value })} /></label>
          <label>Inventory<input min="0" type="number" value={productForm.inventory} onChange={(event) => setProductForm({ ...productForm, inventory: event.target.value })} /></label>
          <label>Status<select value={productForm.status} onChange={(event) => setProductForm({ ...productForm, status: event.target.value })}><option value="draft">Draft</option><option value="active">Active</option><option value="archived">Archived</option></select></label>
          <label className="wide">Image URLs (comma separated)<input value={productForm.images} onChange={(event) => setProductForm({ ...productForm, images: event.target.value })} placeholder="https://..., https://..." /></label>
          <button className="admin-save wide">Save product</button>
        </form>
      </section>
    </div>

    <section className="admin-inventory">
      <div><h2>{store === "gifts" ? "Gift" : "Wears"} categories & occasions</h2><span>{categories.length} entries</span></div>
      {loading ? <p>Loading catalog...</p> : <div className="admin-list">
        {visibleCategories.map((category) => <article key={category._id}><strong>{category.name}</strong><small>{category.kind === "occasion" ? "Occasion" : "Category"} - {category.status}</small><div><button onClick={() => setCategoryForm({ ...emptyCategory, ...category, kind: category.kind || "category" })}>Edit</button><button onClick={() => removeCategory(category._id, token).then(loadCatalog)}>Delete</button></div></article>)}
        {!categories.length && <p>No categories or occasions yet.</p>}
      </div>}
    </section>

    <section className="admin-inventory">
      <div><h2>{store === "gifts" ? "Gift" : "Wears"} products</h2><span>{products.length} entries</span></div>
      <ProductRows products={products} token={token} loadCatalog={loadCatalog} onEdit={editProduct} />
    </section>
  </main>;
}
