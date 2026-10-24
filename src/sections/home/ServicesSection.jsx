import { Link } from "react-router-dom";
import { useServices  } from "../../../src/context/ServicesContext";

export default function ServicesSection() {
  const {services} = useServices();
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-green-50/70 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
            Our Services
          </p>

          <h2
            id="services-title"
            className="mt-3 text-3xl font-bold tracking-tight text-green-950 sm:text-4xl"
          >
            Care built around your needs
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Explore consultation topics and find out more
            before planning your visit.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="group flex flex-col rounded-3xl border border-green-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl hover:shadow-green-900/5 motion-reduce:transform-none sm:p-7"
            >
              <div className="flex items-center justify-between gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-lg font-bold text-green-700 transition-colors group-hover:bg-green-700 group-hover:text-white"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
                  {service.category}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold leading-snug text-green-950">
                <Link
                  to={`/services/${service.id}`}
                  className="rounded focus-visible:outline-2 focus-visible:outline-green-700"
                >
                  {service.title}
                </Link>
              </h3>

              <p className="mb-6 mt-3 text-sm leading-7 text-slate-600">
                {service.summary}
              </p>

              <Link
                to={`/services/${service.id}`}
                aria-label={`Read more about ${service.title}`}
                className="mt-auto inline-flex items-center justify-between gap-3 border-t border-green-100 pt-4 text-sm font-bold text-green-700 hover:text-green-950 focus-visible:outline-2 focus-visible:outline-green-700"
              >
                Read More

                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50"
                >
                  ↗
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}