import { Link } from "react-router-dom";

import GallerySlider from "../components/common/GallerySlider";
import { galleryImages } from "../config/gallery";

export default function GalleryPage() {
    return (
        <main>
            <section className="relative isolate overflow-hidden bg-green-50">
                <img
                    src="/images/doctor-banner.jpg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right blur-[2px]"
                />

                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-white/75"
                />

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <nav
                        aria-label="Breadcrumb"
                        className="text-sm text-slate-600"
                    >
                        <Link to="/" className="hover:text-green-700">
                            Home
                        </Link>

                        <span className="mx-2" aria-hidden="true">
                            /
                        </span>

                        <span aria-current="page">Gallery</span>
                    </nav>

                    <h1 className="mt-5 text-3xl font-bold text-green-950 sm:text-4xl">
                        Our Gallery
                    </h1>

                    <p className="mt-3 text-slate-600">
                        A closer look at NOVA Health Care.
                    </p>
                </div>
            </section>

            <GallerySlider showViewAll={false} />

            <section
                aria-labelledby="all-photos-title"
                className="bg-green-50/60 py-12"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2
                        id="all-photos-title"
                        className="mb-6 text-2xl font-bold text-green-950"
                    >
                        All Photos
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {galleryImages.map((image) => (
                            <img
                                key={image.id}
                                src={image.src}
                                alt={image.alt}
                                loading="lazy"
                                className="h-64 w-full rounded-2xl border border-green-100 object-cover"
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}