import { Link } from "react-router-dom";
import StoreLayout from "../../shared/components/StoreLayout";
import OptimizedImage from "../../shared/components/OptimizedImage";

export default function WearsAboutPage() {
  return (
    <StoreLayout store="wears">
      <main className="wears-about-page">
        <section className="wears-about-hero">
          <div>
            <Link to="/wears">OHRA Wears</Link>
            <h1>Personal stories, printed for everyday wear.</h1>
            <p>
              Ohra Wears creates customized T-shirts built around names, cities,
              locations, teams, memories, and the small personal details people
              actually care about.
            </p>
          </div>
          <OptimizedImage src="/images/wears/custom%20name%20with%20car.png" alt="Custom OHRA Wears T-shirt" eager sizes="(max-width: 720px) 92vw, 44vw" />
        </section>

        <section className="wears-about-story">
          <p>
            We are based in Ambala City, Haryana, and make personalized apparel
            for individuals, groups, creators, events, colleges, businesses, and
            anyone who wants a design that feels closer than a regular off-the-rack
            T-shirt.
          </p>
          <p>
            Every customized product starts with your input: a name, a place, a
            phrase, a reference, or an idea. Our job is to turn that into a clean,
            wearable piece with careful print placement, clear communication, and
            reliable delivery across India.
          </p>
        </section>

        <section className="wears-about-grid" aria-label="What OHRA Wears does">
          <article>
            <span>01</span>
            <h2>Custom Names</h2>
            <p>Add a person’s name, initials, nickname, or group identity to make the tee feel personal.</p>
          </article>
          <article>
            <span>02</span>
            <h2>City & Location Prints</h2>
            <p>Create designs around hometowns, travel memories, local pride, events, or favorite places.</p>
          </article>
          <article>
            <span>03</span>
            <h2>Bulk & Business Orders</h2>
            <p>We support custom apparel for teams, colleges, communities, creators, and organizations.</p>
          </article>
        </section>

        <section className="wears-about-contact">
          <div>
            <h2>Have an idea for a T-shirt?</h2>
            <p>Share your name, city, design reference, quantity, size details, and delivery location.</p>
          </div>
          <div>
            <a href="https://www.instagram.com/wearohra/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/people/ohrawear" target="_blank" rel="noreferrer">Facebook</a>
            <a href="mailto:ohrawears@gmail.com">ohrawears@gmail.com</a>
            <a href="tel:+918307642071">83076 42071</a>
          </div>
        </section>
      </main>
    </StoreLayout>
  );
}
