import {useClinic} from "../../../src/context/ClinicContext";

export default function DoctorIntroSection() {
    const {clinic} = useClinic();
    return (
        <section
            id="about"
            aria-labelledby="intro-title"
            className="overflow-hidden border-b border-slate-100 bg-white"
        >
            <div className="relative mx-auto max-w-[1440px] px-4 pt-12 sm:px-6 lg:flex lg:min-h-[520px] lg:items-center lg:px-8 lg:py-16">
                {/* Left doctor photo */}
                <img
                    src="/assets/img/doctors-1.jpg"
                    alt=""
                    loading="lazy"
                    className="pointer-events-none relative z-0 mx-auto hidden lg:absolute lg:bottom-0 lg:left-0 lg:block lg:h-[490px] lg:w-[32%] lg:object-contain lg:object-bottom"
                />

                {/* Center text appears above the photos */}
                <div className="relative z-10 mx-auto w-full text-center lg:w-[66%]">
                    <h2
                        id="intro-title"
                        className="text-2xl font-bold uppercase leading-snug text-slate-800 sm:text-3xl lg:text-4xl"
                    >
                        Welcome to{" "}
                        <span className="text-green-700">
                            {clinic.name}
                        </span>
                    </h2>

                    <p className="mt-3 text-base font-semibold uppercase tracking-wide text-slate-500 sm:text-lg">
                        Thoughtful care for your health
                    </p>

                    <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-slate-600">
                        At {clinic.name}, your health concerns deserve
                        time, attention and understanding. Visit{" "}
                        {clinic.doctor.name} ({clinic.doctor.qualification}){" "}
                        at our clinic in {clinic.address.locality},{" "}
                        {clinic.address.city}, for a consultation.
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-500">
                        Morning: {clinic.timings[0].display}
                        <span className="mx-3 text-green-300">|</span>
                        Evening: {clinic.timings[1].display}
                    </p>

                    <a
                        href="#appointment"
                        className="mt-6 inline-flex rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
                    >
                        Book Appointment
                    </a>
                </div>

                {/* Right doctor photo */}
                <img
                    src="/assets/img/doctors-4.jpg"
                    alt=""
                    loading="lazy"
                    className="pointer-events-none relative z-0 hidden lg:absolute lg:bottom-0 lg:right-0 lg:block lg:h-[490px] lg:w-[32%] lg:object-contain lg:object-bottom"
                />

                {/* Mobile photos */}
                <div
                    aria-hidden="true"
                    className="mt-8 grid grid-cols-2 items-end gap-2 lg:hidden"
                >
                    <img
                        src="/assets/img/doctors-1.jpg"
                        alt=""
                        loading="lazy"
                        className="h-56 w-full object-contain object-bottom sm:h-72"
                    />

                    <img
                        src="/assets/img/doctors-3.jpg"
                        alt=""
                        loading="lazy"
                        className="h-56 w-full object-contain object-bottom sm:h-72"
                    />
                </div>
            </div>
        </section>
    );
}