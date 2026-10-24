import { Link } from "react-router-dom";
import { community } from "../../config/community";
import { useState } from "react";
import ReviewForm from "../../components/common/ReviewForm";
import AppointmentPopup from "../../components/common/AppointmentPopup";

export default function PatientStoriesSection() {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewComplete, setReviewComplete] = useState(false);
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative isolate overflow-hidden bg-green-50 py-14 sm:py-20"
    >
      {/* Full-width background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <img
          src={community.backgroundImage}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 object-cover blur-[1px]"
        />

        <div className="absolute inset-0 bg-white/80" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Statistics */}
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {community.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-green-200/70 bg-white/75 px-4 py-7 text-center shadow-sm backdrop-blur-sm"
            >
              <dt className="text-xs font-medium text-slate-600 sm:text-sm">
                {stat.label}
              </dt>

              <dd className="mt-3 text-3xl font-bold text-green-800 sm:text-4xl">
                {stat.value ?? "—"}
              </dd>

              {stat.value == null && (
                <p className="mt-2 text-xs text-slate-500">
                  Details coming soon
                </p>
              )}
            </div>
          ))}
        </dl>

        {/* Reviews */}
        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-700">
            Patient Experiences
          </p>

          <h2
            id="reviews-title"
            className="mt-3 text-3xl font-bold text-green-950 sm:text-4xl"
          >
            Your experience matters
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Stories and feedback from the people we care for.
          </p>
        </div>

        {community.reviews.length > 0 ? (
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {community.reviews.map((review) => (
              <figure
                key={review.id}
                className="relative isolate flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-green-950 p-6 shadow-xl shadow-black/10 sm:p-7"
              >
                {/* Background image */}
                {review.image && (
                  <img
                    src={review.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="pointer-events-none absolute inset-0 -z-20 h-full w-full scale-105 object-cover blur-[0.5px]"
                  />
                )}

                {/* Transparent green shade */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-green-950/60"
                />

                <span
                  aria-hidden="true"
                  className="text-5xl leading-none text-green-300"
                >
                  “
                </span>

                <blockquote className="mb-6 mt-2 text-sm leading-7 text-white">
                  {review.text}
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3 border-t border-white/20 pt-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 font-bold text-green-100"
                  >
                    {review.name.slice(0, 1)}
                  </span>

                  <span className="font-semibold text-white">
                    {review.name}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-green-200 bg-white/75 p-7 text-center shadow-sm">
            <p className="leading-7 text-slate-600">
              Patient stories will be shared here soon.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setReviewOpen(true)}
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-green-900 hover:bg-green-50"
          >
            Write a Review ✍
          </button>

          {community.reviewsUrl && (
            <a
              href={community.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Read More Reviews ↗
            </a>
          )}
        </div>

        <ReviewForm
          open={reviewOpen}
          onClose={() => setReviewOpen(false)}
          onComplete={() => {
            setReviewOpen(false);
            setReviewComplete(true);
          }}
        />

        <AppointmentPopup
          open={reviewComplete}
          onDone={() => setReviewComplete(false)}
          title="Thank You for Your Feedback!"
          message="This is a preview. Your review has not been sent yet."
        />
      </div>
    </section>
  );
}