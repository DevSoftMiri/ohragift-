import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../store/AppContext";

const paymentMethods = [
  { id: "upi", title: "UPI", subtitle: "Pay with any UPI app", detail: "GPay, PhonePe, Paytm and more", icon: "UPI" },
  { id: "card", title: "Credit / Debit Card", subtitle: "Visa, Mastercard, RuPay and more", detail: "Card details will be collected securely", icon: "CARD" },
  { id: "netbanking", title: "Net Banking", subtitle: "All major banks", detail: "Continue with your preferred bank", icon: "BANK" },
  { id: "wallet", title: "Wallets", subtitle: "Paytm, Amazon Pay and more", detail: "Fast wallet checkout", icon: "WALLET" },
  { id: "cod", title: "Cash on Delivery", subtitle: "Pay when you receive your order", detail: "Available for eligible pin codes", icon: "COD" }
];

const fallbackImages = {
  gifts: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=300&q=80",
  wears: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80"
};

function formatCurrency(value) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

const emptyAddress = {
  line1: "",
  line2: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
  country: "India"
};

export default function CheckoutPage() {
  const { cartItems, setCartItems } = useAppContext();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [contact, setContact] = useState({ name: "", phone: "" });
  const [address, setAddress] = useState(emptyAddress);
  const [saveAddress, setSaveAddress] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const activeItems = placedOrder?.items || cartItems;
  const subtotal = useMemo(() => activeItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [activeItems]);
  const totalQuantity = useMemo(() => activeItems.reduce((sum, item) => sum + item.quantity, 0), [activeItems]);
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;
  const rewards = Math.max(0, Math.round(total / 100));

  function handleContactChange(event) {
    const { name, value } = event.target;
    setContact((current) => ({ ...current, [name]: value }));
  }

  function handleAddressChange(event) {
    const { name, value } = event.target;
    setAddress((current) => ({ ...current, [name]: value }));
  }

  function getFormattedAddress() {
    return [address.line1, address.line2, address.landmark, address.city, address.state, address.pincode, address.country]
      .map((item) => item.trim())
      .filter(Boolean)
      .join(", ");
  }

  function continueToPayment(event) {
    event.preventDefault();
    if (!contact.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[0-9+\-\s]{10,}$/.test(contact.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!address.line1.trim()) {
      setError("Please enter the house number and street address.");
      return;
    }
    if (!address.city.trim()) {
      setError("Please enter the city.");
      return;
    }
    if (!address.state.trim()) {
      setError("Please enter the state.");
      return;
    }
    if (!/^[1-9][0-9]{5}$/.test(address.pincode.trim())) {
      setError("Please enter a valid 6 digit PIN code.");
      return;
    }
    setError("");
    setStep(2);
  }

  function placeOrder() {
    if (!activeItems.length) {
      setError("Your cart is empty.");
      return;
    }
    setPlacedOrder({
      id: `OHRA-${Date.now().toString().slice(-6)}`,
      items: cartItems,
      address: getFormattedAddress(),
      contact,
      payment: paymentMethods.find((item) => item.id === paymentMethod)?.title,
      total
    });
    setCartItems([]);
    setError("");
    setStep(3);
  }

  if (!activeItems.length && !placedOrder) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <Link className="checkout-logo" to="/gifts">OHRA <span>GIFTS</span></Link>
          <h1>Your checkout is waiting for something lovely.</h1>
          <p>Add gifts or OHRA Wears pieces to your bag, then come back here to complete your order.</p>
          <div>
            <Link to="/gifts">Shop Gifts</Link>
            <Link to="/wears">Shop Wears</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-shell">
        <header className="checkout-header">
          <Link className="checkout-logo" to="/gifts">OHRA <span>GIFTS</span></Link>
          <p><span aria-hidden="true">Lock</span> Secure Checkout</p>
        </header>

        <nav className="checkout-steps" aria-label="Checkout progress">
          {["Address", "Payment", "Confirmation"].map((label, index) => {
            const number = index + 1;
            return <button key={label} type="button" className={step >= number ? "active" : ""} onClick={() => number < step && setStep(number)} disabled={number > step}><b>{number}</b><span>{label}</span></button>;
          })}
        </nav>

        {step === 1 && (
          <form className="checkout-grid address-step" onSubmit={continueToPayment}>
            <section className="checkout-card checkout-main-card">
              <p className="checkout-kicker">Step 1</p>
              <h1>Delivery Address</h1>
              <span>Where should we deliver your order?</span>

              <div className="checkout-address-fields">
                <label className="checkout-field wide">
                  House No., Building, Street
                  <input name="line1" value={address.line1} onChange={handleAddressChange} placeholder="House number, building name, street" autoComplete="address-line1" />
                </label>
                <label className="checkout-field wide">
                  Area / Locality
                  <input name="line2" value={address.line2} onChange={handleAddressChange} placeholder="Area, colony, sector, locality" autoComplete="address-line2" />
                </label>
                <label className="checkout-field">
                  Landmark
                  <input name="landmark" value={address.landmark} onChange={handleAddressChange} placeholder="Nearby landmark" />
                </label>
                <label className="checkout-field">
                  City
                  <input name="city" value={address.city} onChange={handleAddressChange} placeholder="City" autoComplete="address-level2" />
                </label>
                <label className="checkout-field">
                  State
                  <input name="state" value={address.state} onChange={handleAddressChange} placeholder="State" autoComplete="address-level1" />
                </label>
                <label className="checkout-field">
                  PIN Code
                  <input name="pincode" value={address.pincode} onChange={handleAddressChange} placeholder="6 digit PIN code" inputMode="numeric" maxLength="6" autoComplete="postal-code" />
                </label>
                <label className="checkout-field wide">
                  Country
                  <input name="country" value={address.country} onChange={handleAddressChange} placeholder="Country" autoComplete="country-name" />
                </label>
              </div>

              <div className="checkout-contact">
                <h2>Contact Details</h2>
                <p>We'll use this to share order updates.</p>
                <div>
                  <label className="checkout-field">
                    Full Name
                    <input name="name" value={contact.name} onChange={handleContactChange} placeholder="Enter your full name" />
                  </label>
                  <label className="checkout-field">
                    Phone Number
                    <input name="phone" value={contact.phone} onChange={handleContactChange} placeholder="83076 42071" />
                  </label>
                </div>
              </div>

              <label className="checkout-save">
                <input type="checkbox" checked={saveAddress} onChange={(event) => setSaveAddress(event.target.checked)} />
                Save this address for future orders
              </label>

              {error && <p className="checkout-error">{error}</p>}
              <button className="checkout-primary" type="submit">Continue to Payment <span>&rarr;</span></button>
            </section>
          </form>
        )}

        {step === 2 && (
          <section className="checkout-grid payment-step">
            <section className="checkout-card checkout-main-card">
              <p className="checkout-kicker">Step 2</p>
              <h1>Payment</h1>
              <span>Choose a payment method to complete your order.</span>

              <div className="checkout-payment-list">
                {paymentMethods.map((method) => (
                  <label key={method.id} className={paymentMethod === method.id ? "selected" : ""}>
                    <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} />
                    <i>{method.icon}</i>
                    <strong>{method.title}</strong>
                    <small>{method.subtitle}<br />{method.detail}</small>
                  </label>
                ))}
              </div>

              {error && <p className="checkout-error">{error}</p>}
              <div className="checkout-action-row">
                <button className="checkout-secondary" type="button" onClick={() => setStep(1)}>Back</button>
                <button className="checkout-primary" type="button" onClick={placeOrder}>Place Order <span>&rarr;</span></button>
              </div>
              <p className="checkout-secure-note">Your payment information is secure and encrypted.</p>
            </section>

            <aside className="checkout-card checkout-summary">
              <div className="checkout-summary-title"><h2>Order Summary</h2><span>{totalQuantity} items</span></div>
              <div className="checkout-summary-items">
                {activeItems.map((item) => (
                  <article key={item.slug}>
                    <img src={item.image || fallbackImages[item.store] || fallbackImages.gifts} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <small>Qty: {item.quantity}</small>
                    </div>
                    <strong>{formatCurrency(item.price * item.quantity)}</strong>
                  </article>
                ))}
              </div>
              <div className="checkout-total-lines">
                <p><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></p>
                <p><span>Shipping</span><strong>{shipping ? formatCurrency(shipping) : "Free"}</strong></p>
                <p><span>Estimated Tax</span><strong>Rs. 0</strong></p>
                <p className="grand-total"><span>Total Amount</span><strong>{formatCurrency(total)}</strong></p>
              </div>
              <div className="checkout-rewards"><b>[]</b><span><strong>OHRA Rewards</strong>Earn {rewards} points on this order</span></div>
              <div className="checkout-signature">More than gifts,<br />we create moments &hearts;</div>
            </aside>
          </section>
        )}

        {step === 3 && placedOrder && (
          <section className="checkout-card checkout-confirmation">
            <p className="checkout-kicker">Order Confirmed</p>
            <h1>Thank you, {placedOrder.contact.name}.</h1>
            <span>Your order {placedOrder.id} has been placed successfully. We'll contact you on {placedOrder.contact.phone} with updates.</span>
            <div className="confirmation-details">
              <p><strong>Deliver to</strong>{placedOrder.address}</p>
              <p><strong>Payment</strong>{placedOrder.payment}</p>
              <p><strong>Total</strong>{formatCurrency(placedOrder.total)}</p>
            </div>
            <div className="checkout-action-row">
              <Link className="checkout-secondary" to="/orders">Track Order</Link>
              <Link className="checkout-primary" to="/gifts">Continue Shopping <span>&rarr;</span></Link>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
