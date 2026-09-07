import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoreLayout from "../../shared/components/StoreLayout";
import { useAppContext } from "../../shared/store/AppContext";

const categories = [
  ["Birthday", "/gifts/occasions", "https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?auto=format&fit=crop&w=320&q=80"],
  ["For Her", "/gifts/categories", "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=320&q=80"],
  ["For Him", "/gifts/categories", "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=320&q=80"],
  ["Anniversary", "/gifts/occasions", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=320&q=80"],
  ["Personalised", "/gifts/personalised", "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=320&q=80"],
  ["Gift Hampers", "/gifts/boxes", "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=320&q=80"],
  ["Corporate", "/gifts/categories", "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=320&q=80"],
  ["Festive", "/gifts/occasions", "https://images.unsplash.com/photo-1544907524-7c7d7c2af5b3?auto=format&fit=crop&w=320&q=80"]
];

const products = [
  { slug: "personalised-wooden-photo-lamp", store: "gifts", name: "Personalised Wooden Photo Lamp", price: 1799, salePrice: 1299, image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=700&q=80", eyebrow: "Best Selling Gifts", description: "A warm wooden photo lamp customised with a favourite memory." },
  { slug: "luxury-gift-hamper-for-him", store: "gifts", name: "Luxury Gift Hamper For Him", price: 3299, salePrice: 2499, image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=700&q=80", eyebrow: "Best Selling Gifts", description: "A premium hamper curated with elegant keepsakes and treats." },
  { slug: "personalised-name-leather-wallet", store: "gifts", name: "Personalised Name Leather Wallet", price: 1299, salePrice: 899, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=700&q=80", eyebrow: "Best Selling Gifts", description: "A sleek leather wallet finished with a personalised name detail." },
  { slug: "scented-candle-gift-set", store: "gifts", name: "Scented Candle Gift Set", price: 1699, salePrice: 1199, image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80", eyebrow: "Best Selling Gifts", description: "Softly scented candles packed for a calm, thoughtful gifting moment." },
  { slug: "custom-couple-caricature-frame", store: "gifts", name: "Custom Couple Caricature Frame", price: 1999, salePrice: 1499, image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=700&q=80", eyebrow: "Best Selling Gifts", description: "A playful custom couple frame made for anniversaries and celebrations." }
];

const heroSlides = [
  { eyebrow: "Signature Gifting", title: "Elegant Hampers For Beautiful Occasions", description: "Soft florals, premium keepsakes and thoughtful treats styled to feel truly special.", action: "Explore Gifts", to: "/gifts/categories", desktop: "signature gifting.png", mobile: "06_mobile_signature_gifting.png" },
  { eyebrow: "Personalised Gifts", title: "Made Just For The One You Love", description: "Custom notes, charming keepsakes and delicate details that turn gifts into memories.", action: "Personalise Now", to: "/gifts/personalised", desktop: "personalized gift.png", mobile: "07_mobile_personalised_gifts.png" },
  { eyebrow: "Festive Gifting", title: "Light Up Every Celebration", description: "Rich festive hampers with warm gold accents for Diwali, hosting and heartfelt gifting.", action: "Shop Festive Gifts", to: "/gifts/occasions", desktop: "festive gifting.png", mobile: "08_mobile_festive_gifting.png" },
  { eyebrow: "Build Your Hamper", title: "Curate A Hamper In Your Style", description: "Pick the treats, packaging and finishing touches for a gift that feels uniquely yours.", action: "Build A Hamper", to: "/gifts/boxes", desktop: "gift hampers.png", mobile: "09_mobile_build_your_own_hamper.png" },
  { eyebrow: "Corporate Gifting", title: "Refined Gifts For Clients And Teams", description: "Desk-ready gift sets designed to thank, welcome and leave a polished lasting impression.", action: "Explore Corporate Gifts", to: "/gifts/categories", desktop: "corporate gifting.png", mobile: "10_mobile_corporate_gifting.png" }
];

export default function GiftsHomePage() {
  const { addToCart, wishlistItems, toggleWishlist } = useAppContext();
  const [activeHero, setActiveHero] = useState(0);
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => setActiveHero((current) => (current + 1) % heroSlides.length), 5500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <StoreLayout store="gifts">
      <main className="gifts-home">
        <section className="gifts-showcase gifts-carousel" aria-label="OHRA Gifts featured collections">
          {heroSlides.map((slide, index) => <article className={`gift-hero-slide ${index === activeHero ? "active" : ""}`} key={slide.desktop} aria-hidden={index !== activeHero}>
            <picture className="gift-hero-image"><source media="(max-width: 700px)" srcSet={`/images/gifts/${slide.mobile}`} /><img src={`/images/gifts/${slide.desktop}`} alt={`${slide.eyebrow} by OHRA Gifts`} /></picture>
            <div className="gift-hero-overlay" />
            <div className="gift-hero-copy">
              <p className="gifts-kicker">{slide.eyebrow}</p>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <Link className="wine-button" to={slide.to}>{slide.action} <span>&rarr;</span></Link>
            </div>
          </article>)}
          <div className="gift-hero-dots" aria-label="Featured collection slides">{heroSlides.map((slide, index) => <button key={slide.desktop} className={index === activeHero ? "active" : ""} onClick={() => setActiveHero(index)} aria-label={`Show ${slide.eyebrow}`} />)}</div>
        </section>

        <section className="crossing-ribbon" aria-label="OHRA Gifts highlights">
          <div className="ribbon-strip ribbon-secondary">
            <div className="ribbon-track">
              <span>Birthdays <b>✦</b> Anniversaries <b>✦</b> Weddings <b>✦</b> For Her <b>✦</b> For Him <b>✦</b> Celebrations <b>✦</b> Special Moments <b>✦</b></span>
              <span aria-hidden="true">Birthdays <b>✦</b> Anniversaries <b>✦</b> Weddings <b>✦</b> For Her <b>✦</b> For Him <b>✦</b> Celebrations <b>✦</b> Special Moments <b>✦</b></span>
            </div>
          </div>
          <div className="ribbon-strip ribbon-primary">
            <div className="ribbon-track">
              <span>Thoughtful Gifting <b>✦</b> Personalised With Love <b>✦</b> Gifts For Every Occasion <b>✦</b> Beautifully Wrapped <b>✦</b> Made To Make Them Smile <b>✦</b> OHRA Gifts <b>✦</b></span>
              <span aria-hidden="true">Thoughtful Gifting <b>✦</b> Personalised With Love <b>✦</b> Gifts For Every Occasion <b>✦</b> Beautifully Wrapped <b>✦</b> Made To Make Them Smile <b>✦</b> OHRA Gifts <b>✦</b></span>
            </div>
          </div>
        </section>

        <section className="gifts-assurances" aria-label="Shopping benefits">
          {[["&#128666;", "Free Shipping", "On orders over Rs. 499"], ["&#9826;", "Secure Payment", "100% secure payment"], ["&#9993;", "Easy Returns", "7 days return policy"], ["&#9742;", "24/7 Support", "We're here to help"]].map(([icon, title, text]) => (
            <article key={title}><span dangerouslySetInnerHTML={{ __html: icon }} /><div><strong>{title}</strong><small>{text}</small></div></article>
          ))}
        </section>

        <section className="gifts-section" id="occasions">
          <div className="gifts-section-title"><h2>Find the Perfect Gift</h2><Link to="/gifts/categories">View All Categories <span>&rarr;</span></Link></div>
          <div className="category-row">
            {categories.map(([name, to, image]) => <Link to={to} className="category-item" key={name}><img src={image} alt="" /><strong>{name}</strong></Link>)}
          </div>
        </section>

        <section className="gifts-section" id="best-sellers">
          <div className="gifts-section-title"><h2>Best Selling Gifts</h2><Link to="/gifts/products">View All Products <span>&rarr;</span></Link></div>
          <div className="gifts-product-row">
            {products.map((product, index) => {
              return <article className="gift-product-card" key={`${product.slug}-${index}`}>
                <Link to={`/gifts/product/${product.slug}`}><img src={product.image} alt={product.name} /></Link>
                <button className={wishlistItems.includes(product.slug) ? "liked" : ""} onClick={() => toggleWishlist(product.slug)} aria-label={`Save ${product.name}`}>&#9825;</button>
                <h3>{product.name}</h3><p className="stars">&#9733; &#9733; &#9733; &#9733; &#9733; <small>({157 + index * 42})</small></p>
                <p className="gift-price">Rs. {product.salePrice.toLocaleString("en-IN")} <del>Rs. {product.price.toLocaleString("en-IN")}</del></p>
                <button className={`add-gift-button${addedProducts.includes(product.slug) ? " added" : ""}`} onClick={() => { addToCart(product); setAddedProducts((items) => items.includes(product.slug) ? items : [...items, product.slug]); }}>{addedProducts.includes(product.slug) ? "Added to Cart" : <><span aria-hidden="true">&#128722;</span> Add to Cart</>}</button>
              </article>;
            })}
          </div>
        </section>

        <section className="custom-gift-cta">
          <p>Can't Find the Perfect Gift?</p>
          <h2>Tell us the occasion, budget, and a little about the person.</h2>
          <span>Our gifting team will curate a thoughtful option around your style, timeline, and delivery city.</span>
          <Link className="wine-button" to="/gifts/personalised">Create Your Gift <b>&rarr;</b></Link>
        </section>

        <section className="testimonials"><h2>What Our Customers Say</h2><div>{[["Amazing collection and super fast delivery! The personalised gift was perfect.", "Priya Sharma"], ["Great quality and packaging. My wife absolutely loved the gift.", "Rohit Verma"], ["Beautiful gifts for every occasion. Customer support is also very helpful.", "Ankita Mehra"]].map(([quote, name]) => <article key={name}><b>&ldquo;</b><p>{quote}</p><strong>{name}</strong><span className="stars">&#9733; &#9733; &#9733; &#9733; &#9733;</span></article>)}</div></section>
      </main>
    </StoreLayout>
  );
}
