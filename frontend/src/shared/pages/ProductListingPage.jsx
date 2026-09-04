import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoreLayout from "../components/StoreLayout";
import { getProductsByStore } from "../services/catalogService";

export default function ProductListingPage({ store }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByStore(store).then(setProducts);
  }, [store]);

  return (
    <StoreLayout store={store}>
      <main className="listing-page">
        <div className="section-heading">
          <p className="eyebrow">{store === "gifts" ? "Curated gifting" : "Editorial wardrobe"}</p>
          <h1>{store === "gifts" ? "Shop premium gifts" : "Shop premium wears"}</h1>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.slug}>
              <img src={product.image} alt={product.name} />
              <p className="eyebrow">{product.eyebrow}</p>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="price-row">
                <strong>Rs. {product.salePrice}</strong>
                <span>Rs. {product.price}</span>
              </div>
              <Link to={`/${store}/product/${product.slug}`}>View product</Link>
            </article>
          ))}
        </div>
      </main>
    </StoreLayout>
  );
}
