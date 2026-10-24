import { useEffect, useId, useRef, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  content: "",
};

function countWords(text) {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

export default function ReviewForm({ open, onClose, onComplete }) {
  const dialogRef = useRef(null);
  const fileRef = useRef(null);
  const titleId = useId();
  const contentId = useId();

  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const words = countWords(form.content);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setNotice("");
  }

  function handleImage(event) {
    const file = event.target.files?.[0];

    setError("");
    setNotice("");

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please choose a JPG, PNG or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be 2 MB or less.");
      event.target.value = "";
      return;
    }

    setImage(file);
  }

  function removeImage() {
    setImage(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  }

  function handleSubmit(event) {
  event.preventDefault();
  setError("");
  setNotice("");

  if (!form.name.trim()) {
    setError("Please enter your name.");
    return;
  }

  if (words < 50) {
    setError("Please write at least 50 words.");
    return;
  }

  // Abhi preview. API integration ke baad ye actions
  // successful response milne par run karenge.

  event.currentTarget.reset(); // Consent checkbox clear
  setForm(initialForm);
  removeImage();

  onClose();       // Review dialog close
  onComplete?.(); // Party-paper popup open
}

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl border-0 bg-white p-0 shadow-2xl backdrop:bg-green-950/60 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-start justify-between gap-4 bg-green-900 p-6 text-white">
        <div>
          <h2 id={titleId} className="text-2xl font-bold">
            Share Your Experience
          </h2>

          <p className="mt-2 text-sm text-green-100">
            We would love to hear your feedback.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close review form"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-2xl hover:bg-white/20"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        <label className="block text-sm font-semibold text-slate-700">
          Your Name *
          <input
            autoFocus
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            maxLength={100}
            required
            placeholder="Enter your name"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Email Address *
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={254}
            required
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />
          <span className="mt-1 block text-xs font-normal text-slate-500">
            Your email will not be displayed with your review.
          </span>
        </label>

        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Your Photo (optional)
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImage}
              className="mt-2 block w-full rounded-xl border border-slate-200 p-3 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-green-50 file:px-3 file:py-2 file:font-semibold file:text-green-800"
            />
          </label>

          <p className="mt-2 text-xs text-slate-500">
            JPG, PNG or WebP. Maximum 2 MB.
          </p>

          {preview && (
            <div className="mt-3 flex items-center gap-4">
              <img
                src={preview}
                alt="Your selected photo"
                className="h-16 w-16 rounded-full object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="text-sm font-semibold text-red-600 hover:underline"
              >
                Remove photo
              </button>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor={contentId}
            className="block text-sm font-semibold text-slate-700"
          >
            Your Review *
          </label>

          <textarea
            id={contentId}
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={6}
            maxLength={10000}
            aria-describedby={`${contentId}-count`}
            placeholder="Tell us about your experience in at least 50 words..."
            className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />

          <p
            id={`${contentId}-count`}
            className={`mt-1 text-right text-xs ${
              words >= 50 ? "text-green-700" : "text-slate-500"
            }`}
          >
            {words} words · Minimum 50
          </p>
        </div>

        <label className="flex items-start gap-3 text-xs leading-6 text-slate-600">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-green-700"
          />
          <span>
            I agree that my name, review and selected photo may
            be displayed on this website.
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}

        {notice && (
          <p
            role="status"
            className="rounded-xl bg-green-50 p-4 text-sm leading-6 text-green-900"
          >
            {notice}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
        >
          Submit Review
        </button>

        <p className="text-center text-xs text-slate-500">
          Online review submission is coming soon.
        </p>
      </form>
    </dialog>
  );
}