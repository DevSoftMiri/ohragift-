import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsByStore } from "../services/catalogService";
import { useAppContext } from "../store/AppContext";

export default function WishlistPage() {
  const [catalog, setCatalog] = useState([]);
  const { wishlistItems, toggleWishlist, addToCart } = useAppContext();
  useEffect(() => { Promise.all([getProductsByStore("gifts"), getProductsByStore("wears")]).then(([gifts, wears]) => setCatalog([...gifts, ...wears])); }, []);
  const saved = catalog.filter((product) => wishlistItems.includes(product.slug));

  return <main className="wishlist-page"><header><Link to="/">OHRA</Link><div><p>My wishlist</p><h1>Saved for later</h1><span>{saved.length} {saved.length === 1 ? "item" : "items"} across Gifts and Wears</span></div></header>
    {!saved.length ? <section className="wishlist-empty"><h2>Your wishlist is waiting.</h2><p>Save gifts and wardrobe pieces you want to come back to.</p><div><Link to="/gifts">Explore gifts</Link><Link to="/wears">Explore wears</Link></div></section> : <section className="wishlist-grid">{saved.map((product) => <article key={product.slug}><Link to={`/${product.store}/product/${product.slug}`}><img src={product.image} alt={product.name} /></Link><div><p>OHRA {product.store}</p><h2>{product.name}</h2><strong>Rs. {(product.salePrice || product.price).toLocaleString("en-IN")}</strong></div><button className="wishlist-remove" onClick={() => toggleWishlist(product.slug)}>Remove</button><button className="wishlist-bag" onClick={() => addToCart(product)}>Move to bag</button></article>)}</section>}
  </main>;
}
