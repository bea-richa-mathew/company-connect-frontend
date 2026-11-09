import { Link } from "react-router-dom";
import Announcements from "../../components/Announcements";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#071426] text-white">

      {/* Hero Section */}
      <section className="relative border-b border-blue-200/10 bg-linear-to-br from-[#102947] via-[#091a30] to-[#071426]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 py-20 sm:px-8 sm:py-24 lg:flex-row lg:py-28">
          {/* Left Side */}
          <div className="max-w-2xl">
            <p className="mb-5 inline-block rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-300">
              Welcome to Pinnacle Smart Technologies
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build the future with a company that values{" "}
              <span className="bg-linear-to-r from-cyan-200 to-blue-400 bg-clip-text text-transparent">
                people and innovation.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100/70 sm:text-lg">
              Discover our services, explore company information, and access
              your employee workspace through one connected portal.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-bold text-[#071426] shadow-lg shadow-cyan-400/15 transition duration-300 hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-xl hover:shadow-cyan-400/25"
              >
                Explore Careers
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                to="/about"
                className="rounded-xl border border-blue-200/20 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-white/[0.08]"
              >
                Learn About Us
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100/70">
              <span>✓ Quality-focused solutions</span>
              <span>✓ People-first workplace</span>
            </div>
          </div>

          {/* Right Feature Card */}
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-cyan-300/20 bg-linear-to-br from-[#173453] via-[#10243b] to-[#0a182a] p-7 shadow-2xl shadow-black/40 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-cyan-950/30 sm:p-9">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-4xl text-cyan-300">
                ✦
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                Our Workplace
              </p>

              <h2 className="mt-3 text-2xl font-black leading-snug text-white sm:text-3xl">
                One connected workplace
              </h2>

              <p className="mt-4 text-sm leading-7 text-blue-100/70 sm:text-base">
                Recruitment, employee services, announcements, and company
                information brought together in one accessible portal.
              </p>

              <div className="mt-7 border-t border-white/10 pt-5">
                <p className="text-sm font-semibold text-cyan-200">
                  Technology, people, and progress.
                </p>
              </div>

              <Link
                to="/about"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-cyan-300"
              >
                Discover our company <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-300">
            What We Do
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Technology with purpose
          </h2>

          <p className="mt-4 leading-7 text-blue-100/60">
            Digital solutions that help organizations work smarter and
            support business growth.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="group rounded-2xl border border-blue-200/10 bg-linear-to-br from-[#142b47] to-[#0b1a2e] p-7 shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-2xl hover:shadow-blue-950/40 sm:p-8">
            <span className="text-2xl text-cyan-300">❖</span>

            <div className="mt-5 h-1 w-12 rounded-full bg-cyan-300 transition-all duration-300 group-hover:w-20" />

            <h3 className="mt-5 text-xl font-extrabold text-white">
              Web Development
            </h3>

            <p className="mt-3 text-sm leading-7 text-blue-100/65">
              Modern, scalable, and responsive web applications designed
              around business needs.
            </p>

            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition group-hover:gap-3"
            >
              Explore Services <span aria-hidden="true">→</span>
            </Link>
          </article>

          <article className="group rounded-2xl border border-blue-200/10 bg-linear-to-br from-[#142b47] to-[#0b1a2e] p-7 shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-2xl hover:shadow-blue-950/40 sm:p-8">
            <span className="text-2xl text-cyan-300">⌘</span>

            <div className="mt-5 h-1 w-12 rounded-full bg-cyan-300 transition-all duration-300 group-hover:w-20" />

            <h3 className="mt-5 text-xl font-extrabold text-white">
              Cloud Solutions
            </h3>

            <p className="mt-3 text-sm leading-7 text-blue-100/65">
              Cloud infrastructure and deployment workflows that support
              secure, reliable digital operations.
            </p>

            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition group-hover:gap-3"
            >
              Explore Services <span aria-hidden="true">→</span>
            </Link>
          </article>

          <article className="group rounded-2xl border border-blue-200/10 bg-linear-to-br from-[#142b47] to-[#0b1a2e] p-7 shadow-xl shadow-black/25 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:shadow-2xl hover:shadow-blue-950/40 sm:p-8">
            <span className="text-2xl text-cyan-300">⚙</span>

            <div className="mt-5 h-1 w-12 rounded-full bg-cyan-300 transition-all duration-300 group-hover:w-20" />

            <h3 className="mt-5 text-xl font-extrabold text-white">
              Business Solutions
            </h3>

            <p className="mt-3 text-sm leading-7 text-blue-100/65">
              Connected digital tools that simplify workflows and improve
              everyday productivity.
            </p>

            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300 transition group-hover:gap-3"
            >
              Explore Services <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="border-y border-blue-200/10 bg-linear-to-b from-[#0d2038] to-[#09172a]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-300">
              Our Approach
            </p>

            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              A workplace built around progress
            </h2>

            <p className="mt-4 leading-7 text-blue-100/60">
              We value collaboration, practical innovation, and reliable
              solutions that support people and business goals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-blue-200/10 bg-[#10243b]/80 p-7 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 text-xl text-cyan-300">
                ◎
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Collaboration
              </h3>

              <p className="mt-3 text-sm leading-7 text-blue-100/65">
                Encourage teamwork, communication, and shared progress
                across the workplace.
              </p>
            </article>

            <article className="rounded-2xl border border-blue-200/10 bg-[#10243b]/80 p-7 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 text-xl text-cyan-300">
                ✧
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Innovation
              </h3>

              <p className="mt-3 text-sm leading-7 text-blue-100/65">
                Embrace thoughtful ideas and modern technologies to solve
                everyday business challenges.
              </p>
            </article>

            <article className="rounded-2xl border border-blue-200/10 bg-[#10243b]/80 p-7 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 text-xl text-cyan-300">
                ✓
              </div>

              <h3 className="mt-5 text-lg font-extrabold">
                Quality and Reliability
              </h3>

              <p className="mt-3 text-sm leading-7 text-blue-100/65">
                Focus on dependable digital experiences and solutions
                designed around real requirements.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="relative border-b border-blue-200/10 bg-linear-to-b from-[#0d2038] to-[#09172a] py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-500/[0.08] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-9">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-300">
              Stay Connected
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Latest Announcements
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/60 sm:text-base">
              Stay informed about important company news, updates, and
              announcements.
            </p>
          </div>

          <div className="rounded-3xl border border-blue-200/15 bg-[#0b192b] p-3 shadow-2xl shadow-black/35 sm:p-6">
            <Announcements />
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="px-5 py-20 sm:px-8 sm:py-24">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cyan-300/20 bg-linear-to-br from-[#173453] via-[#10243b] to-[#0a182a] px-6 py-12 text-center shadow-2xl shadow-black/30 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-300/[0.08] blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-400/[0.08] blur-[70px]" />

          <div className="relative">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-300">
              Pinnacle Smart Technologies
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black leading-tight text-white sm:text-4xl">
              Ready to grow with us?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-blue-100/65 sm:text-base">
              Explore our company, discover our solutions, and stay connected
              with the latest updates.
            </p>

            <Link
              to="/careers"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-extrabold text-[#071426] shadow-xl shadow-cyan-950/20 transition duration-300 hover:-translate-y-1 hover:bg-cyan-200"
            >
              View Openings <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}