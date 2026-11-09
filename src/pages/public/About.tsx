import { Link } from "react-router-dom";

const values = [
  {
    number: "01",
    title: "Innovation",
    description:
      "We continuously explore better ways to solve problems using technology.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Integrity",
    description:
      "We believe in transparency, responsibility, and building long-term relationships.",
    icon: "✓",
  },
  {
    number: "03",
    title: "Growth",
    description:
      "We encourage continuous learning and professional development.",
    icon: "↗",
  },
];

export default function About() {
  return (
    <main className="overflow-hidden bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Hero */}
      <section className="bg-slate-950 px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block rounded-full border border-slate-700 px-4 py-2 text-xs font-bold tracking-widest text-blue-300">
            ABOUT US
          </span>

          <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            We build technology that
            <span className="text-blue-400"> creates impact.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            A technology-driven company focused on building
            useful digital solutions and empowering people
            through technology.
          </p>

          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-blue-50"
          >
            Explore Our Projects <span>→</span>
          </Link>
        </div>
      </section>

      {/* Who We Are */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-widest text-blue-700 dark:text-blue-400">
              WHO WE ARE
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Technology. People. Progress.
            </h2>

            <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
              CompanyConnect is a modern technology company
              providing digital solutions for businesses of
              different sizes.
            </p>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              We focus on creating reliable, scalable, and
              user-friendly applications that solve real
              business problems.
            </p>

            <ul className="mt-7 space-y-4">
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-700 dark:text-blue-400">
                  ✓
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  User-friendly digital experiences
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-700 dark:text-blue-400">
                  ✓
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  Reliable and scalable applications
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-700 dark:text-blue-400">
                  ✓
                </span>
                <span className="text-slate-700 dark:text-slate-300">
                  Solutions for real business challenges
                </span>
              </li>
            </ul>
          </div>

          {/* Mission Card */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-colors dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-2xl text-white dark:bg-indigo-600">
              ◎
            </div>

            <p className="mt-7 text-sm font-bold tracking-widest text-blue-700 dark:text-blue-400">
              OUR MISSION
            </p>

            <h3 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">
              Making business simpler through technology.
            </h3>

            <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
              To use technology to simplify business processes,
              improve productivity, and create meaningful
              digital experiences.
            </p>

            <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
              <p className="font-semibold text-slate-900 dark:text-white">
                People-first approach
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Practical solutions designed around real needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 px-6 py-20 transition-colors dark:bg-slate-900 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold tracking-widest text-blue-700 dark:text-blue-400">
              OUR VALUES
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              What drives us forward
            </h2>

            <p className="mt-5 leading-7 text-slate-600 dark:text-slate-300">
              The principles that guide our work, decisions,
              and relationships.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.number}
                className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-500"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {value.icon}
                  </span>

                  <span className="text-sm font-bold text-slate-300 dark:text-slate-600">
                    {value.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-900 dark:text-white">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  {value.description}
                </p>

                <div className="mt-6 h-1 w-10 rounded-full bg-blue-600" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 rounded-3xl bg-slate-950 p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-widest text-blue-300">
              LET'S CONNECT
            </p>

            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Let's turn ideas into solutions.
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Discover how technology can help solve challenges
              and create better digital experiences.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-blue-50 md:self-center"
          >
            Contact Us <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}