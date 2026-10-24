import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { galleryImages } from "../../config/gallery";

export default function GallerySlider({
    images = galleryImages,
    title = "Gallery at a Glance",
    showViewAll = true,
    id,
}) {
    const headingId = useId();
    const trackRef = useRef(null);

    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const query = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        function updatePreference() {
            setReducedMotion(query.matches);
        }

        updatePreference();
        query.addEventListener("change", updatePreference);

        return () => {
            query.removeEventListener("change", updatePreference);
        };
    }, []);

    function moveSlide(direction) {
        const track = trackRef.current;
        const firstSlide = track?.firstElementChild;

        if (!track || !firstSlide) return;

        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        const step = firstSlide.getBoundingClientRect().width + gap;
        const maxScroll = track.scrollWidth - track.clientWidth;

        if (maxScroll <= 1) return;

        const atEnd = track.scrollLeft >= maxScroll - 2;
        const atStart = track.scrollLeft <= 2;

        let nextPosition = track.scrollLeft + direction * step;

        if (direction > 0 && atEnd) nextPosition = 0;
        if (direction < 0 && atStart) nextPosition = maxScroll;

        track.scrollTo({
            left: Math.max(0, Math.min(nextPosition, maxScroll)),
            behavior: reducedMotion ? "instant" : "smooth",
        });
    }

    useEffect(() => {
        if (
            paused ||
            hovered ||
            focused ||
            reducedMotion ||
            images.length < 2
        ) {
            return;
        }

        const timer = window.setInterval(() => {
            if (document.hidden) return;

            const track = trackRef.current;
            const slide = track?.firstElementChild;

            if (!track || !slide) return;

            const maxScroll = track.scrollWidth - track.clientWidth;
            if (maxScroll <= 1) return;

            const gap =
                parseFloat(getComputedStyle(track).columnGap) || 0;

            const step = slide.getBoundingClientRect().width + gap;

            track.scrollTo({
                left:
                    track.scrollLeft >= maxScroll - 2
                        ? 0
                        : Math.min(track.scrollLeft + step, maxScroll),
                behavior: "smooth",
            });
        }, 3000);

        return () => window.clearInterval(timer);
    }, [
        paused,
        hovered,
        focused,
        reducedMotion,
        images.length,
    ]);

    if (!images.length) return null;

    return (
        <section
            id={id}
            aria-labelledby={headingId}
            aria-roledescription="carousel"
            className="bg-white py-12 sm:py-16"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocusCapture={() => setFocused(true)}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setFocused(false);
                }
            }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-end justify-between gap-5">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
                            NOVA Health Care
                        </p>

                        <h2
                            id={headingId}
                            className="mt-3 text-3xl font-bold tracking-tight text-green-950 sm:text-4xl"
                        >
                            {title}
                        </h2>
                    </div>

                    {showViewAll && (
                        <Link
                            to="/gallery"
                            className="rounded-full border border-green-200 px-5 py-2.5 text-sm font-semibold text-green-800 transition hover:bg-green-50"
                        >
                            View Full Gallery ↗
                        </Link>
                    )}
                </div>

                <div className="relative mt-8">
                    <div
                        ref={trackRef}
                        className="flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-2xl pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {images.map((image, index) => (
                            <figure
                                key={image.id}
                                aria-label={`${index + 1} of ${images.length}`}
                                className="w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-green-100 bg-green-50 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    loading="lazy"
                                    decoding="async"
                                    draggable={false}
                                    className="h-56 w-full object-cover sm:h-64"
                                />
                            </figure>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                        Swipe or use the arrows to explore.
                    </p>

                    <div className="flex items-center gap-2">
                        {!reducedMotion && (
                            <button
                                type="button"
                                onClick={() => setPaused((current) => !current)}
                                aria-label={
                                    paused
                                        ? "Start automatic gallery scrolling"
                                        : "Pause automatic gallery scrolling"
                                }
                                className="min-h-11 rounded-full px-4 text-xs font-semibold text-green-800 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-700"
                            >
                                {paused ? "Play" : "Pause"}
                            </button>
                        )}

                        {[-1, 1].map((direction) => (
                            <button
                                key={direction}
                                type="button"
                                onClick={() => moveSlide(direction)}
                                aria-label={
                                    direction < 0
                                        ? "Previous gallery image"
                                        : "Next gallery image"
                                }
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-xl text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                            >
                                <span aria-hidden="true">
                                    {direction < 0 ? "←" : "→"}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}