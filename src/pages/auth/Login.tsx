import {
  useState,
  type FormEvent
} from "react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const {
    login
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [
    email,
    setEmail
  ] = useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const [
    error,
    setError
  ] = useState("");

  const submit = async (
    event: FormEvent
  ) => {
    event.preventDefault();
    setError("");

    try {
      await login(
        email,
        password
      );

      const state =
        location.state as
          | { from?: string }
          | null;

      navigate(
        state?.from ||
          "/employee",
        {
          replace: true
        }
      );
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed."
      );
    }
  };

  return (
    <section className="grid min-h-[70vh] place-items-center px-5 py-12">
      <form
        className="grid w-full max-w-md gap-4 rounded-2xl border border-[#e2e7f0] bg-white p-7 shadow-sm"
        onSubmit={submit}
      >
        <p className="mb-0 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
          WELCOME BACK
        </p>

        <h1 className="m-0 text-3xl font-extrabold">
          Sign in
        </h1>

        <p className="text-[#6d7890]">
          Sign in to your employee portal
          account.
        </p>

        <label>
          Email

          <input
            className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
            type="email"
            required
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />
        </label>

        <label>
          Password

          <input
            className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
            type="password"
            required
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
          />
        </label>

        {error && (
          <p className="rounded-lg bg-[#fff0f0] p-3 text-[#c62828]">
            {error}
          </p>
        )}

        <button className="rounded-lg bg-[#3155d9] px-5 py-3 font-semibold text-white">
          Login
        </button>

        <p className="rounded-lg bg-[#f3f5fa] p-3 text-sm text-[#6d7890]">
          Admin accounts use the separate
          Admin Portal.
        </p>

        <p>
          New user?{" "}
          <Link
            className="text-[#3155d9]"
            to="/register"
          >
            Create an account
          </Link>
        </p>
      </form>
    </section>
  );
}