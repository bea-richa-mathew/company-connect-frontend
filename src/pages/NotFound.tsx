import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <span className="not-found-number">
          404
        </span>

        <h1>Page not found</h1>

        <p>
          The page you are looking for doesn't exist
          or has been moved.
        </p>

        <Link
          to="/"
          className="button primary"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}