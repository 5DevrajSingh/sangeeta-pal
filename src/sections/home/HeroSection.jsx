import { useClinic } from "../../../src/context/ClinicContext";

export default function HeroSection() {
    const {clinic} = useClinic();
    return (
        <section
            aria-labelledby="hero-title"
            className="relative isolate overflow-hidden bg-green-50"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
                {/* Content */}
                <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-800">
                        <span
                            aria-hidden="true"
                            className="h-2 w-2 rounded-full bg-green-600"
                        />
                        Welcome to {clinic.name}
                    </span>

                    <h1
                        id="hero-title"
                        className="mt-6 text-4xl font-bold leading-tight tracking-tight text-green-950 sm:text-5xl lg:text-6xl"
                    >
                        Caring for your health.
                        <span className="mt-2 block text-green-700">
                            With care that listens.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
                        Visit {clinic.name} in Sector 44, Noida, for a
                        consultation with {clinic.doctor.name}. Find a
                        convenient time for your visit with our morning
                        and evening consultation hours.
                    </p>

                    <div className="mt-6 border-l-4 border-green-600 pl-4">
                        <p className="text-lg font-bold text-green-950">
                            {clinic.doctor.name}
                        </p>

                        <p className="mt-1 text-sm font-medium text-slate-600">
                            {clinic.doctor.qualification}
                        </p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href="#appointment"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
                        >
                            Book Appointment
                            <span aria-hidden="true">→</span>
                        </a>

                        <a
                            href="#contact"
                            className="inline-flex min-h-12 items-center justify-center rounded-full border border-green-300 bg-white px-6 py-3 text-sm font-semibold text-green-900 transition-colors hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
                        >
                            Find Our Clinic
                        </a>
                    </div>

                    <p className="mt-6 text-sm leading-6 text-slate-500">
                        {clinic.address.line1}, {clinic.address.locality},{" "}
                        {clinic.address.city}
                    </p>
                </div>

                {/* Image and consultation timings */}
                <div className="relative">
                    <div
                        aria-hidden="true"
                        className="absolute -right-6 -top-6 -z-10 h-48 w-48 rounded-full bg-green-200/60 sm:h-64 sm:w-64"
                    />

                    <div className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-xl shadow-green-900/10">
                        <img
                            src="/assets/img/doctors-4.jpg"
                            alt="Healthcare setting"
                            fetchPriority="high"
                            className="block h-auto w-full"
                        />

                        <div className="p-5 sm:p-6">
                            <h2 className="text-lg font-bold text-green-950">
                                Consultation Timings
                            </h2>

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {clinic.timings.map((timing) => (
                                    <div
                                        key={timing.label}
                                        className="rounded-2xl border border-green-100 bg-green-50 p-4"
                                    >
                                        <p className="text-sm font-medium text-green-700">
                                            {timing.label}
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-green-950 sm:text-base">
                                            {timing.display}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}