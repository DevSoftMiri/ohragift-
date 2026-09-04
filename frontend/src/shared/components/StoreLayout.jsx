import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../store/AppContext";

export default function StoreLayout({ store, children }) {
  const { cartItems, totals, wishlistItems, removeFromCart, updateCartQuantity } = useAppContext();
  const location = useLocation();
  const [mobilePanel, setMobilePanel] = useState(null);
  const isGifts = store === "gifts";
  const isWearsPath = location.pathname.startsWith("/wears");
  const giftNavItems = [
    ["Categories", "/gifts/categories", true],
    ["Occasions", "/gifts/occasions", true],
    ["Personalised", "/gifts/personalised", true],
    ["Hampers", "/gifts/boxes", true],
    ["Best Sellers", "/gifts/bestsellers", false],
    ["Offers", "/gifts/offers", false]
  ];
  const giftDropdowns = {
    Categories: {
      title: "Shop by Category",
      to: "/gifts/categories",
      links: ["Flowers & Bouquets", "Chocolates & Sweets", "Cakes & Celebration", "Home & Living", "Fashion & Accessories", "Beauty & Self-Care", "Stationery", "Photo Gifts", "Kids Gifts", "Spiritual Gifts", "Premium Gifts"]
    },
    Occasions: {
      title: "Shop by Occasion",
      to: "/gifts/occasions",
      links: ["Birthday", "Anniversary", "Wedding", "Engagement", "Housewarming", "Baby Shower", "Graduation", "Farewell", "Diwali", "Raksha Bandhan", "Holi", "Christmas"]
    },
    Personalised: {
      title: "Personalised Gifts",
      to: "/gifts/personalised",
      links: ["Personalised Mugs", "Photo Frames", "Custom Bottles", "Name Keychains", "Custom Cushions", "Photo Lamps", "Engraved Gifts", "Custom Diaries", "Personalised Pens", "Custom Jewellery"]
    },
    Hampers: {
      title: "Gift Boxes & Hampers",
      to: "/gifts/boxes",
      links: ["Gift Hampers", "Corporate Hampers", "Birthday Hampers", "Anniversary Hampers", "For Her Hampers", "For Him Hampers", "Chocolate Hampers", "Self-Care Hampers", "Coffee Lover Hampers", "Tea Lover Hampers", "Festive Hampers", "Premium Hampers"]
    }
  };
  const mobileShortcuts = [
    ["Birthday", "/gifts/occasions", "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=180&q=80"],
    ["Hampers", "/gifts/boxes", "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=180&q=80"],
    ["Personalised", "/gifts/personalised", "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=180&q=80"],
    ["For Her", "/gifts/categories", "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=180&q=80"]
  ];
  const searchSuggestions = ["birthday gifts for her", "birthday gifts for him", "personalised birthday gifts", "birthday hampers", "birthday gift boxes"];
  const popularSearches = ["Birthday", "Hampers", "Personalised", "Anniversary", "For Him", "For Her"];
  const giftCartItems = cartItems.filter((item) => item.store !== "wears");

  return (
    <div className={`store-shell ${store}`}>
      <header className="store-header">
        {isGifts ? (
          <>
            <div className="gift-top-strip gift-desktop-strip">
              <span><b aria-hidden="true">&#x25A1;</b> For queries or placing order on call</span>
              <span>Please call or WhatsApp on +91 1478523698</span>
              <span className="gift-top-links">
                <Link to="/orders">Track Order</Link>
                <Link to="/account">Help &amp; Support</Link>
                <a href="tel:+911478523698">+91 14785 23698</a>
              </span>
            </div>

            <div className="gift-header-main gift-desktop-header">
              <Link className="brand-lockup" to="/gifts"><span className="brand-gift-mark">OHRA</span><strong>GIFTS</strong></Link>

              <nav className="gift-primary-nav" aria-label="Gifts navigation">
                {giftNavItems.map(([label, to, hasMenu]) => (
                  <div className="gift-nav-item" key={to}>
                    <Link className={location.pathname === to ? "active" : ""} to={to}>{label}</Link>
                    {hasMenu && (
                      <section className="gift-mega-menu single-dropdown" aria-label={`${label} menu`}>
                        <div className="gift-mega-links">
                          <p>{giftDropdowns[label].title}</p>
                          {giftDropdowns[label].links.map((item) => <Link key={item} to="/gifts/products">{item}</Link>)}
                          <Link className="gift-mega-more" to={giftDropdowns[label].to}>View All {label} <span>&rarr;</span></Link>
                        </div>
                      </section>
                    )}
                  </div>
                ))}
              </nav>

              <div className="header-links gift-header-actions">
                <Link aria-label="Wishlist" to="/wishlist">&#9825;<span>{wishlistItems.length}</span></Link>
                <Link aria-label="Shopping bag" to="/cart">&#128722;<span>{totals.items}</span></Link>
                <Link className="create-gift-button" to="/gifts/personalised">Create Your Gift <span>&rarr;</span></Link>
                <Link className="wears-switch-button" to="/wears">OHRA WEARS</Link>
              </div>
            </div>

            <div className="gift-mobile-header">
              <div className="gift-mobile-offer"><span aria-hidden="true">&#x25A1;</span> Call or WhatsApp +91 1478523698 to place orders</div>
              <div className="gift-mobile-main">
                <button type="button" onClick={() => setMobilePanel("menu")} aria-label="Open menu">&#9776;</button>
                <Link className="brand-lockup" to="/gifts"><span className="brand-gift-mark">OHRA</span><strong>GIFTS</strong></Link>
                <div>
                  <Link aria-label="Wishlist" to="/wishlist">&#9825;<span>{wishlistItems.length}</span></Link>
                  <button type="button" onClick={() => setMobilePanel("cart")} aria-label="Open cart">&#128722;<span>{totals.items}</span></button>
                </div>
              </div>
              <button className="gift-mobile-search" type="button" onClick={() => setMobilePanel("search")}>
                <span aria-hidden="true">&#9906;</span>
                Search for gifts, hampers, occasions...
              </button>
              <nav className="gift-mobile-shortcuts" aria-label="Popular gift shortcuts">
                {mobileShortcuts.map(([label, to, image]) => (
                  <Link key={label} to={to}>
                    <img src={image} alt="" />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {mobilePanel && (
              <div className="gift-mobile-panel" role="dialog" aria-modal="true">
                <div className="gift-mobile-panel-card">
                  <header>
                    <button type="button" onClick={() => setMobilePanel(null)} aria-label="Close panel">{mobilePanel === "menu" ? <>&times;</> : <>&lsaquo;</>}</button>
                    <Link className="brand-lockup" to="/gifts" onClick={() => setMobilePanel(null)}><span className="brand-gift-mark">OHRA</span><strong>GIFTS</strong></Link>
                    <div>
                      <Link aria-label="Wishlist" to="/wishlist" onClick={() => setMobilePanel(null)}>&#9825;<span>{wishlistItems.length}</span></Link>
                      <button type="button" onClick={() => setMobilePanel("cart")} aria-label="Open cart">&#128722;<span>{totals.items}</span></button>
                    </div>
                  </header>

                  {mobilePanel === "menu" && (
                    <nav className="gift-mobile-menu" aria-label="Mobile gifts menu">
                      <Link to="/gifts" onClick={() => setMobilePanel(null)}><i>H</i>Home</Link>
                      {giftNavItems.map(([label, to, hasMenu]) => (
                        hasMenu ? (
                          <button key={label} type="button" onClick={() => setMobilePanel(label.toLowerCase())}>
                            <i>{label[0]}</i><span>{label}</span><b>&rsaquo;</b>
                          </button>
                        ) : (
                          <Link key={label} to={to} onClick={() => setMobilePanel(null)}><i>{label[0]}</i>{label}</Link>
                        )
                      ))}
                      <hr />
                      <Link to="/gifts/personalised" onClick={() => setMobilePanel(null)}><i>*</i>Create Your Gift</Link>
                      <Link to="/wears" onClick={() => setMobilePanel(null)}><i>T</i>Ohra Wears <em>New</em></Link>
                      <hr />
                      <Link to="/orders" onClick={() => setMobilePanel(null)}><i>O</i>Track Order</Link>
                      <Link to="/account" onClick={() => setMobilePanel(null)}><i>?</i>Help &amp; Support</Link>
                      <a href="tel:+919876543210"><i>P</i>+91 98765 43210</a>
                    </nav>
                  )}

                  {["categories", "occasions", "personalised", "hampers"].includes(mobilePanel) && (
                    <section className="gift-mobile-submenu">
                      <h2>{giftDropdowns[mobilePanel === "hampers" ? "Hampers" : mobilePanel[0].toUpperCase() + mobilePanel.slice(1)].title}</h2>
                      {giftDropdowns[mobilePanel === "hampers" ? "Hampers" : mobilePanel[0].toUpperCase() + mobilePanel.slice(1)].links.map((item, index) => (
                        <Link key={item} to="/gifts/products" onClick={() => setMobilePanel(null)}>
                          <img src={mobileShortcuts[index % mobileShortcuts.length][2]} alt="" />
                          <span>{item}</span>
                          <b>&rsaquo;</b>
                        </Link>
                      ))}
                    </section>
                  )}

                  {mobilePanel === "search" && (
                    <section className="gift-mobile-search-panel">
                      <label>
                        <span aria-hidden="true">&#9906;</span>
                        <input defaultValue="birthday gifts" aria-label="Search gifts" />
                        <button type="button" aria-label="Clear search">&times;</button>
                      </label>
                      <div>{searchSuggestions.map((item) => <Link key={item} to="/gifts/products" onClick={() => setMobilePanel(null)}><span aria-hidden="true">&#9906;</span>{item}</Link>)}</div>
                      <h2>Popular Searches</h2>
                      <nav>{popularSearches.map((item) => <Link key={item} to="/gifts/products" onClick={() => setMobilePanel(null)}>{item}</Link>)}</nav>
                    </section>
                  )}

                  {mobilePanel === "cart" && (
                    <section className="gift-mobile-cart">
                      <h2>Your Cart ({giftCartItems.length})</h2>
                      {giftCartItems.map((item) => (
                        <article key={item.slug}>
                          {item.image && <img src={item.image} alt="" />}
                          <div>
                            <h3>{item.name}</h3>
                            <strong>Rs. {item.price.toLocaleString("en-IN")}</strong>
                            <span>
                              <button type="button" onClick={() => updateCartQuantity(item.slug, item.quantity - 1)}>-</button>
                              {item.quantity}
                              <button type="button" onClick={() => updateCartQuantity(item.slug, item.quantity + 1)}>+</button>
                            </span>
                          </div>
                          <button type="button" onClick={() => removeFromCart(item.slug)} aria-label={`Remove ${item.name}`}>&times;</button>
                        </article>
                      ))}
                      <p><span>Subtotal</span><strong>Rs. {giftCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString("en-IN")}</strong></p>
                      <Link to="/cart" onClick={() => setMobilePanel(null)}>View Cart <span>&rarr;</span></Link>
                      <Link to="/checkout" onClick={() => setMobilePanel(null)}>Checkout</Link>
                    </section>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <Link className="wears-logo-link" to="/wears" aria-label="OHRA Wears home"><img src="/images/wears/wear logo.png" alt="OHRA Wears" /></Link>
            <nav className="wears-primary-nav" aria-label="Wears navigation">
              <Link to="/wears/products">Shop</Link>
              <a href="#summer-drop">Summer '26</a>
              <a href="#best-sellers">Almost Gone</a>
            </nav>
            <div className="header-links">
              <Link className="wears-to-gifts" to="/gifts">OHRA GIFTS</Link>
              <Link aria-label="Wishlist" to="/wishlist">&#9825;<span>{wishlistItems.length}</span></Link>
              <Link aria-label="Shopping bag" to="/cart">&#128722;<span>{totals.items}</span></Link>
            </div>
          </>
        )}
      </header>
      {children}
      <nav className="mobile-store-switcher" aria-label="Switch OHRA store">
        <Link className={!isWearsPath ? "active gifts-tab" : "gifts-tab"} to="/gifts">
          <span aria-hidden="true">&#127873;</span>
          <strong>OHRA Gifts</strong>
        </Link>
        <Link className={isWearsPath ? "active wears-tab" : "wears-tab"} to="/wears">
          <span aria-hidden="true">&#128085;</span>
          <strong>OHRA Wears</strong>
        </Link>
      </nav>
    </div>
  );
}
