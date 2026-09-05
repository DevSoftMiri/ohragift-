import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StoreLayout from "../components/StoreLayout";
import { getProductBySlug } from "../services/catalogService";
import { useAppContext } from "../store/AppContext";

const wearLookItems = [
  ["Ambala City Graphic T-Shirt", "Rs. 899", "/images/wears/ambala%20main.png"],
  ["Delhi City Graphic T-Shirt", "Rs. 899", "/images/wears/delhi%20main.png"],
  ["Hisar City Graphic T-Shirt", "Rs. 899", "/images/wears/hisar%20main.png"],
  ["Karnal City Graphic T-Shirt", "Rs. 899", "/images/wears/Karnal%20main.png"]
];

function WearProductDetail({ product }) {
  const galleryImages = [product.image, product.secondaryImage].filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [customName, setCustomName] = useState("");
  const [customCity, setCustomCity] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState("Product Details");
  const { addToCart, toggleWishlist, wishlistItems } = useAppContext();
  const isSaved = wishlistItems.includes(product.slug);
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const details = [
    ["Product Details", "Premium everyday wear with a relaxed silhouette and a soft, elevated finish."],
    ["Size & Fit", "Designed for an easy fit. Choose your usual size for a relaxed everyday silhouette."],
    ["Shipping & Returns", "Pan India delivery available. Easy returns on eligible unworn items within 7 days."],
    ["Care Instructions", "Machine wash cold with similar colours. Do not bleach. Tumble dry low and iron inside out."]
  ];

  const handleAddToCart = () => {
    for (let index = 0; index < quantity; index += 1) addToCart(product);
    setAdded(true);
  };

  return (
    <main className="wear-product-page">
      <nav className="wear-product-breadcrumb" aria-label="Breadcrumb">
        <Link to="/wears">Home</Link><span aria-hidden="true">&rsaquo;</span>
        <Link to="/wears">Wears</Link><span aria-hidden="true">&rsaquo;</span>
        <span>{product.name}</span>
      </nav>

      <div className="wear-product-layout">
        <section className="wear-gallery" aria-label="Product images">
          <div className="wear-thumbnails">
            {galleryImages.map((image, index) => (
              <button className={selectedImage === image ? "active" : ""} key={`${image}-${index}`} type="button" aria-label={`View product image ${index + 1}`} onClick={() => setSelectedImage(image)}>
                <img src={image} alt="" />
              </button>
            ))}
          </div>
          <div className="wear-main-image"><img src={selectedImage} alt={product.name} /></div>
        </section>

        <section className="wear-product-copy">
          <p className="wear-product-eyebrow">{product.eyebrow || "OHRA Wears"}</p>
          <h1>{product.name}</h1>
          <p className="wear-product-description">{product.description}</p>
          <div className="wear-price-row"><strong>Rs. {(product.salePrice || product.price).toLocaleString("en-IN")}</strong>{product.salePrice && product.salePrice !== product.price ? <del>Rs. {product.price.toLocaleString("en-IN")}</del> : null}<b>15% OFF</b></div>

          <div className="wear-option-group wear-custom-fields"><span>Customization</span><div><label>Name<input type="text" value={customName} onChange={(event) => setCustomName(event.target.value)} placeholder="Enter name" /></label><label>City Name<input type="text" value={customCity} onChange={(event) => setCustomCity(event.target.value)} placeholder="Enter city" /></label></div></div>
          <div className="wear-option-group"><div className="wear-size-heading"><span>Size</span><button type="button">Size Guide</button></div><div className="wear-size-options">{sizes.map((size) => <button className={selectedSize === size ? "selected" : ""} key={size} type="button" onClick={() => setSelectedSize(size)}>{size}</button>)}</div></div>
          <div className="wear-option-group"><span>Quantity</span><div className="wear-quantity"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button><span>{quantity}</span><button type="button" onClick={() => setQuantity((value) => value + 1)}>+</button></div></div>

          <button className={`wear-add-button${added ? " added" : ""}`} type="button" onClick={handleAddToCart}>{added ? "Added to cart" : "Add to cart"}</button>
          <button className={`wear-save-button${isSaved ? " saved" : ""}`} type="button" onClick={() => toggleWishlist(product.slug)}><span aria-hidden="true">&#9825;</span>{isSaved ? "Saved to wishlist" : "Save to wishlist"}</button>

          <div className="wear-benefits"><div><span aria-hidden="true">&#9651;</span><small>Pan India<br />Delivery</small></div><div><span aria-hidden="true">&#10003;</span><small>Secure<br />Payments</small></div><div><span aria-hidden="true">&#9633;</span><small>Easy<br />Returns</small></div></div>
          <div className="wear-disclosures">{details.map(([title, content]) => { const isOpen = openSection === title; return <div className={`wear-disclosure${isOpen ? " open" : ""}`} key={title}><button type="button" aria-expanded={isOpen} onClick={() => setOpenSection(isOpen ? "" : title)}><span>{title}</span><b>{isOpen ? "−" : "+"}</b></button>{isOpen ? <p>{content}</p> : null}</div>; })}</div>
        </section>
      </div>

      <section className="wear-complete-look"><h2>Complete The Look</h2><div>{wearLookItems.map(([name, price, image]) => <Link to="/wears" key={name}><img src={image} alt={name} /><strong>{name}</strong><small>{price}</small></Link>)}</div></section>
    </main>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [openSection, setOpenSection] = useState("What's Inside");
  const { addToCart, toggleWishlist, wishlistItems } = useAppContext();

  useEffect(() => {
    getProductBySlug(slug).then(setProduct);
  }, [slug]);

  if (!product) {
    return null;
  }

  const isGift = product.store === "gifts";
  if (!isGift) {
    return <StoreLayout store={product.store}><WearProductDetail product={product} /></StoreLayout>;
  }
  const isSaved = wishlistItems.includes(product.slug);
  const collection = product.category || product.eyebrow || (isGift ? "Gifts" : "Wears");
  const sections = [
    {
      title: "What's Inside",
      content: isGift
        ? "Thoughtfully selected details, premium packaging, and a personal touch, all ready to make the moment memorable."
        : "A considered wardrobe essential made with quality materials and an easy, everyday fit."
    },
    {
      title: "Product Details",
      content: `${product.description} Designed by OHRA with attention to finish, feel, and presentation.`
    },
    {
      title: "Delivery & Returns",
      content: "We deliver across India. Orders are carefully packed before dispatch. If something is not right, contact support within 48 hours of delivery."
    }
  ];

  return (
    <StoreLayout store={product.store}>
      <main className="product-detail-page">
        <nav className="product-breadcrumb" aria-label="Breadcrumb">
          <Link to={product.store === "gifts" ? "/gifts" : "/wears"}>Home</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <Link to={`/${product.store}/products`}>{collection}</Link>
          <span aria-hidden="true">&rsaquo;</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail-layout">
          <div className="product-visual">
            <img src={product.image} alt={product.name} />
          </div>

          <section className="product-detail-copy">
            <p className="product-detail-eyebrow">{product.eyebrow || collection}</p>
            <h1>{product.name}</h1>
            <p className="product-description">{product.description}</p>
            <div className="product-price-row">
              <strong>Rs. {product.salePrice || product.price}</strong>
              {product.salePrice && product.price !== product.salePrice ? <span>Rs. {product.price}</span> : null}
            </div>

            <div className="product-detail-actions">
              <button className="product-add-button" onClick={() => addToCart(product)}>Add to bag <span aria-hidden="true">&rarr;</span></button>
              <button className={`product-wishlist-button${isSaved ? " saved" : ""}`} onClick={() => toggleWishlist(product.slug)}>
                <span aria-hidden="true">&#9825;</span>{isSaved ? "Saved to wishlist" : "Save to wishlist"}
              </button>
            </div>

            <div className="product-benefits" aria-label="Product benefits">
              <div><span aria-hidden="true">&#9827;</span><p>Premium<br />Packaging</p></div>
              <div><span aria-hidden="true">&#9651;</span><p>Pan India<br />Delivery</p></div>
              <div><span aria-hidden="true">&#10087;</span><p>Thoughtfully<br />Curated</p></div>
            </div>

            <div className="product-disclosures">
              {sections.map((section) => {
                const isOpen = openSection === section.title;
                return (
                  <div className={`product-disclosure${isOpen ? " open" : ""}`} key={section.title}>
                    <button aria-expanded={isOpen} onClick={() => setOpenSection(isOpen ? "" : section.title)}>
                      <span>{section.title}</span><b aria-hidden="true">{isOpen ? "−" : "+"}</b>
                    </button>
                    {isOpen ? <p>{section.content}</p> : null}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </StoreLayout>
  );
}
