import { Link, useParams } from "react-router-dom";
import { clinic } from "../config/clinic";
import { doctors } from "../config/doctors";

export default function DoctorDetailsPage() {
  const { doctorId } = useParams();

  const doctor = doctors.find((item) => item.id === doctorId);

  if (!doctor) {
    return (
      <main className="px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-green-950">
          Doctor not found
        </h1>

        <Link
          to="/#about"
          className="mt-5 inline-block font-semibold text-green-700 underline"
        >
          Back to our doctors
        </Link>
      </main>
    );
  }

  const detailGroups = [
    {
      title: "Education & Qualifications",
      items: doctor.education,
    },
    {
      title: "Hospital Associations",
      items: doctor.associations,
    },
    {
      title: "Professional Memberships",
      items: doctor.memberships,
    },
    {
      title: "Achievements & Conferences",
      items: doctor.achievements,
      numbered: true,
    },
  ];

  return (
    <main>
      {/* Compact full-width banner */}
      <section className="relative isolate overflow-hidden bg-green-50">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <img
            src="/assets/img/hero-bg.jpg"
            alt=""
            className="h-full w-full scale-105 object-cover object-right blur-[2px]"
          />

          <div className="absolute inset-0 bg-white/25" />

          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
        </div>

        <div className="mx-auto flex min-h-[210px] max-w-7xl items-center px-4 py-8 sm:min-h-[250px] sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600"
            >
              <Link to="/" className="hover:text-green-700">
                Home
              </Link>

              <span aria-hidden="true">/</span>

              <Link
                to="/#about"
                className="hover:text-green-700"
              >
                Our Doctors
              </Link>

              <span aria-hidden="true">/</span>

              <span aria-current="page">{doctor.name}</span>
            </nav>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-green-700">
              {clinic.name}
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-green-950 sm:text-4xl">
              About {doctor.name}
            </h1>

            <p className="mt-2 font-semibold text-green-800">
              {doctor.qualification}
            </p>
          </div>
        </div>
      </section>

      {/* Doctor profile */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <article
          aria-labelledby="doctor-profile-title"
          className="flow-root"
        >
          {/* Small photo; long text continues below it */}
          <figure className="mx-auto mb-6 w-full max-w-[260px] sm:float-left sm:mb-5 sm:mr-8">
            <div className="overflow-hidden rounded-2xl border border-green-100 bg-green-50 shadow-sm">
              <img
                src={doctor.image}
                alt={doctor.imageAlt || doctor.name}
                loading="lazy"
                className="h-[290px] w-full object-contain object-bottom"
              />

              <figcaption className="border-t border-green-100 bg-white px-4 py-4">
                <p className="font-bold text-green-950">
                  {doctor.name}
                </p>

                <p className="mt-1 text-sm text-green-700">
                  {doctor.qualification}
                </p>
              </figcaption>
            </div>
          </figure>

          <h2
            id="doctor-profile-title"
            className="text-2xl font-bold leading-tight text-green-950 sm:text-3xl"
          >
            {doctor.introduction || doctor.name}
          </h2>

          {doctor.subtitle && (
            <p className="mt-2 font-medium leading-6 text-green-700">
              {doctor.subtitle}
            </p>
          )}

          <div className="mt-4 space-y-3">
            {doctor.paragraphs?.map((paragraph, index) => (
              <p
                key={`${doctor.id}-paragraph-${index}`}
                className="text-[15px] leading-6 text-slate-600"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {detailGroups.map(({ title, items, numbered }) => {
            if (!items?.length) return null;

            const List = numbered ? "ol" : "ul";

            return (
              <section key={title} className="mt-5">
                <h3 className="mb-2 text-lg font-bold leading-tight text-green-950">
                  {title}
                </h3>

                <List
                  className={`list-inside space-y-1 text-[15px] leading-6 text-slate-600 marker:font-semibold marker:text-green-700 ${
                    numbered ? "list-decimal" : "list-disc"
                  }`}
                >
                  {items.map((item, index) => (
                    <li key={`${doctor.id}-${title}-${index}`}>
                      {item}
                    </li>
                  ))}
                </List>
              </section>
            );
          })}
        </article>

        {/* Visit information */}
        <section
          aria-label="Plan your visit"
          className="mt-10 flex flex-col gap-6 rounded-2xl border border-green-100 bg-green-50 p-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2 className="text-lg font-bold text-green-950">
              Visit {clinic.name}
            </h2>

            <address className="mt-2 text-sm not-italic leading-6 text-slate-600">
              {clinic.address.line1},{" "}
              {clinic.address.locality},{" "}
              {clinic.address.city}
            </address>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {clinic.timings.map((timing) => (
                <p
                  key={timing.label}
                  className="text-sm text-slate-600"
                >
                  <strong className="text-green-800">
                    {timing.label}:
                  </strong>{" "}
                  {timing.display}
                </p>
              ))}
            </div>
          </div>

          <Link
            to="/#appointment"
            className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 lg:self-center"
          >
            Request Appointment
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </main>
  );
}