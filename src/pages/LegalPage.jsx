import { Link } from "react-router-dom";

export default function LegalPage({ title }) {
    return (
        <main className="bg-green-50/50 px-4 py-16">
            <div className="mx-auto max-w-3xl rounded-3xl border border-green-100 bg-white p-6 sm:p-10">
                <h1 className="text-3xl font-bold text-green-950">
                    {title}
                </h1>

                <p className="mt-5 leading-7 text-slate-600">
                    This page is being prepared. Please contact
                    NOVA Health Care with any questions.
                </p>

                <Link
                    to="/#contact"
                    className="mt-6 inline-block font-semibold text-green-700 underline"
                >
                    Contact the clinic
                </Link>
            </div>
        </main>
    );
}