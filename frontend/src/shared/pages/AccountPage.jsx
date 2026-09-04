export default function AccountPage() {
  return (
    <main className="utility-page">
      <div className="section-heading">
        <p className="eyebrow">Shared account</p>
        <h1>One customer account for the full OHRA ecosystem</h1>
      </div>
      <div className="feature-grid">
        <article>
          <h2>Profile and addresses</h2>
          <p>Login, saved addresses, support preferences, and recipient details.</p>
        </article>
        <article>
          <h2>Store administration</h2>
          <p>Manage the categories and products for OHRA Gifts and OHRA Wears.</p>
          <Link to="/admin">Open admin workspace</Link>
        </article>
        <article>
          <h2>Rewards and referrals</h2>
          <p>One loyalty balance across gifting and fashion purchases.</p>
        </article>
      </div>
    </main>
  );
}
import { Link } from "react-router-dom";
