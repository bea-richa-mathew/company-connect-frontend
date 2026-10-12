import { Link } from "react-router-dom";
import Announcements from "../../components/Announcements";

export default function Home() {
  return (
    
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-between gap-12 bg-black px-8 py-20 lg:flex-row">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-extrabold tracking-widest text-cyan-400 uppercase">
            WELCOME TO PINNACLE SMART TECHNOLOGIES
          </p>

          <h1 className="mb-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Build the future with a company that values{" "}
            <span className="text-cyan-300">
              people and innovation.
            </span>
          </h1>

          <p className="max-w-xl text-lg text-slate-200">
            Discover our services, explore career opportunities, and access your employee
            workspace from one secure portal.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/careers"
              className="rounded-lg border border-cyan-400 bg-cyan-500/20 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
            >
              Explore Careers
            </Link>

            <Link
              to="/about"
              className="rounded-lg border border-slate-700 bg-zinc-900 px-5 py-3 font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Learn About Us
            </Link>
          </div>
        </div>

        {/* Feature Card */}
        <div className="max-w-sm rounded-2xl border border-cyan-500/40 bg-zinc-900/90 p-8 text-white">
          <div className="mb-4 text-4xl text-cyan-300">
            ✦
          </div>
          <h3 className="mb-2 text-2xl font-bold text-white">One connected workplace</h3>
          <p className="text-slate-300">
            Recruitment, employee services, and company information in one place.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <div className="mb-8">
          <p className="mb-3 text-xs font-extrabold tracking-widest text-cyan-400 uppercase">
            WHAT WE DO
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Technology with purpose
          </h2>
          <p className="mt-2 text-slate-300">
            We create digital solutions that help organizations work smarter.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 transition hover:border-cyan-400">
            <span className="text-2xl text-cyan-300">
              ❖
            </span>
            <h3 className="mt-4 text-xl font-bold text-white">Web Development</h3>
            <p className="mt-2 text-slate-300">
              Modern, scalable, and responsive web applications.
            </p>
          </article>

          <article className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 transition hover:border-cyan-400">
            <span className="text-2xl text-cyan-300">
              ⌘
            </span>
            <h3 className="mt-4 text-xl font-bold text-white">Cloud Solutions</h3>
            <p className="mt-2 text-slate-300">
              Secure cloud infrastructure and deployment workflows.
            </p>
          </article>

          <article className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 transition hover:border-cyan-400">
            <span className="text-2xl text-cyan-300">
              ⚙
            </span>
            <h3 className="mt-4 text-xl font-bold text-white">Business Solutions</h3>
            <p className="mt-2 text-slate-300">
              Connected tools for productivity and business growth.
            </p>
          </article>
        </div>
      </section>

      {/* Announcements Section */}
      <Announcements />


      {/* CTA Section */}
      <section className="border-t border-zinc-800 bg-slate-900 px-6 py-16 text-center text-white">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to grow with us?
        </h2>
        <p className="mt-3 text-slate-300">
          Explore open positions and become part of our team.
        </p>
        <Link
          to="/careers"
          className="mt-6 inline-flex rounded-lg border border-cyan-400 bg-cyan-500/20 px-6 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-black"
        >
          View Openings
        </Link>
      </section>
    </div>
  );
}