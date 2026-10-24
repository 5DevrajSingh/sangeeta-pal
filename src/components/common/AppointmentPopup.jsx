import { useEffect, useRef } from "react";

const colors = ["#15803d", "#86efac", "#facc15", "#38bdf8", "#fb7185"];

export default function AppointmentPopup({
  open,
  onDone,
  submitted = false,
  title,
  message,
}) {
  const dialogRef = useRef(null);
  const doneRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (open && !dialog.open) {
      dialog.showModal();
      doneRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="appointment-popup-title"
      aria-describedby="appointment-popup-message"
      onCancel={(event) => {
        event.preventDefault();
        onDone();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-3xl border-0 bg-white p-0 shadow-2xl backdrop:bg-green-950/50 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="relative isolate overflow-hidden px-6 py-10 text-center sm:px-9">
          {/* Paper confetti animation */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {Array.from({ length: 32 }, (_, index) => (
              <span
                key={index}
                className="appointment-confetti absolute -top-6 h-3 w-2 rounded-[2px]"
                style={{
                  left: `${(index * 17) % 100}%`,
                  backgroundColor: colors[index % colors.length],
                  animationDelay: `${(index % 8) * 0.1}s`,
                  animationDuration: `${1.8 + (index % 5) * 0.2}s`,
                  "--drift": `${(index % 2 ? 1 : -1) * 65}px`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </div>

            <h2
              id="appointment-popup-title"
              className="mt-6 text-2xl font-bold text-green-950"
            >
              {title ?? (submitted ? "Request Received!" : "Thank You!")}
            </h2>

            <p
              id="appointment-popup-message"
              className="mt-3 text-sm leading-7 text-slate-600"
            >
              {message ??
                (submitted
                  ? "Your appointment request has been sent. Your appointment will be confirmed by the clinic."
                  : "This is a booking preview. Online booking is being set up; your request has not been sent.")}
            </p>

            <button
              ref={doneRef}
              type="button"
              onClick={onDone}
              className="mx-auto mt-7 inline-flex min-h-12 min-w-40 items-center justify-center rounded-full bg-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}