import { Link, Navigate, useParams } from "react-router-dom";
import StoreLayout from "../../shared/components/StoreLayout";

const pages = {
  "shipping-policy": {
    title: "Shipping & Payment",
    updated: "September 2026",
    sections: [
      ["Processing", "Customized orders are processed after successful payment. Standard processing and customization takes approximately 3-5 working days after order and customization details are confirmed."],
      ["Delivery", "Ohra Wears currently delivers across India only. After dispatch, estimated delivery usually takes 3-7 working days, depending on location, courier availability, holidays, weather, and operational conditions."],
      ["Payment", "All orders are prepaid. Cash on Delivery is not available. Shipping charges may vary by location, order quantity, package size, weight, and courier service."],
      ["Tracking & Address", "Tracking details will be shared where available after dispatch. Customers are responsible for entering the correct name, phone number, PIN code, address, city, and state."]
    ]
  },
  "returns-replacement": {
    title: "Returns & Replacement",
    updated: "September 2026",
    sections: [
      ["Customized Products", "Because many Ohra Wears products are customized for each customer, normal returns and exchanges are not accepted for change of mind, wrong size selection, spelling errors submitted by the customer, or approved customization details."],
      ["Eligible Issues", "A replacement may be available if the product is damaged, defective, different from the confirmed order, printed incorrectly due to an Ohra Wears error, or sent in the wrong size due to our error."],
      ["Claim Window", "Claims must be submitted within 48 hours of delivery with a complete unboxing video and clear photographs showing the issue."],
      ["Resolution", "Verified eligible cases generally receive a replacement only. Products should not be sent back without first contacting Ohra Wears."]
    ]
  },
  "cancellation-policy": {
    title: "Cancellation Policy",
    updated: "September 2026",
    sections: [
      ["Confirmed Orders", "Orders cannot be cancelled after successful payment because customization and production arrangements may begin shortly after confirmation."],
      ["Changes", "Changes to size, name, artwork, colour, print, design, placement, or other customization details are not guaranteed after payment. Contact us immediately if you notice an error."],
      ["Refunds", "Refunds are generally not provided for successfully delivered customized products. A refund may be considered only when a courier confirms an order is lost or undeliverable due to shipping issues."],
      ["Approved Refunds", "Where approved, refunds are processed to the original payment method wherever possible. Bank or payment provider timelines may vary."]
    ]
  },
  "privacy-policy": {
    title: "Privacy Policy",
    updated: "September 2026",
    sections: [
      ["Company", "Ohra Wears is operated by Mirisoft Solution, also referred to as Mirisoft in this Privacy Policy."],
      ["Information We Collect", "We may collect details such as name, email, phone number, billing and shipping address, order information, product selections, size information, customization instructions, artwork, images, communications, payment information, and website usage information."],
      ["How We Use It", "Mirisoft uses information to process orders, create customized products, confirm requirements, process payments, arrange delivery, share tracking updates, provide support, prevent fraud, improve services, and maintain legal or business records."],
      ["Sharing", "We may share information with payment processors, courier partners, hosting and technology providers, communication providers, production partners, professional advisers, or legal authorities where reasonably required."],
      ["Contact", "For privacy-related questions, contact Mirisoft Solution for Ohra Wears at ohrawears@gmail.com or 83076 42071."]
    ]
  },
  "terms-of-service": {
    title: "Terms & Conditions",
    updated: "September 2026",
    sections: [
      ["Customization Responsibility", "Customers are responsible for reviewing all size, text, name, spelling, artwork, image, colour, print placement, and customization details before confirming an order."],
      ["Submitted Content", "By submitting images, logos, artwork, text, or other materials, customers confirm they have the rights or permission to use them for customization."],
      ["Product Variations", "Actual colours and designs may vary slightly due to screen settings, lighting, fabric characteristics, printing processes, and production variations."],
      ["Orders", "Ohra Wears accepts prepaid orders only, ships within India, and does not accept normal returns or exchanges for customized products."]
    ]
  },
  "customer-enquiries": {
    title: "Customer Enquiries",
    updated: "September 2026",
    sections: [
      ["Support", "Contact us for custom T-shirt orders, personalized designs, artwork requirements, name customization, print placement, size guidance, order status, shipping, payment queries, damaged products, incorrect products, or lost shipments."],
      ["Order Help", "For an existing order, include your name, order number, registered phone number, email address, and reason for contact so we can assist faster."],
      ["Claims", "Damaged, defective, or incorrect-product claims must be submitted within 48 hours of delivery with order number, complete unboxing video, clear photographs, and a short issue description."],
      ["Contact Details", "Email ohrawears@gmail.com or call/WhatsApp 83076 42071. Support hours are Monday-Saturday, 10:00 AM-6:00 PM."]
    ]
  },
  "business-enquiries": {
    title: "Business Enquiries",
    updated: "September 2026",
    sections: [
      ["Custom Apparel", "Ohra Wears works with individuals, businesses, creators, teams, colleges, events, communities, and organizations to turn ideas into wearable designs."],
      ["Requirements", "We can assist with bulk T-shirts, corporate merchandise, event merchandise, college or group T-shirts, team apparel, personalized gifting, creator merchandise, brand merchandise, custom artwork, and special occasion T-shirts."],
      ["Quotation Details", "For a faster quote, share your name, organization, phone number, email, required quantity, product type, sizes, customization requirements, delivery location, required date, and artwork or reference."],
      ["Contact Details", "Call/WhatsApp 83076 42071 or email ohrawears@gmail.com. Business hours are Monday-Saturday, 10:00 AM-6:00 PM."]
    ]
  }
};

export default function WearsInfoPage() {
  const { page } = useParams();
  const content = pages[page];

  if (!content) return <Navigate to="/wears" replace />;

  return (
    <StoreLayout store="wears">
      <main className="wears-info-page">
        <Link to="/wears">OHRA Wears</Link>
        <p>Last Updated: {content.updated}</p>
        <h1>{content.title}</h1>
        <div>
          {content.sections.map(([title, text]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
        </div>
      </main>
    </StoreLayout>
  );
}
