import {
  useState,
  type FormEvent
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../../context/AuthContext";

export default function Register() {
  const {
    register,
    user
  } = useAuth();

  const navigate = useNavigate();

  const [
    form,
    setForm
  ] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [
    role,
    setRole
  ] = useState<"user" | "employee">("user");

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
      await register(
        form.name,
        form.email,
        form.password,
        role
      );

      // Use the role saved by the backend.
      const registeredRole = user?.role;

      navigate(
        registeredRole === "employee"
          ? "/employee"
          : "/",
        {
          replace: true
        }
      );
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed."
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
          JOIN OUR COMPANY
        </p>

        <h1 className="m-0 text-3xl font-extrabold">
          Create account
        </h1>

        <label>
          Full Name

          <input
            className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
            required
            value={form.name}
            onChange={(event) =>
              setForm({
                ...form,
                name: event.target.value
              })
            }
          />
        </label>

        <label>
          Email

          <input
            className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
            type="email"
            required
            value={form.email}
            onChange={(event) =>
              setForm({
                ...form,
                email: event.target.value
              })
            }
          />
        </label>

        <label>
          Password

          <input
            className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
            type="password"
            minLength={6}
            required
            value={form.password}
            onChange={(event) =>
              setForm({
                ...form,
                password: event.target.value
              })
            }
          />
        </label>

        <label className="block">
          <span className="mb-2 block">
            Register as
          </span>

          <select
            value={role}
            onChange={(event) =>
              setRole(
                event.target.value as "user" | "employee"
              )
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="user">
              User
            </option>

            <option value="employee">
              Employee
            </option>
          </select>
        </label>

        {error && (
          <p className="rounded-lg bg-[#fff0f0] p-3 text-[#c62828]">
            {error}
          </p>
        )}

        <button className="rounded-lg bg-[#3155d9] px-5 py-3 font-semibold text-white">
          Register
        </button>
      </form>
    </section>
  );
}
