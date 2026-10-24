import { useRef, useState } from "react";
import { useClinic } from "../../../src/context/ClinicContext";
import { useNavigate } from "react-router-dom";
import AppointmentPopup from "../../components/common/AppointmentPopup";
import { saveEnquiry } from "../../services/enquiryService";


const initialForm = {
  name: "",
  mobile: "",
  email: "",
  date: "",
  session: "",
  message: "",
};

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100";

function getToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default function ContactSection() {
  const { clinic } = useClinic();
  const [form, setForm] = useState(initialForm);
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const submitting = useRef(false);


  function handleDone() {
    setPopupOpen(false);
    setForm(initialForm);
    setNotice("");

    navigate("/#home");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  const address = [
    clinic.address.line1,
    clinic.address.locality,
    clinic.address.city,
  ]
    .filter(Boolean)
    .join(", ");

  // Exact clinic pin milne tak address-based map.
  const mapQuery = encodeURIComponent(address);

  const mapUrl =
    clinic.mapUrl ||
    `https://www.google.com/maps?q=${mapQuery}&output=embed`;

  const directionsUrl =
    clinic.directionsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setNotice("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting.current) return;

    const name = form.name.trim();
    const mobile = form.mobile.trim();
    const email = form.email.trim();

    if (!name || name.length > 100) {
      setNotice("Please enter your full name (maximum 100 characters).");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setNotice("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (
      email &&
      (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    ) {
      setNotice("Please enter a valid email address.");
      return;
    }

    if (!form.date || form.date < getToday()) {
      setNotice("Please choose today or a future date.");
      return;
    }

    if (!clinic.timings.some((timing) => timing.label === form.session)) {
      setNotice("Please select a valid consultation session.");
      return;
    }

    if (form.message.trim().length > 1000) {
      setNotice("Please keep your message within 1000 characters.");
      return;
    }

    submitting.current = true;
    setSaving(true);
    setNotice("");

    try {
      await saveEnquiry(form);

      setForm(initialForm);
      setPopupOpen(true);
    } catch (error) {
      console.error("Appointment submission failed:", error);

      setNotice(
        error.code === "PERMISSION_DENIED" ||
          error.code === "database/permission-denied"
          ? "Your request could not be saved. Please contact the clinic."
          : "Unable to submit your request. Please check your connection and try again.",
      );
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  }

  return (

    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-green-50/60 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
            Contact & Appointments
          </p>

          <h2
            id="contact-title"
            className="mt-3 text-3xl font-bold tracking-tight text-green-950 sm:text-4xl"
          >
            Let’s plan your visit
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Find our clinic, check consultation timings and
            share your preferred appointment details.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Appointment form */}
          <div
            id="appointment"
            className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg shadow-green-950/5"
          >
            <div className="bg-green-900 px-6 py-6 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-green-200">
                A step towards your care
              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">
                Request an Appointment
              </h3>

              <p className="mt-2 text-sm leading-6 text-green-100">
                Choose your preferred date and consultation session.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  Full Name *
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Your full name"
                    maxLength={100}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Mobile Number *
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    autoComplete="tel-national"
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    title="Enter a valid 10-digit Indian mobile number"
                    placeholder="10-digit mobile number"
                    required
                    className={inputClass}
                  />
                </label>
              </div>

              <label className="block text-sm font-semibold text-slate-700">
                Email Address
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={254}
                  className={inputClass}
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  Preferred Date *
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={getToday()}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-semibold text-slate-700">
                  Preferred Session *
                  <select
                    name="session"
                    value={form.session}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  >
                    <option value="">Select a session</option>

                    {clinic.timings.map((timing) => (
                      <option
                        key={timing.label}
                        value={timing.label}
                      >
                        {timing.label} — {timing.display}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block text-sm font-semibold text-slate-700">
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Any questions about your visit?"
                  rows={3}
                  maxLength={1000}
                  className={`${inputClass} resize-y`}
                />
              </label>

              <p className="text-xs leading-5 text-slate-500">
                Preferred dates and sessions are subject to
                confirmation by the clinic.
              </p>

              <button
                type="submit"
                disabled={saving}
                aria-busy={saving}
                className="flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-green-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    Request Appointment
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                Your appointment will be confirmed by the clinic.
              </p>

              {notice && (
                <p
                  role="status"
                  className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"
                >
                  {notice}
                </p>
              )}
            </form>
          </div>

          {/* Clinic image and information */}
          <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg shadow-green-950/5">
            <div className="relative">
              <img
                src="/images/gallery-6.jpg"
                alt="Healthcare setting"
                loading="lazy"
                className="h-56 w-full object-cover sm:h-64"
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-green-950/80 to-transparent"
              />

              <div className="absolute bottom-5 left-6 right-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-green-100">
                  Visit Us
                </p>

                <h3 className="mt-1 text-2xl font-bold text-white">
                  {clinic.name}
                </h3>
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-green-700">
                  Clinic Address
                </h4>

                <address className="mt-3 text-base not-italic leading-7 text-slate-700">
                  {clinic.address.line1}
                  <br />
                  {clinic.address.locality},{" "}
                  {clinic.address.city}
                </address>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:underline"
                >
                  Open in Google Maps
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="border-t border-green-100 pt-5">
                <h4 className="font-bold text-green-950">
                  Consultation Timings
                </h4>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {clinic.timings.map((timing) => (
                    <div
                      key={timing.label}
                      className="rounded-xl bg-green-50 p-4"
                    >
                      <p className="text-sm text-green-700">
                        {timing.label}
                      </p>

                      <p className="mt-1 text-sm font-bold text-green-950">
                        {timing.display}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {(clinic.phone || clinic.email) && (
                <div className="space-y-3 border-t border-green-100 pt-5">
                  {clinic.phone && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Call Our Clinic
                      </p>

                      <a
                        href={`tel:${clinic.phone.replace(/[^\d+]/g, "")}`}
                        className="mt-1 inline-block font-semibold text-green-800"
                      >
                        {clinic.phone}
                      </a>
                    </div>
                  )}

                  {clinic.email && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Email
                      </p>

                      <a
                        href={`mailto:${clinic.email}`}
                        className="mt-1 inline-block break-all text-sm font-semibold text-green-800"
                      >
                        {clinic.email}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width map */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-green-100 px-6 py-5">
            <div>
              <h3 className="text-lg font-bold text-green-950">
                Find Your Way to Us
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Sector 44, Noida
              </p>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-800 hover:bg-green-100"
            >
              View Map ↗
            </a>
          </div>

          <iframe
            title={`${clinic.name} location map`}
            src={mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-72 w-full border-0 sm:h-96"
          />
        </div>
      </div>
      <AppointmentPopup
        open={popupOpen}
        onDone={handleDone}
        submitted={true}
      />
    </section>
  );
}