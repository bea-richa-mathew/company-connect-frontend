
import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, userRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Redirect already authenticated users to the correct area.
  if (isAuthenticated && userRole) {
    const from = location.state?.from;

    const destination =
      typeof from === "string"
        ? from
        : from && typeof from.pathname === "string"
          ? from.pathname
          : "";

    if (
      userRole === "employee" &&
      destination.startsWith("/employee")
    ) {
      return <RedirectToPage destination={destination} />;
    }

    if (userRole === "employee") {
      return <RedirectToPage destination="/employee" />;
    }

    return <RedirectToPage destination="/" />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      const message = "Please enter your email and password.";
      setError(message);
      toast.warning(message);
      return;
    }

    try {
      setSubmitting(true);

      const role = await login(email.trim(), password);

      toast.success("Login successful!");

      if (role === "employee") {
        const from = location.state?.from;

        const destination =
          typeof from === "string" && from.startsWith("/employee")
            ? from
            : from &&
                typeof from.pathname === "string" &&
                from.pathname.startsWith("/employee")
              ? from.pathname
              : "/employee";

        navigate(destination, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-section flex min-h-screen items-center justify-center bg-[#08090d] px-4 py-12 text-white">
      <section className="form-card w-full max-w-md rounded-2xl border border-[#252936] bg-[#101218] p-6 shadow-2xl sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
            <LockKeyhole size={28} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to your Pinnacle account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-[#303442] bg-[#08090d] px-3 focus-within:border-indigo-500">
              <Mail size={18} className="shrink-0 text-gray-500" />

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Password
            </label>

            <div className="flex items-center rounded-xl border border-[#303442] bg-[#08090d] px-3 focus-within:border-indigo-500">
              <LockKeyhole
                size={18}
                className="shrink-0 text-gray-500"
              />

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="shrink-0 text-gray-400 transition hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
}

function RedirectToPage({ destination }: { destination: string }) {
  const navigate = useNavigate();

  useState(() => {
    navigate(destination, { replace: true });
  });

  return null;
}
