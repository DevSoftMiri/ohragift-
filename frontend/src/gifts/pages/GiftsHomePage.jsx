import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StoreLayout from "../../shared/components/StoreLayout";
import OptimizedImage from "../../shared/components/OptimizedImage";
import { useAppContext } from "../../shared/store/AppContext";

const categories = [
  ["Photo Frames", "/gifts/categories", "/images/gifts/category/photoframe.png"],
  ["Decor", "/gifts/categories", "/images/gifts/category/decor.png"],
  ["Gifts", "/gifts/categories", "/images/gifts/category/gift.png"]
];

const occasions = [
  ["Anniversary", "/gifts/occasions", "/images/gifts/category/Anniversary.png"],
  ["Birthday", "/gifts/occasions", "/images/gifts/category/Birthday.png"],
  ["Wedding", "/gifts/occasions", "/images/gifts/category/wedding.png"]
];

const products = [
  { slug: "personalized-wooden-photo-frame", store: "gifts", name: "Personalized Wooden Photo Frame", price: 899, salePrice: 899, image: "/images/gifts/product%20image/photoframe.png", eyebrow: "Photo Frames", description: "A timeless wooden frame customized with your favorite photo and a heartfelt message - made to turn special moments into lasting memories." },
  { slug: "earthy-leaf-ceramic-planter", store: "gifts", name: "Earthy Leaf Ceramic Planter", price: 799, salePrice: 799, image: "/images/gifts/product%20image/Decor.png", eyebrow: "Decor", description: "A beautifully crafted ceramic planter with subtle leaf-pattern detailing and a warm earthy finish. Perfect for indoor plants, shelves, desks, or living spaces, adding a fresh and elegant touch to your decor." },
  { slug: "ohra-floral-celebration-hamper", store: "gifts", name: "OHRA Floral Celebration Hamper", price: 1499, salePrice: 1499, image: "/images/gifts/product%20image/gift%20product.png", eyebrow: "Gifts", description: "A beautifully curated gift hamper featuring an elegant floral arrangement paired with a premium sweet treat. Thoughtfully presented in OHRA's signature gift box, it's perfect for birthdays, anniversaries, congratulations, and other special celebrations." },
  { slug: "romantic-anniversary-keepsake-hamper", store: "gifts", name: "Romantic Anniversary Keepsake Hamper", price: 1999, salePrice: 1999, image: "/images/gifts/product%20image/anniversary%20gift.png", eyebrow: "Anniversary Gifts", description: "A thoughtfully curated anniversary hamper featuring fresh red roses, a cute teddy bear, scented candle, heart-themed mug, decorative photo frame, and floral keepsakes. Beautifully arranged for a romantic surprise that makes your special day even more memorable." },
  { slug: "royal-wedding-keepsake-hamper", store: "gifts", name: "Royal Wedding Keepsake Hamper", price: 2299, salePrice: 2299, image: "/images/gifts/product%20image/wedding%20product.png", eyebrow: "Wedding Gifts", description: "An elegant wedding gift hamper featuring a premium decorative textile, floral mug, scented candle, golden keepsake frame, decorative tin, and beautifully curated accessories. Presented in a luxurious ivory-and-gold theme, it makes a thoughtful gift for newlyweds and wedding celebrations." },
  { slug: "birthday-bliss-gift-hamper", store: "gifts", name: "Birthday Bliss Gift Hamper", price: 1699, salePrice: 1699, image: "/images/gifts/product%20image/birthday%20gift.png", eyebrow: "Birthday Gifts", description: "A charming birthday hamper featuring a beautiful floral bouquet, cute teddy bear, stylish mug, scented candle, and thoughtfully curated keepsakes. Presented in an elegant gift box, it's a lovely way to make someone's birthday feel extra special." }
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
            <picture className="gift-hero-image"><source media="(max-width: 700px)" srcSet={`/images/gifts/${slide.mobile.replace(/\.png$/i, "-720.webp")}`} type="image/webp" /><source media="(max-width: 700px)" srcSet={`/images/gifts/${slide.mobile}`} /><source srcSet={`/images/gifts/${slide.desktop.replace(/\.png$/i, "-1200.webp")} 1200w, /images/gifts/${slide.desktop.replace(/\.png$/i, "-1600.webp")} 1600w`} type="image/webp" /><img src={`/images/gifts/${slide.desktop}`} alt={`${slide.eyebrow} by OHRA Gifts`} loading={index === activeHero ? "eager" : "lazy"} decoding={index === activeHero ? "sync" : "async"} fetchPriority={index === activeHero ? "high" : "auto"} /></picture>
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

        <div className="gifts-taxonomy-home-grid">
          <section className="gifts-section" id="categories">
            <div className="gifts-section-title"><h2>Find the Perfect Gift</h2><Link to="/gifts/categories">View All Categories <span>&rarr;</span></Link></div>
            <div className="category-row">
              {categories.map(([name, to, image]) => <Link to={to} className="category-item" key={name}><OptimizedImage src={image} alt={name} sizes="(max-width: 720px) 30vw, 160px" /><strong>{name}</strong></Link>)}
            </div>
          </section>
          <section className="gifts-section" id="occasions">
            <div className="gifts-section-title"><h2>Shop by Occasion</h2><Link to="/gifts/occasions">View All Occasions <span>&rarr;</span></Link></div>
            <div className="category-row occasion-row">
              {occasions.map(([name, to, image]) => <Link to={to} className="category-item" key={name}><OptimizedImage src={image} alt={name} sizes="(max-width: 720px) 30vw, 160px" /><strong>{name}</strong></Link>)}
            </div>
          </section>
        </div>

        <section className="gifts-section" id="best-sellers">
          <div className="gifts-section-title"><h2>Best Selling Gifts</h2><Link to="/gifts/bestsellers">View All Products <span>&rarr;</span></Link></div>
          <div className="gifts-product-row">
            {products.map((product, index) => {
              return <article className="gift-product-card" key={`${product.slug}-${index}`}>
                <Link to={`/gifts/product/${product.slug}`}><OptimizedImage src={product.image} alt={product.name} sizes="(max-width: 720px) 70vw, 250px" /></Link>
                <button className={wishlistItems.includes(product.slug) ? "liked" : ""} onClick={() => toggleWishlist(product.slug)} aria-label={`Save ${product.name}`}>{wishlistItems.includes(product.slug) ? "♥" : "♡"}</button>
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
