import { useEffect, useRef, useState } from "react";
import { clinic } from "../../config/clinic";

import { Link } from "react-router-dom";

const navigation = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Doctor", href: "/#doctor" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");

    function handleResize(event) {
      if (event.matches) setMenuOpen(false);
    }

    desktop.addEventListener("change", handleResize);

    return () => {
      desktop.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
  function handleScroll() {
    const scrollY = Math.max(0, window.scrollY);

    setCompact((previous) => {
      // Top ke paas aane par normal header.
      if (scrollY <= 5) return false;

      // Thoda scroll hone par compact header.
      if (scrollY >= 80) return true;

      // Beech mein previous state rakhein, flicker nahi hoga.
      return previous;
    });
  }

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Clinic information */}
      <div
        aria-hidden={compact}
        className={`grid bg-green-900 text-green-50 transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none ${compact
          ? "grid-rows-[0fr] opacity-0"
          : "grid-rows-[1fr] opacity-100"
          }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 text-xs sm:justify-between sm:px-6 sm:text-sm lg:px-8">
            <span>
              {[clinic.address.locality, clinic.address.city]
                .filter(Boolean)
                .join(", ")}
            </span>

            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              {clinic.timings.map((timing) => (
                <span key={timing.label}>
                  <span className="text-green-200">
                    {timing.label}:
                  </span>{" "}
                  {timing.display}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 motion-reduce:transition-none sm:px-6 lg:px-8 ${compact ? "py-1" : "py-3"
          }`}
      >
        <a
          href="#home"
          onClick={closeMenu}
          aria-label={`${clinic.name} home`}
          className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
        >
          <img
            src={clinic.logo}
            alt={clinic.name}
            className={`object-contain transition-[height,width] duration-300 motion-reduce:transition-none ${compact
                ? "h-10 w-28 sm:h-11 sm:w-36"
                : "h-12 w-36 sm:h-16 sm:w-48"
              }`}
          />
        </a>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-green-50 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-green-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#appointment"
            onClick={closeMenu}
            className="hidden rounded-full bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700 sm:inline-flex"
          >
            Book Appointment
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-green-200 text-green-900 transition-colors hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-green-700 lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="m6 6 12 12M6 18 18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="border-t border-green-100 bg-white px-4 pb-5 pt-3 lg:hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-green-50 hover:text-green-800 focus-visible:outline-2 focus-visible:outline-green-700"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#appointment"
            onClick={closeMenu}
            className="mt-3 rounded-xl bg-green-700 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
          >
            Book Appointment
          </a>
        </div>
      </nav>
    </header>
  );
}