import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StoreLayout from "../../shared/components/StoreLayout";
import { getCatalogGroups, getProductsByStore } from "../../shared/services/catalogService";
import { useAppContext } from "../../shared/store/AppContext";

const collectionCopy = {
  categories: {
    title: "What type of gift are you looking for?",
    eyebrow: "Shop by Category",
    description: "Browse OHRA by product type, from personalised keepsakes and flowers to premium hampers, home decor, and corporate gifting.",
    intro: "Start with the kind of gift, then refine by occasion, recipient, or budget."
  },
  occasions: {
    title: "What are you celebrating?",
    eyebrow: "Shop by Occasion",
    description: "Find something thoughtful for birthdays, milestones, festivals, and the meaningful days in between.",
    intro: "Every moment deserves a gift that feels considered."
  },
  personalised: {
    title: "Make it personal",
    eyebrow: "Names, Photos, Messages",
    description: "Custom gifts made for names, photos, initials, dates, and memories customers want to keep close.",
    intro: "Choose a ready product, then add the detail that makes it theirs."
  },
  boxes: {
    title: "Gift Boxes & Hampers",
    eyebrow: "Curated and Ready",
    description: "Beautifully packed gifting for birthdays, anniversaries, corporate moments, festive hosting, and premium surprises.",
    intro: "Ready-made hampers with the packaging, pairing, and presentation already handled."
  },
  bestsellers: {
    title: "OHRA Favourites",
    eyebrow: "Best Sellers",
    description: "Our most-loved gifts, chosen again and again by customers who want a proven pick.",
    intro: "Filter by style, recipient, or occasion when you want a gift with an easy yes."
  },
  offers: {
    title: "More Reasons to Gift",
    eyebrow: "Special Offers",
    description: "Special prices on gifts worth giving, with clear deals across budget picks, combos, and hampers.",
    intro: "Conversion-focused gifting offers without making the brand feel bargain-bin."
  }
};

const tabs = [
  ["categories", "Categories"],
  ["occasions", "Occasions"],
  ["personalised", "Personalised"],
  ["boxes", "Hampers"],
  ["bestsellers", "Best Sellers"],
  ["offers", "Offers"]
];

const quickShortcuts = [
  ["Flowers", "/gifts/products"],
  ["Chocolates", "/gifts/products"],
  ["Cakes", "/gifts/products"],
  ["Home Decor", "/gifts/products"],
  ["Fashion", "/gifts/products"],
  ["Beauty", "/gifts/products"],
  ["Kids", "/gifts/products"],
  ["Premium", "/gifts/products"]
];

const categoryTiles = [
  ["Flowers & Bouquets", "Fresh bouquets, artificial flowers, gift bouquets", "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=760&q=80"],
  ["Chocolates & Sweets", "Chocolate boxes, premium chocolates, mithai hampers", "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=760&q=80"],
  ["Cakes & Celebration", "Cakes, cupcakes, celebration combos", "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=760&q=80"],
  ["Home & Living", "Candles, decor, planters, lamps, clocks", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=760&q=80"],
  ["Fashion & Accessories", "Wallets, bags, jewellery, watches, accessories", "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=760&q=80"],
  ["Beauty & Self-Care", "Skincare, fragrance, grooming, spa hampers", "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=760&q=80"],
  ["Stationery", "Diaries, pens, planners, desk accessories", "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=760&q=80"],
  ["Photo Gifts", "Frames, albums, photo lamps, photo collages", "https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&w=760&q=80"],
  ["Kids Gifts", "Toys, activity kits, school gifts", "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=760&q=80"],
  ["Spiritual Gifts", "Idols, religious decor, festive sets", "https://images.unsplash.com/photo-1609609830354-8f615d61b9c8?auto=format&fit=crop&w=760&q=80"],
  ["Premium Gifts", "Luxury decor, executive gifts, elegant keepsakes", "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=760&q=80"]
];

const occasionTiles = [
  ["Birthday", "Thoughtful gifts for birthdays and surprise celebrations", "https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?auto=format&fit=crop&w=760&q=80"],
  ["Anniversary", "Romantic gifts for memories, milestones and togetherness", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=760&q=80"],
  ["Wedding", "Elegant gifting for weddings, couples and new beginnings", "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=760&q=80"],
  ["Engagement", "Special gifts for rings, promises and families coming together", "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=760&q=80"],
  ["Housewarming", "Warm home gifts, decor and hosting-ready surprises", "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=760&q=80"],
  ["Baby Shower", "Soft, sweet and memorable gifts for new parents", "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=760&q=80"],
  ["Graduation", "Smart gifts for achievements, new chapters and proud moments", "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=760&q=80"],
  ["Farewell", "Keepsakes and hampers for warm goodbyes", "https://images.unsplash.com/photo-1523364258745-0bbd7b2c688b?auto=format&fit=crop&w=760&q=80"],
  ["Diwali", "Festive hampers and decor for lights, family and hosting", "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?auto=format&fit=crop&w=760&q=80"],
  ["Raksha Bandhan", "Sweet, personal and festive gifts for sibling bonds", "https://images.unsplash.com/photo-1607877361964-da4e604bd8d8?auto=format&fit=crop&w=760&q=80"],
  ["Holi", "Bright gifting for colour, joy and festive sharing", "https://images.unsplash.com/photo-1551757891-24a8dabd2708?auto=format&fit=crop&w=760&q=80"],
  ["Christmas", "Warm boxes, treats and keepsakes for holiday gifting", "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=760&q=80"]
];

const personalisedTiles = [
  "Personalised Mugs",
  "Photo Frames",
  "Custom Bottles",
  "Name Keychains",
  "Custom Cushions",
  "Photo Lamps",
  "Name Plates",
  "Engraved Gifts",
  "Custom Diaries",
  "Personalised Pens",
  "Memory Plaques",
  "Custom Gift Boxes"
];

const hamperTiles = [
  "Gift Hampers",
  "Corporate Hampers",
  "Birthday Hampers",
  "Anniversary Hampers",
  "For Her Hampers",
  "For Him Hampers",
  "Chocolate Hampers",
  "Self-Care Hampers",
  "Coffee Lover Hampers",
  "Tea Lover Hampers",
  "Gourmet Hampers",
  "Wedding Hampers",
  "Bridesmaid Hampers",
  "New Mom Hampers",
  "Festive Hampers",
  "Premium Hampers"
];

const offerTiles = [
  "Today's Offers",
  "Under Rs. 499",
  "Under Rs. 999",
  "Combo Deals",
  "Buy More, Save More",
  "Personalised Gifts on Offer",
  "Hamper Deals",
  "Festive Offers"
];

const bestsellerFilters = ["All", "Personalised", "Hampers", "For Her", "For Him", "Birthday", "Anniversary", "Premium"];
const hamperBudgets = ["Under Rs. 499", "Rs. 500-999", "Rs. 1,000-1,499", "Rs. 1,500-2,499", "Rs. 2,500+"];

const customGiftSteps = [
  {
    key: "recipient",
    number: "01",
    label: "Recipient",
    title: "Who is it for?",
    options: [
      ["For Her", "H"],
      ["For Him", "M"],
      ["Couple", "C"],
      ["Kids", "K"],
      ["Family", "F"],
      ["Employee", "E"],
      ["Client", "B"],
      ["Other", "+"]
    ]
  },
  {
    key: "occasion",
    number: "02",
    label: "Occasion",
    title: "What's the occasion?",
    options: [
      ["Birthday", "B"],
      ["Anniversary", "A"],
      ["Wedding", "W"],
      ["Corporate", "C"],
      ["Congratulations", "G"],
      ["Festival", "F"],
      ["Thank You", "T"],
      ["Other", "+"]
    ]
  },
  {
    key: "style",
    number: "03",
    label: "Style",
    title: "Choose your style",
    options: [
      ["Gift Box", "□"],
      ["Basket", "∪"],
      ["Hamper", "H"],
      ["Tray", "T"],
      ["Bouquet Style", "V"],
      ["Premium Box", "P"]
    ]
  },
  {
    key: "budget",
    number: "04",
    label: "Budget",
    title: "What's your budget?",
    options: [
      ["Under Rs. 500", "<"],
      ["Rs. 500-1,000", "1"],
      ["Rs. 1,000-1,500", "2"],
      ["Rs. 1,500-2,500", "3"],
      ["Rs. 2,500-5,000", "4"],
      ["Rs. 5,000+", "5"]
    ]
  },
  {
    key: "preferences",
    number: "05",
    label: "Details",
    title: "What would they love?",
    multi: true,
    options: [
      ["Chocolate", "C"],
      ["Candles", "L"],
      ["Perfume", "P"],
      ["Skincare", "S"],
      ["Mugs", "M"],
      ["Flowers", "F"],
      ["Stationery", "N"],
      ["Accessories", "A"],
      ["Dry Fruits", "D"],
      ["Snacks", "K"],
      ["Personalised Items", "I"],
      ["Other", "+"]
    ]
  }
];

const personalTouchOptions = ["Add a handwritten note", "Add recipient name", "Add photo", "Custom packaging"];

function normalizeAdminTile(entry, fallbackImage) {
  return {
    id: entry._id || entry.name,
    name: entry.name,
    description: entry.description || "Thoughtfully curated by OHRA.",
    image: entry.image || fallbackImage
  };
}

function getTaxonomyTiles(adminItems, fallbackItems) {
  if (adminItems.length) {
    return adminItems.map((entry, index) => normalizeAdminTile(entry, fallbackItems[index % fallbackItems.length][2]));
  }

  return fallbackItems.map(([name, description, image]) => ({ id: name, name, description, image }));
}

function CreateGiftPage() {
  const [giftRequest, setGiftRequest] = useState({
    recipient: "For Her",
    occasion: "Birthday",
    style: "Gift Box",
    budget: "Rs. 1,500-2,500",
    preferences: ["Chocolate", "Flowers", "Personalised Items"],
    touches: ["Add a handwritten note"]
  });

  const updateSingleChoice = (key, option) => setGiftRequest((current) => ({ ...current, [key]: option }));
  const toggleMultiChoice = (key, option) => setGiftRequest((current) => {
    const selected = current[key].includes(option);
    return { ...current, [key]: selected ? current[key].filter((item) => item !== option) : [...current[key], option] };
  });

  return (
    <StoreLayout store="gifts">
      <main className="gift-collection-page create-gift-page">
        <section className="gift-collection-hero create-gift-hero">
          <p>OHRA GIFTS / Personalised</p>
          <h1>Create a gift made just for them.</h1>
          <span>Tell us a little about them. We'll help curate the rest.</span>
        </section>

        <nav className="gift-builder-progress" aria-label="Create your gift progress">
          {customGiftSteps.map((step) => (
            <span key={step.key} className={giftRequest[step.key]?.length ? "complete" : ""}>
              <b>{step.number}</b> {step.label}
            </span>
          ))}
        </nav>

        <section className="gift-builder-shell" aria-label="Create your gift builder">
          <div className="gift-builder-config">
            {customGiftSteps.map((step) => (
              <article className="gift-builder-step" key={step.key}>
                <span>Step {step.number}</span>
                <h2>{step.title}</h2>
                <div>
                  {step.options.map(([option, icon]) => {
                    const selected = step.multi ? giftRequest[step.key].includes(option) : giftRequest[step.key] === option;
                    return (
                      <button
                        key={option}
                        className={selected ? "selected" : ""}
                        type="button"
                        onClick={() => step.multi ? toggleMultiChoice(step.key, option) : updateSingleChoice(step.key, option)}
                      >
                        <i aria-hidden="true">{icon}</i>
                        <span>{selected ? `✓ ${option}` : option}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}

            <article className="gift-builder-step personal-touch-step">
              <span>Make it personal</span>
              <h2>Add a finishing touch</h2>
              <div>
                {personalTouchOptions.map((option) => {
                  const selected = giftRequest.touches.includes(option);
                  return (
                    <button
                      key={option}
                      className={selected ? "selected" : ""}
                      type="button"
                      onClick={() => toggleMultiChoice("touches", option)}
                    >
                      <i aria-hidden="true">+</i>
                      <span>{selected ? `✓ ${option}` : option}</span>
                    </button>
                  );
                })}
              </div>
            </article>
          </div>

          <aside className="gift-summary-panel" aria-label="Your gift summary">
            <p>Your Gift</p>
            <h2>{giftRequest.recipient}</h2>
            <ul>
              <li>{giftRequest.occasion}</li>
              <li>{giftRequest.style}</li>
              <li>{giftRequest.budget}</li>
            </ul>
            <div>
              <strong>Includes Preferences</strong>
              <span>{giftRequest.preferences.length ? giftRequest.preferences.join(" · ") : "Choose a few favourites"}</span>
            </div>
            <div>
              <strong>Personal Touch</strong>
              <span>{giftRequest.touches.length ? giftRequest.touches.join(" · ") : "Optional details can be added"}</span>
            </div>
            <button type="button">Create My Gift <b>&rarr;</b></button>
            <small>No payment required. OHRA Gift Concierge will contact you to finalise your gift.</small>
          </aside>
        </section>

        <section className="custom-request-panel">
          <div>
            <p>Need something extra special?</p>
            <h2>Tell us your idea and our gifting team will curate it for you.</h2>
            <span>Share names, dates, delivery city, notes, or an inspiration photo when you submit the request.</span>
          </div>
          <button type="button" className="wine-button">Talk to OHRA <b>&rarr;</b></button>
        </section>
      </main>
    </StoreLayout>
  );
}

export default function GiftsCollectionPage() {
  const { collection = "categories" } = useParams();
  const [products, setProducts] = useState([]);
  const [adminGroups, setAdminGroups] = useState([]);
  const [activeTile, setActiveTile] = useState("");
  const { addToCart, wishlistItems, toggleWishlist } = useAppContext();
  const copy = collectionCopy[collection] || collectionCopy.categories;
  const visibleProducts = products.slice(0, collection === "bestsellers" ? 8 : 6);
  const showProductSection = collection === "bestsellers" || collection === "offers";
  const isTaxonomyPage = collection === "categories" || collection === "occasions";
  const taxonomyKind = collection === "occasions" ? "occasion" : "category";
  const taxonomyTiles = isTaxonomyPage ? getTaxonomyTiles(adminGroups, collection === "occasions" ? occasionTiles : categoryTiles) : [];
  const selectedTile = taxonomyTiles.find((tile) => tile.name === activeTile) || taxonomyTiles[0];
  const filteredProducts = selectedTile
    ? products.filter((product) => taxonomyKind === "occasion" ? product.occasion === selectedTile.name : product.category === selectedTile.name)
    : [];
  const taxonomyProducts = (filteredProducts.length ? filteredProducts : products).slice(0, 8);

  useEffect(() => { getProductsByStore("gifts").then(setProducts); }, []);
  useEffect(() => {
    if (!isTaxonomyPage) return;
    getCatalogGroups("gifts", taxonomyKind).then((groups) => {
      const visibleGroups = groups.filter((group) => group.status !== "hidden");
      setAdminGroups(visibleGroups);
      setActiveTile("");
    });
  }, [isTaxonomyPage, taxonomyKind]);

  if (collection === "create-your-gift" || collection === "personalised") return <CreateGiftPage />;

  return (
    <StoreLayout store="gifts">
      <main className="gift-collection-page">
        <section className={`gift-collection-hero ${collection}-hero`}>
          <p>OHRA GIFTS / {copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <span>{copy.description}</span>
        </section>

        <nav className="gift-collection-tabs" aria-label="Gift collection pages">
          {tabs.map(([key, label]) => <Link key={key} className={key === collection ? "active" : ""} to={`/gifts/${key}`}>{label}</Link>)}
        </nav>

        {isTaxonomyPage && (
          <section className="taxonomy-shop-page">
            <div className="taxonomy-card-grid" aria-label={collection === "occasions" ? "Shop by occasion" : "Shop by category"}>
              {taxonomyTiles.map((tile, index) => (
                <button
                  className={(selectedTile?.name || taxonomyTiles[0]?.name) === tile.name ? "active" : ""}
                  key={tile.id}
                  type="button"
                  onClick={() => setActiveTile(tile.name)}
                >
                  <img src={tile.image} alt="" />
                  <span>{tile.name}</span>
                  {index === taxonomyTiles.length - 1 && <b aria-hidden="true">All</b>}
                </button>
              ))}
            </div>

            <section className="taxonomy-product-section">
              <div className="taxonomy-product-heading">
                <div>
                  <h2>{selectedTile?.name || copy.title}</h2>
                  <p>{selectedTile?.description || copy.description}</p>
                </div>
                <span>{taxonomyProducts.length ? `${taxonomyProducts.length}+ products` : "Products coming soon"}</span>
              </div>
              <div className="taxonomy-toolbar">
                <button type="button">Filter</button>
                <select aria-label="Sort products">
                  <option>Sort by: Popularity</option>
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
              <div className="taxonomy-product-grid">
                {taxonomyProducts.map((product, index) => (
                  <article key={`${product.slug}-${index}`}>
                    <Link to={`/gifts/product/${product.slug}`}><img src={product.image} alt={product.name} /></Link>
                    <button className={wishlistItems.includes(product.slug) ? "saved" : ""} onClick={() => toggleWishlist(product.slug)} aria-label={`Save ${product.name}`}>&#9825;</button>
                    <Link to={`/gifts/product/${product.slug}`}><h3>{product.name}</h3></Link>
                    <strong>Rs. {(product.salePrice || product.price).toLocaleString("en-IN")}</strong>
                    <button type="button" onClick={() => addToCart(product)}>Add to Cart</button>
                  </article>
                ))}
              </div>
              {!taxonomyProducts.length && <p className="taxonomy-empty">Add products in admin and assign them to this {taxonomyKind} to show them here.</p>}
            </section>
          </section>
        )}

        {collection === "personalised" && (
          <section className="personalised-placeholder" aria-label="Personalised gifts coming soon">
            <p>Personalised Gifts</p>
            <h2>This section is ready for your personalised gift collection.</h2>
            <span>You can add mugs, frames, bottles, name plates, photo lamps, engraved gifts, and other custom products later.</span>
          </section>
        )}

        {collection === "boxes" && (
          <>
            <section className="simple-tile-grid" aria-label="Gift boxes and hampers">
              {hamperTiles.map((item) => <Link key={item} to="/gifts/products">{item}</Link>)}
            </section>
            <nav className="budget-pill-row hamper-budget-row" aria-label="Hamper budget filters">
              {hamperBudgets.map((item) => <Link key={item} to="/gifts/products">{item}</Link>)}
            </nav>
          </>
        )}

        {collection === "bestsellers" && (
          <nav className="budget-pill-row bestseller-filter-row" aria-label="Bestseller filters">
            {bestsellerFilters.map((item) => <Link key={item} to="/gifts/products">{item}</Link>)}
          </nav>
        )}

        {collection === "offers" && (
          <section className="simple-tile-grid offer-tile-grid" aria-label="Gift offers">
            {offerTiles.map((item) => <Link key={item} to="/gifts/products">{item}</Link>)}
          </section>
        )}

        {showProductSection && (
          <section className="collection-product-section">
            <div className="gifts-section-title">
              <h2>{collection === "offers" ? "Today's Offers" : "Customer Favourites"}</h2>
              <Link to="/gifts/products">View All Products <span>&rarr;</span></Link>
            </div>
            <div className="gift-collection-grid">{visibleProducts.map((product, index) => <article key={`${product.slug}-${index}`}>
              <Link to={`/gifts/product/${product.slug}`}><img src={product.image} alt={product.name} /></Link>
              <button className={wishlistItems.includes(product.slug) ? "saved" : ""} onClick={() => toggleWishlist(product.slug)} aria-label={`Save ${product.name}`}>&#9825;</button>
              <p>{collection === "bestsellers" ? ["Bestseller", "Trending", "Most Gifted", "New Favourite"][index % 4] : product.category || product.eyebrow}</p>
              <h2>{product.name}</h2>
              <span>Rs. {(product.salePrice || product.price).toLocaleString("en-IN")}</span>
              <button className="collection-add" onClick={() => addToCart(product)}>Add to bag</button>
            </article>)}</div>
          </section>
        )}
      </main>
    </StoreLayout>
  );
}
