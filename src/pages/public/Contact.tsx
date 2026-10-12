import { useState, type FormEvent } from "react";

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

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-8 py-20">
      <div className="mb-8">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
          CONTACT US
        </p>
        <h1 className="text-4xl font-extrabold">Let’s start a conversation</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[14px] border border-[#e2e7f0] bg-white p-7 shadow-sm">
          <h2>Get in touch</h2>
          <p className="text-[#6d7890]">
            Have a question about our services, careers, or employee portal?
          </p>
          <p><strong>Email:</strong> hello@company.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Office:</strong> Kochi, Kerala, India</p>
        </div>

        <form
          className="grid gap-4 rounded-[14px] border border-[#e2e7f0] bg-white p-7 shadow-sm"
          onSubmit={submit}
        >
          <label>
            Name
            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Message
            <textarea
              className="mt-1 w-full resize-y rounded-lg border border-[#d7deea] px-3 py-3"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#3155d9] px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {sent && (
            <p className="rounded-lg bg-[#e7f8ef] p-3 text-[#167044]">
              Message submitted successfully.
            </p>
          )}

          {error && (
            <p className="rounded-lg bg-[#fde8e8] p-3 text-[#9b1c1c]">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}