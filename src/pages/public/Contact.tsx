import { useState } from "react";
import Button from "../../components/Button";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
            Contact
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Let's start a conversation.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold">Get in touch</h2>

          <p className="mt-5 leading-8 text-slate-600">
            Tell us about your idea, business requirement or technology
            challenge. Our team will get back to you.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="text-sm font-semibold text-slate-500">Email</p>
              <p className="mt-1 font-medium">hello@novatech.com</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">Phone</p>
              <p className="mt-1 font-medium">+91 98765 43210</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-500">Office</p>
              <p className="mt-1 font-medium">Kochi, Kerala, India</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
        >
          {submitted && (
            <div className="mb-6 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
              Thank you! Your message has been submitted.
            </div>
          )}

          <div className="space-y-5">
            <input
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />

            <input
              required
              type="email"
              placeholder="Email address"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />

            <input
              required
              placeholder="Subject"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />

            <textarea
              required
              rows={6}
              placeholder="Tell us about your requirement..."
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-900"
            />

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}