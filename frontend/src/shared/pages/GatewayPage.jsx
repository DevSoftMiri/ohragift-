import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";

const journeyItems = [
  {
    label: "One Account",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="9.5" r="5.5" />
        <path d="M6 28c.9-6.2 4.2-9.3 10-9.3S25.1 21.8 26 28" />
      </svg>
    )
  },
  {
    label: "One Bag",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 12h16l1.2 16H6.8L8 12Z" />
        <path d="M12 12c0-4 1.4-6 4-6s4 2 4 6" />
      </svg>
    )
  },
  {
    label: "One Checkout",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="5" y="9" width="22" height="15" rx="2" />
        <path d="M5 14h22M9 20h3M15 20h3" />
      </svg>
    )
  }
];

export default function GatewayPage() {
  return (
    <main className="gateway-page">
      <section className="gateway-hero" aria-label="Choose an OHRA world">
        <div className="gateway-logo-mark" aria-hidden="true">
          <span>O</span>
        </div>
        <p className="gateway-brand">MIRISOFT</p>
        <h1>Two Worlds. One <span>OHRA.</span></h1>
        <div className="gateway-divider" aria-hidden="true"><span /></div>
        <p>Choose how you'd like to explore.</p>
      </section>

      <section className="gateway-grid">
        <Link className="gateway-card gifts-card" to="/gifts" aria-label="Explore OHRA Gifts">
          <OptimizedImage src="/images/ohra_gifts_landing_image.png" alt="OHRA Gifts collection with gift box, candle, nuts and mug" eager sizes="(max-width: 800px) 92vw, 45vw" />
          <span className="gateway-card-copy">
            <strong>Thoughtful gifts<br />for every moment.</strong>
            <span>Explore Gifts <b aria-hidden="true">&rarr;</b></span>
          </span>
        </Link>

        <span className="gateway-or" aria-hidden="true">OR</span>

        <Link className="gateway-card wears-card" to="/wears" aria-label="Explore OHRA Wears">
          <OptimizedImage src="/images/Ohra wear img.png" alt="OHRA Wears model wearing a graphic t-shirt" eager sizes="(max-width: 800px) 92vw, 45vw" />
          <span className="gateway-card-copy">
            <strong>Modern fashion<br />for everyday<br />expression.</strong>
            <span>Explore Wears <b aria-hidden="true">&rarr;</b></span>
          </span>
        </Link>
      </section>

      <section className="gateway-unified" aria-label="Shared OHRA shopping benefits">
        {journeyItems.map((item) => (
          <article key={item.label}>
            {item.icon}
            <span>{item.label}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
