
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppointmentPopup from "../common/AppointmentPopup";
import { useClinic } from "../../../src/context/ClinicContext";
import { community } from "../../config/community";
import { saveSubscription } from "../../services/subscriptionService";

const quickLinks = [
  { label: "Home", to: "/#home" },
  { label: "Our Doctors", to: "/#about" },
  { label: "Services", to: "/#services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/#contact" },
];

export default function Footer() {
  const { clinic } = useClinic();

  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [subscribeComplete, setSubscribeComplete] = useState(false);

  const submitting = useRef(false);

  const socials = community.socials.filter((item) =>
    item.url?.trim(),
  );

  async function handleSubscribe(event) {
    event.preventDefault();

    if (submitting.current) return;

    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      setNotice("Please enter a valid email address.");
      return;
    }

    submitting.current = true;
    setSaving(true);
    setNotice("");

    try {
      await saveSubscription(normalizedEmail);

      setEmail("");
      setSubscribeComplete(true);
    } catch (error) {
      console.error("Subscription failed:", error);

      setNotice(
        "Unable to save your subscription. Please try again.",
      );
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  }

  const linkClass =
    "text-sm leading-7 text-green-100/80 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-300";

  return (
    <footer className="relative isolate overflow-hidden bg-[#082b1c] text-white">
      <img
        src="/images/doctor-banner.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.04]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Appointment strip */}
        <div className="flex flex-col gap-5 border-b border-white/10 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Make time for your health
            </h2>

            <p className="mt-2 text-sm text-green-100/80">
              Plan your next visit to {clinic.name}.
            </p>
          </div>

          <Link
            to="/#appointment"
            className="inline-flex shrink-0 justify-center rounded-full bg-green-500 px-6 py-3 text-sm font-bold text-green-950 transition hover:bg-green-400"
          >
            Request Appointment →
          </Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_1.2fr] lg:gap-8">
          {/* Brand and address */}
          <div>
            <Link
              to="/"
              aria-label={`${clinic.name} home`}
              className="inline-block rounded-xl bg-white px-4 py-3"
            >
              <img
                src={clinic.logo}
                alt={clinic.name}
                className="h-12 w-40 object-contain"
              />
            </Link>

            <p className="mt-5 text-sm leading-7 text-green-100/80">
              A welcoming space to discuss your health and
              plan your consultation.
            </p>

            <address className="mt-4 text-sm not-italic leading-7 text-green-100/80">
              {clinic.address.line1}
              <br />
              {clinic.address.locality},{" "}
              {clinic.address.city}
            </address>

            {clinic.phone && (
              <a
                href={`tel:${clinic.phone.replace(/[^\d+]/g, "")}`}
                className={`${linkClass} mt-3 inline-block`}
              >
                {clinic.phone}
              </a>
            )}

            {clinic.email && (
              <a
                href={`mailto:${clinic.email}`}
                className={`${linkClass} mt-2 block break-all`}
              >
                {clinic.email}
              </a>
            )}

            {socials.length > 0 && (
              <nav
                aria-label="Social media"
                className="mt-5 flex flex-wrap gap-2"
              >
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold transition hover:border-green-400 hover:bg-white/10"
                  >
                    {social.label}
                    <span className="sr-only">
                      {" "}(opens in a new tab)
                    </span>
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="font-bold">Explore</h3>

            <ul className="mt-5 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Timings */}
          <div>
            <h3 className="font-bold">Consultation Hours</h3>

            <div className="mt-5 space-y-5">
              {clinic.timings.map((timing) => (
                <div key={timing.label}>
                  <p className="text-sm text-green-300">
                    {timing.label}
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {timing.display}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs leading-6 text-green-100/65">
              Please confirm availability before your visit.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold">Stay Connected</h3>

            <p className="mt-5 text-sm leading-7 text-green-100/80">
              Subscribe for clinic news and updates.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-4 space-y-3"
            >
              <label
                htmlFor="footer-email"
                className="sr-only"
              >
                Email address
              </label>

              <input
                id="footer-email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setNotice("");
                }}
                placeholder="Your email address"
                required
                maxLength={254}
                disabled={saving}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-green-100/50 focus:border-green-300 focus:ring-2 focus:ring-green-300/30"
              />

              <button
                type="submit"
                disabled={saving}
                aria-busy={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-bold text-green-950 hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-green-950/30 border-t-green-950"
                    />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe →"
                )}
              </button>

              <p className="text-xs text-green-100/60">
                By subscribing, you agree to receive clinic news and updates.
              </p>

              {notice && (
                <p
                  role="status"
                  className="text-xs leading-6 text-green-200"
                >
                  {notice}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-green-100/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.name}.
            All rights reserved.
          </p>

          <nav
            aria-label="Legal"
            className="flex flex-wrap gap-5"
          >
            <Link
              to="/privacy-policy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="hover:text-white"
            >
              Terms & Conditions
            </Link>
          </nav>
        </div>
      </div>

      <AppointmentPopup
        open={subscribeComplete}
        onDone={() => setSubscribeComplete(false)}
        submitted={true}
        title="Thank You for Subscribing!"
        message="Your email has been saved. You’re subscribed to clinic news and updates."
      />
    </footer>
  );
}