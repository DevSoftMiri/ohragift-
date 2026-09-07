import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsByStore } from "../services/catalogService";
import { useAppContext } from "../store/AppContext";
import OptimizedImage from "../components/OptimizedImage";

const fallbackImages = {
  "birthday-bloom-box": "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=420&q=80",
  "golden-hour-gift-hamper": "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=420&q=80",
  "oversized-essential-tee": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=420&q=80",
  "studio-layer-shirt": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=420&q=80"
};

const storeMeta = {
  gifts: {
    label: "OHRA Gifts",
    note: "Gift wrapping, message cards and delivery scheduling can be added at checkout.",
    cta: "Continue Gift Shopping",
    to: "/gifts",
    tone: "gifts"
  },
  wears: {
    label: "OHRA Wears",
    note: "Apparel items share the same bag and checkout with your gifts.",
    cta: "Continue Wears Shopping",
    to: "/wears",
    tone: "wears"
  }
};

function formatPrice(value) {
  return `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function CartPage() {
  const { addToCart, cartItems, removeFromCart, totals, updateCartQuantity } = useAppContext();
  const [bestSellingGifts, setBestSellingGifts] = useState([]);
  const grouped = cartItems.reduce((acc, item) => {
    const store = item.store || "gifts";
    acc[store] = acc[store] || [];
    acc[store].push(item);
    return acc;
  }, {});
  const deliveryEstimate = totals.subtotal >= 999 ? 0 : 99;
  const grandTotal = totals.subtotal + deliveryEstimate;
  const cartSlugs = new Set(cartItems.map((item) => item.slug));
  const recommendedGifts = bestSellingGifts.filter((product) => !cartSlugs.has(product.slug)).slice(0, 4);

  useEffect(() => {
    getProductsByStore("gifts").then(setBestSellingGifts);
  }, []);

  return (
    <main className="cart-page">
      <header className="cart-hero">
        <Link to="/gifts" aria-label="Back to OHRA Gifts">&lsaquo;</Link>
        <div>
          <p>Shared OHRA Bag</p>
          <h1>Your Cart ({cartItems.length})</h1>
          <span>Gifts and wears stay together, with one calm checkout.</span>
        </div>
      </header>

      {cartItems.length === 0 ? (
        <section className="cart-empty">
          <p>Your cart is empty</p>
          <h2>Find something beautiful across OHRA.</h2>
          <div>
            <Link to="/gifts">Shop Gifts</Link>
            <Link to="/wears">Shop Wears</Link>
          </div>
        </section>
      ) : (
        <section className="cart-layout">
          <div className="cart-items-panel">
            {Object.entries(grouped).map(([store, items]) => {
              const meta = storeMeta[store] || storeMeta.gifts;
              return (
                <section className={`cart-store-group ${meta.tone}`} key={store}>
                  <div className="cart-store-heading">
                    <div>
                      <p>{meta.label}</p>
                      <h2>{items.length} {items.length === 1 ? "item" : "items"}</h2>
                    </div>
                    <Link to={meta.to}>{meta.cta} <span>&rarr;</span></Link>
                  </div>

                  <div className="cart-item-list">
                    {items.map((item) => {
                      const itemKey = item.cartKey || item.slug;
                      const hasCustomization = item.customName || item.customCity;

                      return (
                      <article className="cart-item-card" key={itemKey}>
                        <OptimizedImage src={item.image || fallbackImages[item.slug] || fallbackImages["birthday-bloom-box"]} alt="" sizes="118px" />
                        <div>
                          <p>{meta.label}</p>
                          <h3>{item.name}</h3>
                          {hasCustomization ? (
                            <dl className="cart-custom-details">
                              {item.customName ? <><dt>Name</dt><dd>{item.customName}</dd></> : null}
                              {item.customCity ? <><dt>City</dt><dd>{item.customCity}</dd></> : null}
                            </dl>
                          ) : null}
                          <strong>{formatPrice(item.price)}</strong>
                          <div className="cart-quantity">
                            <button type="button" onClick={() => updateCartQuantity(itemKey, item.quantity - 1)} aria-label={`Decrease ${item.name}`}>-</button>
                            <span>{item.quantity}</span>
                            <button type="button" onClick={() => updateCartQuantity(itemKey, item.quantity + 1)} aria-label={`Increase ${item.name}`}>+</button>
                          </div>
                        </div>
                        <button className="cart-remove" type="button" onClick={() => removeFromCart(itemKey)} aria-label={`Remove ${item.name}`}>&times;</button>
                      </article>
                    );
                    })}
                  </div>

                  <p className="cart-store-note">{meta.note}</p>
                </section>
              );
            })}
          </div>

          <aside className="cart-summary-card">
            <p>Order Summary</p>
            <h2>{formatPrice(grandTotal)}</h2>
            <div>
              <span>Subtotal</span>
              <strong>{formatPrice(totals.subtotal)}</strong>
            </div>
            <div>
              <span>Delivery</span>
              <strong>{deliveryEstimate === 0 ? "Free" : formatPrice(deliveryEstimate)}</strong>
            </div>
            <div>
              <span>Total</span>
              <strong>{formatPrice(grandTotal)}</strong>
            </div>
            <Link className="cart-primary-action" to="/checkout">Checkout <span>&rarr;</span></Link>
            <Link className="cart-secondary-action" to="/gifts">Continue Shopping</Link>
            <small>Free shipping on orders above Rs. 999. Gift and apparel items can be checked out together.</small>
          </aside>
        </section>
      )}

      {recommendedGifts.length > 0 && (
        <section className="cart-bestsellers">
          <div className="cart-bestsellers-heading">
            <div>
              <p>Best Selling Gifts</p>
              <h2>Add something thoughtful before checkout</h2>
            </div>
            <Link to="/gifts/bestsellers">View All <span>&rarr;</span></Link>
          </div>
          <div className="cart-bestseller-grid">
            {recommendedGifts.map((product) => (
              <article key={product.slug}>
                <Link to={`/gifts/product/${product.slug}`}><OptimizedImage src={product.image || fallbackImages[product.slug] || fallbackImages["birthday-bloom-box"]} alt={product.name} sizes="(max-width: 720px) 45vw, 20vw" /></Link>
                <p>{product.eyebrow || product.category || "OHRA Gifts"}</p>
                <Link to={`/gifts/product/${product.slug}`}><h3>{product.name}</h3></Link>
                <strong>{formatPrice(product.salePrice || product.price)}</strong>
                <button type="button" onClick={() => addToCart(product)}>Add to Cart</button>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
