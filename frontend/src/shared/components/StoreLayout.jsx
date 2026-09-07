import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../store/AppContext";
import OptimizedImage from "./OptimizedImage";

function WearsFooter() {
  return (
    <footer className="wears-footer">
      <nav aria-label="OHRA Wears social links">
        <a href="https://www.instagram.com/wearohra/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://www.linkedin.com/in/ohrawear" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://www.facebook.com/people/ohrawear" target="_blank" rel="noreferrer">Facebook</a>
        <Link to="/wears/about">About Us</Link>
      </nav>
      <nav aria-label="OHRA Wears customer care">
        <Link to="/wears/info/shipping-policy">Shipping &amp; Payment</Link>
        <Link to="/wears/info/returns-replacement">Returns &amp; Exchanges</Link>
        <Link to="/wears/info/business-enquiries">Business Enquiries</Link>
        <Link to="/wears/info/customer-enquiries">Customer Enquiries</Link>
      </nav>
      <Link className="wears-footer-logo" to="/wears" aria-label="OHRA Wears home">
        <OptimizedImage src="/images/wears/wear logo.png" alt="OHRA Wears" sizes="160px" />
      </Link>
      <div className="wears-footer-bottom">
        <span>&copy; 2026, OHRA Wears</span>
        <Link to="/wears/info/privacy-policy">Privacy policy</Link>
        <Link to="/wears/info/terms-of-service">Terms of service</Link>
        <Link to="/wears/info/cancellation-policy">Refund policy</Link>
        <Link to="/wears/info/shipping-policy">Shipping policy</Link>
        <Link to="/wears/info/customer-enquiries">Contact information</Link>
      </div>
    </footer>
  );
}

export default function StoreLayout({ store, children }) {
  const { cartItems, totals, wishlistItems, removeFromCart, updateCartQuantity } = useAppContext();
  const location = useLocation();
  const [mobilePanel, setMobilePanel] = useState(null);
  const [closedDropdown, setClosedDropdown] = useState(null);
  const isGifts = store === "gifts";
  const isWearsPath = location.pathname.startsWith("/wears");
  const isPersonalisedPath = location.pathname.startsWith("/gifts/personalised") || location.pathname.startsWith("/gifts/create-your-gift");
  const giftNavItems = [
    ["Home", "/gifts", false],
    ["Categories", "/gifts/categories", true],
    ["Occasions", "/gifts/occasions", true],
    ["Personalised", "/gifts/personalised", false],
    ["Hampers", "/gifts/boxes", false],
  ];
  const giftDropdowns = {
    Categories: {
      title: "Shop by Category",
      to: "/gifts/categories",
      links: ["Photo Frames", "Decor", "Gifts"]
    },
    Occasions: {
      title: "Shop by Occasion",
      to: "/gifts/occasions",
      links: ["Anniversary", "Birthday", "Wedding"]
    },
    Personalised: {
      title: "Personalised Gifts",
      to: "/gifts/personalised",
      links: ["Personalised Mugs", "Personalised Keychains", "Personalised Pens"]
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
    <div className={`store-shell ${store}${isPersonalisedPath ? " personalised-store" : ""}`}>
      {!isGifts ? (
        <div className="wears-top-strip" aria-label="OHRA Wears custom product messages">
          <span>CUSTOM PRODUCT</span>
          <span>CUSTOM DESIGN</span>
          <span>WEAR YOUR OWN STORY</span>
          <span>CUSTOM MADE FOR YOU</span>
          <span>WEAR WHAT YOU IMAGINE</span>
        </div>
      ) : null}
      <header className="store-header">
        {isGifts ? (
          <>
            <div className="gift-top-strip gift-desktop-strip">
              <span><b aria-hidden="true">&#x25A1;</b> For queries or placing order on call</span>
              <a className="gift-top-whatsapp" href="https://wa.me/918307642071" target="_blank" rel="noreferrer">Please call or WhatsApp on 83076 42071</a>
              <span className="gift-top-links">
                <Link to="/orders">Track Order</Link>
                <Link to="/account">Help &amp; Support</Link>
                <a href="tel:+918307642071">83076 42071</a>
              </span>
            </div>

            <div className="gift-header-main gift-desktop-header">
              <Link className="brand-lockup" to="/gifts"><span className="brand-gift-mark">OHRA</span><strong>GIFTS</strong></Link>

              <nav className="gift-primary-nav" aria-label="Gifts navigation">
                {giftNavItems.map(([label, to, hasMenu]) => (
                  <div className={`gift-nav-item${closedDropdown === label ? " dropdown-closed" : ""}`} key={to} onMouseEnter={() => setClosedDropdown(null)}>
                    <Link className={location.pathname === to ? "active" : ""} to={to}>{label}</Link>
                    {hasMenu && (
                      <section className="gift-mega-menu single-dropdown" aria-label={`${label} menu`}>
                        <div className="gift-mega-links">
                          <p>{giftDropdowns[label].title}</p>
                          {giftDropdowns[label].links.map((item) => (
                            <Link key={item} onClick={() => setClosedDropdown(label)} to={`${giftDropdowns[label].to}?${label === "Occasions" ? "occasion" : "category"}=${encodeURIComponent(item)}`}>{item}</Link>
                          ))}
                          <Link className="gift-mega-more" onClick={() => setClosedDropdown(label)} to={giftDropdowns[label].to}>View All {label} <span>&rarr;</span></Link>
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
              <div className="gift-mobile-offer"><span aria-hidden="true">&#x25A1;</span> Call or WhatsApp 83076 42071 to place orders</div>
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
                    <OptimizedImage src={image} alt="" sizes="64px" />
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
                      <a href="tel:+918307642071"><i>P</i>83076 42071</a>
                    </nav>
                  )}

                  {["categories", "occasions", "personalised", "hampers"].includes(mobilePanel) && (
                    <section className="gift-mobile-submenu">
                      <h2>{giftDropdowns[mobilePanel === "hampers" ? "Hampers" : mobilePanel[0].toUpperCase() + mobilePanel.slice(1)].title}</h2>
                      {giftDropdowns[mobilePanel === "hampers" ? "Hampers" : mobilePanel[0].toUpperCase() + mobilePanel.slice(1)].links.map((item, index) => (
                        <Link key={item} to={`${giftDropdowns[mobilePanel === "hampers" ? "Hampers" : mobilePanel[0].toUpperCase() + mobilePanel.slice(1)].to}?${mobilePanel === "occasions" ? "occasion" : "category"}=${encodeURIComponent(item)}`} onClick={() => setMobilePanel(null)}>
                          <OptimizedImage src={mobileShortcuts[index % mobileShortcuts.length][2]} alt="" sizes="44px" />
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
                      <div>{searchSuggestions.map((item) => <Link key={item} to="/gifts/categories" onClick={() => setMobilePanel(null)}><span aria-hidden="true">&#9906;</span>{item}</Link>)}</div>
                      <h2>Popular Searches</h2>
                      <nav>{popularSearches.map((item) => <Link key={item} to={item === "Hampers" ? "/gifts/boxes" : item === "Personalised" ? "/gifts/personalised" : "/gifts/categories"} onClick={() => setMobilePanel(null)}>{item}</Link>)}</nav>
                    </section>
                  )}

                  {mobilePanel === "cart" && (
                    <section className="gift-mobile-cart">
                      <h2>Your Cart ({giftCartItems.length})</h2>
                      {giftCartItems.map((item) => (
                        <article key={item.slug}>
                          {item.image && <OptimizedImage src={item.image} alt="" sizes="84px" />}
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
            <Link className="wears-logo-link" to="/wears" aria-label="OHRA Wears home"><OptimizedImage src="/images/wears/wear logo.png" alt="OHRA Wears" sizes="160px" /></Link>
            <nav className="wears-primary-nav" aria-label="Wears navigation">
              <Link to="/wears">Shop</Link>
              <a href="#summer-drop">Summer '26</a>
              <a href="#best-sellers">Almost Gone</a>
            </nav>
            <div className="header-links">
              <Link className="wears-to-gifts" to="/gifts">OHRA GIFTS <span aria-hidden="true">&rarr;</span></Link>
              <Link aria-label="Wishlist" to="/wishlist">&#9825;<span>{wishlistItems.length}</span></Link>
              <Link aria-label="Shopping bag" to="/cart">&#128722;<span>{totals.items}</span></Link>
            </div>
          </>
        )}
      </header>
      {children}
      {!isGifts ? <WearsFooter /> : null}
      <nav className="mobile-store-switcher" aria-label="Switch OHRA store">
        <Link className={!isWearsPath ? "active gifts-tab" : "gifts-tab"} to="/gifts">
          <span aria-hidden="true"><OptimizedImage src="/images/gift.png" alt="" sizes="32px" /></span>
          <strong>OHRA Gifts</strong>
        </Link>
        <Link className={isWearsPath ? "active wears-tab" : "wears-tab"} to="/wears">
          <span aria-hidden="true"><OptimizedImage src="/images/cloth.png" alt="" sizes="32px" /></span>
          <strong>OHRA Wears</strong>
        </Link>
      </nav>
    </div>
  );
}
