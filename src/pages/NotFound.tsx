import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <h1 className="text-6xl font-extrabold text-[#172033]">
          404
        </h1>

        <h2>
          Page not found
        </h2>

        <Link
          className="text-[#3155d9]"
          to="/"
        >
          Return to Home
        </Link>
      </div>
    </section>
  );
}