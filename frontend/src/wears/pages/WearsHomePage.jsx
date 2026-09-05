import { Link } from "react-router-dom";
import StoreLayout from "../../shared/components/StoreLayout";

const summerDrop = [
  {
    name: "Ambala City Graphic T-Shirt",
    description: "Add your chosen city, location, or name to create a personal everyday tee.",
    price: "Rs. 899.00",
    image: "/images/wears/ambala%20main.png",
    secondaryImage: "/images/wears/ambala%20t%20shirt.png"
  },
  {
    name: "Ambala Heritage Graphic T-Shirt",
    description: "Customize the front artwork with a place or person that matters to you.",
    price: "Rs. 899.00",
    image: "/images/wears/ambala%202%20main.png",
    secondaryImage: "/images/wears/ambala%202%20tshirt.png"
  },
  {
    name: "Ambala Statement Graphic T-Shirt",
    description: "Made for custom names and locations with a relaxed, easy-to-style fit.",
    price: "Rs. 899.00",
    image: "/images/wears/ambala%203%20main.png",
    secondaryImage: "/images/wears/ambala%203%20tshit.png"
  },
  {
    name: "Bathinda City Graphic T-Shirt",
    description: "Turn a favorite city, hometown, or personal name into a wearable graphic.",
    price: "Rs. 899.00",
    image: "/images/wears/bathinda%20main.png",
    secondaryImage: "/images/wears/bathinda%20t%20shirt.png"
  }
];

const bestSellers = [
  {
    name: "Delhi City Graphic T-Shirt",
    description: "Personalize the design with your selected city name, location, or initials.",
    price: "Rs. 899.00",
    image: "/images/wears/delhi%20main.png",
    secondaryImage: "/images/wears/delhi%20t%20shirt.png"
  },
  {
    name: "Hisar City Graphic T-Shirt",
    description: "A clean custom tee for names, places, groups, trips, and local memories.",
    price: "Rs. 899.00",
    image: "/images/wears/hisar%20main.png",
    secondaryImage: "/images/wears/hisar%20tshirt.png"
  },
  {
    name: "Karnal City Graphic T-Shirt",
    description: "Built for custom place names or personal text while keeping a premium look.",
    price: "Rs. 899.00",
    image: "/images/wears/Karnal%20main.png",
    secondaryImage: "/images/wears/karnal%20t%20shirt.png"
  },
  {
    name: "Sirsa Women's Graphic T-Shirt",
    description: "Create a simple statement tee using a loved one’s name or favorite place.",
    price: "Rs. 899.00",
    image: "/images/wears/women%20and%20sirsa.png",
    secondaryImage: "/images/wears/women%20and%20sirsa%20t%20shirt.png"
  }
];

const archive = [
  "/images/wears/custom%20name%20with%20car.png",
  "/images/wears/custom%20name%20with%20car%20t%20shirt.png",
  "/images/wears/ambala%20main.png",
  "/images/wears/delhi%20main.png",
  "/images/wears/hisar%20main.png",
  "/images/wears/Karnal%20main.png"
];

function productSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ProductRail({ title, items, id, showViewAll = true }) {
  return <section className="wears-rail" id={id}><div className="wears-rail-heading"><h2>{title}</h2>{showViewAll ? <Link to="/wears">View All</Link> : null}</div><div className="wears-product-row">{items.map((product) => <article key={product.name}><Link to={`/wears/product/${productSlug(product.name)}`}><span className="wears-product-image"><img src={product.image} alt={product.name} /><img src={product.secondaryImage} alt={`${product.name} alternate view`} /></span><h3>{product.name}</h3><span className="wears-product-description">{product.description}</span><p>{product.price}</p></Link></article>)}</div></section>;
}

export default function WearsHomePage() {
  return (
    <StoreLayout store="wears">
      <main className="wears-home">
        <section className="wears-hero"><picture><source media="(max-width: 720px)" srcSet="/images/wears/mobile%20hero.png" /><img src="/images/wears/hero%20desktop.png" alt="OHRA Wears city T-shirt campaign" /></picture><Link to="#summer-drop">Shop Now</Link></section>
        <ProductRail title="New In // Summer Drop" items={summerDrop} id="summer-drop" />
        <ProductRail title="Best Sellers" items={bestSellers} id="best-sellers" showViewAll={false} />
        <section className="wears-archive"><h2>OHRA Wears Archives</h2><div>{archive.map((image, index) => <img src={image} alt="OHRA Wears editorial archive" key={image} className={`archive-${index + 1}`} />)}</div></section>
        <section className="wears-rail wears-accessories"><div className="wears-rail-heading"><h2>Custom Drop</h2><Link to="/wears">View All</Link></div><div className="wears-product-row">{[{
          name: "Custom Name Car Graphic T-Shirt",
          description: "Add a name, city, or location to create a custom car-themed T-shirt.",
          price: "Rs. 899.00",
          image: "/images/wears/custom%20name%20with%20car.png",
          secondaryImage: "/images/wears/custom%20name%20with%20car%20t%20shirt.png"
        }].map((product) => <article key={product.name}><Link to={`/wears/product/${productSlug(product.name)}`}><span className="wears-product-image"><img src={product.image} alt={product.name} /><img src={product.secondaryImage} alt={`${product.name} alternate view`} /></span><h3>{product.name}</h3><span className="wears-product-description">{product.description}</span><p>{product.price}</p></Link></article>)}</div></section>
      </main>
    </StoreLayout>
  );
}
