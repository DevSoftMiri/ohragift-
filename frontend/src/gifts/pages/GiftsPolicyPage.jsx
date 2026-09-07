import { Link } from "react-router-dom";
import StoreLayout from "../../shared/components/StoreLayout";

const sections = [
  ["Information We Collect", "We collect the details needed to fulfil your order or gifting request, including your name, contact information, delivery address, recipient details, gift customisation instructions, and payment or order information."],
  ["How We Use Information", "Your information is used to prepare, personalise, deliver, and support your OHRA Gifts order. We may also use it to respond to enquiries, share important order updates, and improve our gifting experience."],
  ["Sharing Information", "We share only the necessary information with trusted delivery, payment, and service partners to complete your order. We do not sell your personal information."],
  ["Your Gift Details", "Names, messages, photos, and other customisation details are used only to create and deliver your requested gift. Please provide only content you have the right to share."],
  ["Security and Retention", "We use reasonable safeguards to protect your information and retain it only for as long as needed for orders, support, legal obligations, and business records."],
  ["Contact Us", "For privacy questions or requests regarding your information, contact OHRA Gifts at 83076 42071 or through our Help and Support page."]
];

export default function GiftsPolicyPage() {
  return (
    <StoreLayout store="gifts">
      <main className="gifts-policy-page">
        <Link to="/gifts">OHRA Gifts</Link>
        <p>Last updated: September 2026</p>
        <h1>Privacy Policy</h1>
        <span>How OHRA Gifts handles the information you share with us.</span>
        <div>
          {sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
        </div>
      </main>
    </StoreLayout>
  );
}
