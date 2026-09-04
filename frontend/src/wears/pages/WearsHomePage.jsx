import { Link } from "react-router-dom";
import StoreLayout from "../../shared/components/StoreLayout";

const summerDrop = [
  ["Tropic Parade Relaxed Fit Printed Shirt", "Rs. 2,999.00", "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=720&q=85"],
  ["The Fallen Star Relaxed Fit Printed Shirt", "Rs. 2,799.00", "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=720&q=85"],
  ["Out Of Office Regular Fit Printed Shirt", "Rs. 2,699.00", "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=720&q=85"],
  ["Pavilions Regular Fit Printed Shirt", "Rs. 2,799.00", "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=720&q=85"]
];

const bestSellers = [
  ["Powerless Influence Relaxed Fit Printed Shirt", "Rs. 2,799.00", "https://images.unsplash.com/photo-1506629905607-d405b7a30db9?auto=format&fit=crop&w=720&q=85"],
  ["Sad Holidays Oversized Fit Printed Jersey", "Rs. 2,499.00", "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=720&q=85"],
  ["An Evil Door And A Well Short Sleeve Shirt", "Rs. 2,799.00", "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=720&q=85"],
  ["It's O' Brooklyn Relaxed Fit Shirt", "Rs. 2,699.00", "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=720&q=85"]
];

const archive = [
  "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=85",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85",
  "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=85",
  "https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?auto=format&fit=crop&w=600&q=85",
  "https://images.unsplash.com/photo-1614890085618-0e1054da74b0?auto=format&fit=crop&w=600&q=85",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=85"
];

function productSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ProductRail({ title, items, id }) {
  return <section className="wears-rail" id={id}><div className="wears-rail-heading"><h2>{title}</h2><Link to="/wears/products">View All</Link></div><div className="wears-product-row">{items.map(([name, price, image]) => <article key={name}><Link to={`/wears/product/${productSlug(name)}`}><img src={image} alt={name} /><h3>{name}</h3><p>{price}</p></Link></article>)}</div></section>;
}

export default function WearsHomePage() {
  return (
    <StoreLayout store="wears">
      <main className="wears-home">
        <section className="wears-hero"><img src="/images/wears/wears-hero.png" alt="OHRA Wears summer campaign" /><Link to="/wears/products">Shop Now</Link></section>
        <ProductRail title="New In // Summer Drop" items={summerDrop} id="summer-drop" />
        <ProductRail title="Best Sellers" items={bestSellers} id="best-sellers" />
        <section className="wears-archive"><h2>OHRA Wears Archives</h2><div>{archive.map((image, index) => <img src={image} alt="OHRA Wears editorial archive" key={image} className={`archive-${index + 1}`} />)}</div></section>
        <section className="wears-rail wears-accessories"><div className="wears-rail-heading"><h2>Accessories</h2><Link to="/wears/products">View All</Link></div><div className="wears-product-row">{[["Banjara Bucket Hat", "Rs. 1,299.00", "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=720&q=85"], ["Checkers & Hukam Socks", "Rs. 499.00", "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=720&q=85"], ["The Mascot Socks", "Rs. 499.00", "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=720&q=85"], ["Endless Rides Socks", "Rs. 499.00", "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=720&q=85"]].map(([name, price, image]) => <article key={name}><Link to={`/wears/product/${productSlug(name)}`}><img src={image} alt={name} /><h3>{name}</h3><p>{price}</p></Link></article>)}</div></section>
        <footer className="wears-footer"><div><img src="/images/wears/wear logo.png" alt="OHRA Wears" /><p>Follow the good noise.</p></div><nav><a href="#top">Instagram</a><a href="#top">LinkedIn</a><a href="#top">Spotted</a><a href="#top">About Us</a></nav><nav><a href="#top">Shipping & Payment</a><a href="#top">Returns & Exchanges</a><a href="#top">Business Enquiries</a><a href="#top">Customer Enquiries</a></nav><small>&copy; 2026 OHRA Wears. Privacy policy. Terms of service.</small></footer>
      </main>
    </StoreLayout>
  );
}
