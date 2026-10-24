import { Link } from "react-router-dom";
import { useClinic } from "../../../src/context/ClinicContext";
import { doctors } from "../../config/doctors";

export default function AboutSection() {
  const {clinic} = useClinic();
  return (
    <section id="about" aria-labelledby="about-title">
      <div
        id="doctor"
        className="bg-white px-4 py-10 text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
          About Our Doctors
        </p>

        <h2
          id="about-title"
          className="mt-3 text-3xl font-bold text-green-950 sm:text-4xl"
        >
          Meet the people behind your care
        </h2>
      </div>

      {doctors.map((doctor, index) => {
        const reversed = index % 2 !== 0;

        return (
          <article
            key={doctor.id}
            aria-labelledby={`${doctor.id}-name`}
            className="relative isolate overflow-hidden border-t border-green-100"
          >
            {/* Background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <img
                src={
                  doctor.backgroundImage ||
                  "/assets/img/about.jpg"
                }
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-115 object-cover blur-[3px]"
              />

              <div className="absolute inset-0 bg-white/60" />
            </div>

            <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-12">
              {/* Existing photo size and style */}
              <figure
                className={`mx-auto w-full max-w-md ${
                  reversed ? "lg:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg shadow-green-950/5">
                  <img
                    src={doctor.image}
                    alt={doctor.imageAlt || doctor.name}
                    loading="lazy"
                    decoding="async"
                    className="h-[340px] w-full bg-green-50/60 object-contain object-bottom sm:h-[440px]"
                  />

                  <figcaption className="border-t border-green-100 px-5 py-4">
                    <p className="font-bold text-green-950">
                      {doctor.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {doctor.qualification}
                    </p>
                  </figcaption>
                </div>
              </figure>

              {/* Short introduction */}
              <div className={reversed ? "lg:order-1" : ""}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                  {clinic.name}
                </p>

                <h3
                  id={`${doctor.id}-name`}
                  className="mt-3 text-3xl font-bold text-green-950 sm:text-4xl"
                >
                  {doctor.name}
                </h3>

                <p className="mt-2 font-semibold text-green-700">
                  {doctor.qualification}
                </p>

                {doctor.subtitle && (
                  <p className="mt-4 font-medium leading-6 text-green-800">
                    {doctor.subtitle}
                  </p>
                )}

                <p className="mt-3 max-w-xl text-[15px] leading-6 text-slate-700">
                  {doctor.shortDescription ||
                    `Meet ${doctor.name} at ${clinic.name} in ${clinic.address.locality}, ${clinic.address.city}. Learn more about the doctor's background and consultation details.`}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/doctors/${doctor.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
                  >
                    View Full Profile
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    to="/#appointment"
                    className="inline-flex items-center justify-center rounded-full border border-green-300 bg-white px-6 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}