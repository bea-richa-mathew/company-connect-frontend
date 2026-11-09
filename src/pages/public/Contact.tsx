import { useState, type FormEvent } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-100 dark:placeholder:text-zinc-500";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send message"
        );
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] px-5 py-14 text-slate-900 transition-colors duration-200 dark:bg-[#08090d] dark:text-gray-100 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-extrabold tracking-[.18em] text-indigo-600 dark:text-cyan-400">
            CONTACT US
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Let’s start a conversation
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-zinc-400">
            Have a question about our services, careers, or employee
            portal? Send us a message and we’ll be happy to hear from you.
          </p>
        </header>

        <div className="grid items-start gap-7 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#111218] sm:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl text-indigo-600 dark:bg-cyan-400/10 dark:text-cyan-400">
              ✦
            </div>

            <h2 className="text-xl font-bold">
              Get in touch
            </h2>

            <p className="mt-3 leading-7 text-slate-600 dark:text-zinc-400">
              Contact our team for questions about company services,
              career opportunities, or the employee portal.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-zinc-500">
                  EMAIL
                </p>
                <p className="mt-1 overflow-wrap-anywhere font-medium">
                  hello@company.com
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-zinc-500">
                  PHONE
                </p>
                <p className="mt-1 font-medium">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-zinc-500">
                  OFFICE
                </p>
                <p className="mt-1 font-medium">
                  Kochi, Kerala, India
                </p>
              </div>
            </div>
          </section>

          <form
            onSubmit={submit}
            className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-[#111218] sm:p-8"
          >
            <div>
              <h2 className="text-xl font-bold">
                Send us a message
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">
                Fill in the details below.
              </p>
            </div>

            <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300">
              Full Name
              <input
                className={inputClass}
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300">
              Email Address
              <input
                className={inputClass}
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700 dark:text-zinc-300">
              Message
              <textarea
                className={`${inputClass} min-h-36 resize-y`}
                rows={5}
                placeholder="How can we help you?"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
            </label>

            {sent && (
              <p
                role="status"
                className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
              >
                Your message was submitted successfully.
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}