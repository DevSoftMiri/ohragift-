import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import StoreLayout from "../../shared/components/StoreLayout";
import OptimizedImage from "../../shared/components/OptimizedImage";
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
  }
};

const tabs = [
  ["categories", "Categories"],
  ["occasions", "Occasions"],
  ["personalised", "Personalised"],
  ["boxes", "Hampers"],
  ["bestsellers", "Best Sellers"],
];

const quickShortcuts = [
  ["Photo Frames", "/gifts/categories"],
  ["Decor", "/gifts/categories"],
  ["Gifts", "/gifts/categories"]
];

const categoryTiles = [
  ["Photo Frames", "Personalised frames, photo gifts, and memory keepsakes", "/images/gifts/category/photoframe.png"],
  ["Decor", "Thoughtful home accents, candles, lamps, and decor", "/images/gifts/category/decor.png"],
  ["Gifts", "Ready-to-give keepsakes for every meaningful moment", "/images/gifts/category/gift.png"]
];

const occasionTiles = [
  ["Anniversary", "Romantic gifts for memories, milestones and togetherness", "/images/gifts/category/Anniversary.png"],
  ["Wedding", "Elegant gifting for weddings, couples and new beginnings", "/images/gifts/category/wedding.png"],
  ["Birthday", "Thoughtful gifts for birthdays and surprise celebrations", "/images/gifts/category/Birthday.png"]
];

const personalisedTiles = [
  "Personalised Mugs",
  "Personalised Keychains",
  "Personalised Pens"
];

const hamperProducts = [
  {
    slug: "signature-gift-hamper",
    store: "gifts",
    name: "Signature Gift Hamper",
    price: 999,
    salePrice: 799,
    image: "/images/gifts/hamper%201.png",
    category: "Gift Hampers",
    description: "A polished all-occasion hamper with sweets, keepsakes, and premium gift-ready packaging."
  },
  {
    slug: "anniversary-memory-hamper",
    store: "gifts",
    name: "Anniversary Memory Hamper",
    price: 1799,
    salePrice: 1599,
    image: "/images/gifts/hamper%204.png",
    category: "Anniversary Hampers",
    description: "A romantic hamper curated for couples, milestones, and warm personal moments."
  }
];

const bestsellerFilters = ["All", "Personalised", "Hampers", "For Her", "For Him", "Birthday", "Anniversary", "Premium"];

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
      ["Flowers", "F"],
      ["Personalised Items", "P"],
      ["Photo Frame", "P"],
      ["Scented Candle", "S"],
      ["Self-care Treats", "S"],
      ["Desk Accessories", "D"],
      ["Custom Mug", "M"],
      ["Keychain", "K"],
      ["Personalised Pen", "P"],
      ["Mini Plant", "P"],
      ["Memory Book", "B"],
      ["Something Else", "+"]
    ]
  }
];

const personalTouchOptions = ["Add a handwritten note", "Add recipient name", "Add photo", "Custom packaging"];
const personalisedAssetPath = "/images/gifts/OHRA_All_Transparent_Separate_Images";

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
    preferences: ["Flowers", "Personalised Items"],
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
                        <span>{selected ? `Selected ${option}` : option}</span>
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

function PremiumPersonalisedPage() {
  const [giftRequest, setGiftRequest] = useState({
    recipient: "For Her",
    occasion: "Birthday",
    style: "Gift Box",
    budget: "Rs. 1,500-2,500",
    preferences: ["Flowers", "Personalised Items"],
    touches: ["Add a handwritten note"]
  });
  const styleImages = {
    "Gift Box": `${personalisedAssetPath}/07_gift_box_style.png`,
    Basket: `${personalisedAssetPath}/08_basket_style.png`,
    Hamper: `${personalisedAssetPath}/09_hamper_style.png`,
    Tray: `${personalisedAssetPath}/10_tray_style.png`,
    "Bouquet Style": `${personalisedAssetPath}/11_bouquet_style.png`,
    "Premium Box": `${personalisedAssetPath}/12_premium_box_style.png`
  };
  const updateSingleChoice = (key, option) => setGiftRequest((current) => ({ ...current, [key]: option }));
  const toggleMultiChoice = (key, option) => setGiftRequest((current) => {
    const selected = current[key].includes(option);
    return { ...current, [key]: selected ? current[key].filter((item) => item !== option) : [...current[key], option] };
  });
  const previewImage = styleImages[giftRequest.style] || styleImages["Gift Box"];
  const summaryRows = [
    ["For", giftRequest.recipient],
    ["Occasion", giftRequest.occasion],
    ["Style", giftRequest.style],
    ["Budget", giftRequest.budget],
    ["Items", giftRequest.preferences.join(", ")],
    ["Personal Touch", giftRequest.touches.join(", ") || "Optional"]
  ];
  const whatsappMessage = [
    "Hi OHRA, I want to create a personalised gift.",
    "",
    `For: ${giftRequest.recipient}`,
    `Occasion: ${giftRequest.occasion}`,
    `Style: ${giftRequest.style}`,
    `Budget: ${giftRequest.budget}`,
    `Items: ${giftRequest.preferences.join(", ") || "Please suggest"}`,
    `Personal Touch: ${giftRequest.touches.join(", ") || "Optional"}`,
    "",
    "Please help me finalise this gift."
  ].join("\n");
  const whatsappLink = `https://wa.me/918307642071?text=${encodeURIComponent(whatsappMessage)}`;
  const heroStages = [
    ["Choose", `${personalisedAssetPath}/02_choose_icon.png`],
    ["Personalise", `${personalisedAssetPath}/03_personalise_icon.png`],
    ["We Curate", `${personalisedAssetPath}/04_curate_icon.png`],
    ["We Deliver", `${personalisedAssetPath}/05_delivery_icon.png`]
  ];

  return (
    <StoreLayout store="gifts">
      <main className="personalised-page">
        <section className="personalised-hero">
          <OptimizedImage className="personalised-hero-gift" src={`${personalisedAssetPath}/09_hamper_style.png`} alt="" eager sizes="(max-width: 720px) 54vw, 30vw" />
          <OptimizedImage className="personalised-hero-card" src={`${personalisedAssetPath}/23_thank_you_card.png`} alt="" sizes="(max-width: 720px) 36vw, 18vw" />
          <OptimizedImage className="personalised-hero-ribbon" src={`${personalisedAssetPath}/01_ribbon_heart.png`} alt="" sizes="180px" />
          <div>
            <p>Turn moments into gifts</p>
            <h1>Create a gift made just for them.</h1>
            <span>Personalise every detail and we'll bring it to life with love and care.</span>
          </div>
          <aside aria-label="Custom gifting promise"><span>Custom</span><span>Gifts</span><span>Happier</span><span>People</span></aside>
          <nav aria-label="Personalised gift stages">{heroStages.map(([item, image]) => <strong key={item}><OptimizedImage src={image} alt="" sizes="72px" />{item}</strong>)}</nav>
        </section>

        <nav className="personalised-progress" aria-label="Create your gift progress">
          {customGiftSteps.map((step) => <span key={step.key} className={giftRequest[step.key]?.length ? "complete" : ""}><b>{step.number}</b>{step.label}</span>)}
          <span><b>06</b>Review</span>
        </nav>

        <section className="personalised-builder-shell" aria-label="Create your gift builder">
          <div className="personalised-builder-config">
            {customGiftSteps.map((step) => (
              <article className="personalised-step" key={step.key}>
                <span>Step {step.number}</span>
                <h2>{step.title}</h2>
                <div>
                  {step.options.map(([option, icon]) => {
                    const selected = step.multi ? giftRequest[step.key].includes(option) : giftRequest[step.key] === option;
                    return (
                      <button key={option} className={selected ? "selected" : ""} type="button" onClick={() => step.multi ? toggleMultiChoice(step.key, option) : updateSingleChoice(step.key, option)}>
                        {styleImages[option] ? <OptimizedImage src={styleImages[option]} alt="" sizes="120px" /> : <i aria-hidden="true">{icon}</i>}
                        <span>{selected ? `✓ ${option}` : option}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}

            <article className="personalised-step personal-touch-step">
              <span>Step 06</span>
              <h2>Add a personal touch</h2>
              <div>
                {personalTouchOptions.map((option) => {
                  const selected = giftRequest.touches.includes(option);
                  return <button key={option} className={selected ? "selected" : ""} type="button" onClick={() => toggleMultiChoice("touches", option)}><i aria-hidden="true">+</i><span>{selected ? `Selected ${option}` : option}</span></button>;
                })}
              </div>
            </article>
          </div>

          <aside className="personalised-preview-column">
            <section className="personalised-preview" aria-label="Your gift preview">
              <div><p>Your Gift Preview</p><span>A glimpse of your customised gift</span></div>
              <button type="button" aria-label="Previous preview">&#8249;</button>
              <div className="personalised-preview-art">
                <OptimizedImage src={previewImage} alt={`${giftRequest.style} preview`} sizes="(max-width: 720px) 70vw, 420px" />
                <OptimizedImage src={`${personalisedAssetPath}/23_thank_you_card.png`} alt="" sizes="160px" />
              </div>
              <button type="button" aria-label="Next preview">&#8250;</button>
              <small>This is a sample preview. Our team will curate the final design based on your selections.</small>
            </section>
            <section className="personalised-summary" aria-label="Gift summary">
              <div><h2>Gift Summary</h2><button type="button">Edit</button></div>
              {summaryRows.map(([label, value]) => <p key={label}><strong>{label}</strong><span>{value}</span></p>)}
              <a className="personalised-whatsapp-button" href={whatsappLink} target="_blank" rel="noreferrer">Create My Gift <b>&rarr;</b></a>
              <small>No payment required. OHRA Gift Concierge will contact you to finalise your gift.</small>
            </section>
          </aside>
        </section>

        <section className="personalised-custom-cta">
          <div><p>Need something extra special?</p><h2>Tell us your idea and our gifting team will curate it for you.</h2><span>Share names, dates, delivery city, notes, or an inspiration photo - we'd love to hear it.</span><a href={whatsappLink} target="_blank" rel="noreferrer">Talk to OHRA <b>&rarr;</b></a></div>
          {/* <img src={`${personalisedAssetPath}/25_bottom_ribbon.png`} alt="" /> */}
        </section>

        <section className="personalised-assurances" aria-label="Personalised gift benefits">
          {["Pan India Delivery", "Safe & Secure Payments", "Thoughtfully Curated", "Customisation Support", "Dedicated Assistance"].map((item) => <span key={item}>{item}</span>)}
        </section>
      </main>
    </StoreLayout>
  );
}

export default function GiftsCollectionPage() {
  const { collection = "categories" } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [adminGroups, setAdminGroups] = useState([]);
  const [activeTile, setActiveTile] = useState("");
  const { addToCart, wishlistItems, toggleWishlist } = useAppContext();
  const copy = collectionCopy[collection] || collectionCopy.categories;
  const visibleProducts = products.slice(0, collection === "bestsellers" ? 8 : 6);
  const showProductSection = collection === "bestsellers";
  const isTaxonomyPage = collection === "categories" || collection === "occasions";
  const taxonomyKind = collection === "occasions" ? "occasion" : "category";
  const taxonomyTiles = isTaxonomyPage ? getTaxonomyTiles(adminGroups, collection === "occasions" ? occasionTiles : categoryTiles) : [];
  const selectedTile = taxonomyTiles.find((tile) => tile.name === activeTile) || taxonomyTiles[0];
  const filteredProducts = selectedTile
    ? products.filter((product) => taxonomyKind === "occasion" ? product.occasion === selectedTile.name : product.category === selectedTile.name)
    : [];
  const taxonomyProducts = (filteredProducts.length ? filteredProducts : products).slice(0, 8);
  const handleTaxonomyWheel = (event) => {
    const scroller = event.currentTarget;
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

    if (maxScrollLeft <= 0) return;

    const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY * 1.15;

    event.preventDefault();
    event.stopPropagation();
    scroller.scrollLeft = Math.max(0, Math.min(maxScrollLeft, scroller.scrollLeft + horizontalDelta));
  };

  useEffect(() => { getProductsByStore("gifts").then(setProducts); }, []);
  useEffect(() => {
    if (!isTaxonomyPage) return;
    getCatalogGroups("gifts", taxonomyKind).then((groups) => {
      const visibleGroups = groups.filter((group) => group.status !== "hidden" && (collection === "occasions" ? ["Anniversary", "Birthday", "Wedding"].includes(group.name) : ["Photo Frames", "Decor", "Gifts"].includes(group.name)));
      setAdminGroups(visibleGroups);
      setActiveTile(searchParams.get(collection === "occasions" ? "occasion" : "category") || "");
    });
  }, [isTaxonomyPage, taxonomyKind, collection, searchParams]);

  if (collection === "create-your-gift" || collection === "personalised") return <PremiumPersonalisedPage />;

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
            <div className="taxonomy-card-rail">
              <div className="taxonomy-card-grid" aria-label={collection === "occasions" ? "Shop by occasion" : "Shop by category"} onWheel={handleTaxonomyWheel}>
                {taxonomyTiles.map((tile) => (
                  <button
                    className={(selectedTile?.name || taxonomyTiles[0]?.name) === tile.name ? "active" : ""}
                    key={tile.id}
                    type="button"
                    onClick={() => setActiveTile(tile.name)}
                  >
                    <OptimizedImage src={tile.image} alt="" sizes="(max-width: 720px) 38vw, 180px" />
                    <span>{tile.name}</span>
                  </button>
                ))}
              </div>
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
                    <Link to={`/gifts/product/${product.slug}`}><OptimizedImage src={product.image} alt={product.name} sizes="(max-width: 720px) 46vw, 25vw" /></Link>
                    <button className={wishlistItems.includes(product.slug) ? "saved" : ""} onClick={() => toggleWishlist(product.slug)} aria-label={`Save ${product.name}`}>{wishlistItems.includes(product.slug) ? "♥" : "♡"}</button>
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
            <section className="hamper-product-grid" aria-label="Gift boxes and hampers">
              {hamperProducts.map((product, index) => (
                <article key={product.slug}>
                  <Link to={`/gifts/product/${product.slug}`}><OptimizedImage src={product.image} alt={product.name} sizes="(max-width: 720px) 46vw, 25vw" /></Link>
                  <button className={wishlistItems.includes(product.slug) ? "saved" : ""} onClick={() => toggleWishlist(product.slug)} aria-label={`Save ${product.name}`}>{wishlistItems.includes(product.slug) ? "♥" : "♡"}</button>
                  <p>{product.category}</p>
                  <Link to={`/gifts/product/${product.slug}`}><h2>{product.name}</h2></Link>
                  <span>{product.description}</span>
                  <strong>Rs. {(product.salePrice || product.price).toLocaleString("en-IN")} <del>Rs. {product.price.toLocaleString("en-IN")}</del></strong>
                  <button className="collection-add" onClick={() => addToCart(product)}>{index === 0 ? "Add signature hamper" : "Add to bag"}</button>
                </article>
              ))}
            </section>
          </>
        )}

        {collection === "bestsellers" && (
          <nav className="budget-pill-row bestseller-filter-row" aria-label="Bestseller filters">
            {bestsellerFilters.map((item) => <Link key={item} to="/gifts/bestsellers">{item}</Link>)}
          </nav>
        )}

        {showProductSection && (
          <section className="collection-product-section">
            <div className="gifts-section-title">
              <h2>Customer Favourites</h2>
              <Link to="/gifts/bestsellers">View All Products <span>&rarr;</span></Link>
            </div>
            <div className="gift-collection-grid">{visibleProducts.map((product, index) => <article key={`${product.slug}-${index}`}>
              <Link to={`/gifts/product/${product.slug}`}><OptimizedImage src={product.image} alt={product.name} sizes="(max-width: 720px) 46vw, 25vw" /></Link>
              <button className={wishlistItems.includes(product.slug) ? "saved" : ""} onClick={() => toggleWishlist(product.slug)} aria-label={`Save ${product.name}`}>{wishlistItems.includes(product.slug) ? "♥" : "♡"}</button>
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
