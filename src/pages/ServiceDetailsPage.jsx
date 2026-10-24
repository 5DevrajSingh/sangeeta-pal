import { Link, useParams } from "react-router-dom";

import { clinic } from "../config/clinic";
import { services } from "../config/services";

export default function ServiceDetailsPage() {
  const { serviceId } = useParams();

  const service = services.find(
    (item) => item.id === serviceId
  );

  if (!service) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-green-950">
          Service not found
        </h1>

        <Link
          to="/#services"
          className="mt-6 inline-block font-semibold text-green-700 underline"
        >
          Back to services
        </Link>
      </main>
    );
  }

  return (
    <main>
      {/* Page banner */}
      <section className="relative isolate overflow-hidden bg-green-950">
        <img
          src="/assets/img/about.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15"
        />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-green-100"
          >
            <Link to="/" className="hover:underline">
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link to="/#services" className="hover:underline">
              Services
            </Link>

            <span aria-hidden="true">/</span>

            <span aria-current="page">{service.title}</span>
          </nav>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-green-300">
            {service.category}
          </p>

          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-5xl">
            {service.title}
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-green-50">
            {service.summary}
          </p>
        </div>
      </section>

      {/* Page content */}
      <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8 lg:py-16">
        <article className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-green-700">
            Consultation Overview
          </p>

          <h2 className="mt-3 text-2xl font-bold text-green-950 sm:text-3xl">
            About {service.title}
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {service.introduction}
          </p>

          <section className="mt-8 rounded-3xl border border-green-100 bg-green-50/70 p-6 sm:p-8">
            <h3 className="text-xl font-bold text-green-950">
              What you can discuss
            </h3>

            <ul className="mt-5 space-y-4">
              {service.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-700 text-xs text-white"
                  >
                    ✓
                  </span>

                  <span className="text-sm leading-7 text-slate-700">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="text-xl font-bold text-green-950">
              Plan your consultation
            </h3>

            <p className="mt-3 leading-7 text-slate-600">
              Contact {clinic.name} to confirm service
              availability and consultation arrangements.
              Bring any previous reports and prescriptions
              relevant to your visit.
            </p>
          </section>

          <Link
            to="/#contact"
            className="mt-7 inline-flex rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            Contact Our Clinic →
          </Link>
        </article>

        {/* Sidebar */}
        <aside
          aria-label="Other services and clinic information"
          className="space-y-6"
        >
          <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-green-950">
              Explore Services
            </h2>

            <nav aria-label="Services" className="mt-4 space-y-2">
              {services.map((item) => {
                const active = item.id === service.id;

                return (
                  <Link
                    key={item.id}
                    to={`/services/${item.id}`}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-green-700 text-white"
                        : "bg-green-50 text-slate-700 hover:bg-green-100"
                    }`}
                  >
                    {item.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="rounded-3xl bg-green-950 p-6 text-white">
            <h2 className="text-lg font-bold">
              Consultation Timings
            </h2>

            <div className="mt-5 space-y-4">
              {clinic.timings.map((timing) => (
                <div key={timing.label}>
                  <p className="text-sm text-green-200">
                    {timing.label}
                  </p>

                  <p className="mt-1 font-semibold">
                    {timing.display}
                  </p>
                </div>
              ))}
            </div>

            <address className="mt-6 border-t border-white/15 pt-5 text-sm not-italic leading-7 text-green-100">
              {clinic.address.line1}
              <br />
              {clinic.address.locality}, {clinic.address.city}
            </address>
          </div>
        </aside>
      </div>
    </main>
  );
}