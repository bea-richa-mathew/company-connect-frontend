
import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
  Check,
  X,
  LockKeyhole,
  UserRound,
  Mail,
  Building2,
  BriefcaseBusiness,
  Phone,
} from "lucide-react";

import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

type Role = "user" | "employee";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    phone: "",
  });

  const [role, setRole] = useState<Role>("user");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: form.password.length >= 8,
    },
    {
      label: "One uppercase letter (A–Z)",
      valid: /[A-Z]/.test(form.password),
    },
    {
      label: "One lowercase letter (a–z)",
      valid: /[a-z]/.test(form.password),
    },
    {
      label: "One number (0–9)",
      valid: /[0-9]/.test(form.password),
    },
    {
      label: "One special character (!@#$...)",
      valid: /[^A-Za-z0-9]/.test(form.password),
    },
  ];

  const passwordIsValid = passwordRules.every(
    (rule) => rule.valid
  );

  const fieldClass =
    "mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-[#343846] dark:bg-[#0c0e14] dark:text-white";

  const iconFieldClass =
    "w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-[#343846] dark:bg-[#0c0e14] dark:text-white";

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!passwordIsValid) {
      const message =
        "Please meet all password requirements before registering.";

      setError(message);
      toast.warning(message);
      return;
    }

    if (
      role === "employee" &&
      (!form.department.trim() ||
        !form.designation.trim() ||
        !form.phone.trim())
    ) {
      const message =
        "Please enter the department, designation, and phone number.";

      setError(message);
      toast.warning(message);
      return;
    }

    setSubmitting(true);

    try {
      await register(
        form.name.trim(),
        form.email.trim(),
        form.password,
        role,
        role === "employee"
          ? {
              department: form.department.trim(),
              designation: form.designation.trim(),
              phone: form.phone.trim(),
            }
          : undefined
      );

      toast.success("Account created successfully!");

      navigate(
        role === "employee" ? "/employee" : "/",
        { replace: true }
      );
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="grid min-h-[75vh] place-items-center px-5 py-12">
      <form
        className="grid w-full max-w-lg gap-5 rounded-3xl border border-gray-200 bg-white p-7 shadow-xl shadow-gray-200/40 dark:border-[#292d3a] dark:bg-[#12141c] dark:shadow-black/20 sm:p-9"
        onSubmit={submit}
      >
        {/* Heading */}
        <div>
          <p className="mb-2 text-xs font-extrabold tracking-[0.18em] text-indigo-600 dark:text-indigo-400">
            JOIN OUR COMPANY
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Create account
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your details to get started.
          </p>
        </div>

        {/* Full name */}
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Full Name

          <div className="relative mt-2">
            <UserRound
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              className={iconFieldClass}
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              required
              value={form.name}
              onChange={(event) =>
                updateField("name", event.target.value)
              }
            />
          </div>
        </label>

        {/* Email */}
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Email Address

          <div className="relative mt-2">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              className={iconFieldClass}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
            />
          </div>
        </label>

        {/* Password */}
        <div>
          <label
            htmlFor="register-password"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Password
          </label>

          <div className="relative mt-2">
            <LockKeyhole
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="register-password"
              className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-[#343846] dark:bg-[#0c0e14] dark:text-white"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
              minLength={8}
              required
              value={form.password}
              onChange={(event) => {
                updateField("password", event.target.value);
                setError("");
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-[#252936]"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Password requirements */}
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-[#292d3a] dark:bg-[#0c0e14]">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Password requirements
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {passwordRules.map((rule) => (
                <div
                  key={rule.label}
                  className={`flex items-center gap-2 text-xs ${
                    rule.valid
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {rule.valid ? (
                    <Check size={15} className="shrink-0" />
                  ) : (
                    <X size={15} className="shrink-0" />
                  )}

                  <span>{rule.label}</span>
                </div>
              ))}
            </div>

            {form.password.length > 0 && (
              <p
                className={`mt-3 text-xs font-semibold ${
                  passwordIsValid
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {passwordIsValid
                  ? "Your password meets all requirements."
                  : "Your password does not meet all requirements yet."}
              </p>
            )}
          </div>
        </div>

        {/* Role dropdown */}
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
          Register as

          <select
            value={role}
            onChange={(event) => {
              setRole(event.target.value as Role);
              setError("");
            }}
            className={fieldClass}
          >
            <option value="user">User</option>
            <option value="employee">Employee</option>
          </select>
        </label>

        {/* Employee-only fields */}
        {role === "employee" && (
          <div className="space-y-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-5">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Employee details
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Please provide your company information.
              </p>
            </div>

            {/* Department */}
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Department

              <div className="relative mt-2">
                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  className={iconFieldClass}
                  type="text"
                  placeholder="e.g. Engineering"
                  required={role === "employee"}
                  value={form.department}
                  onChange={(event) =>
                    updateField("department", event.target.value)
                  }
                />
              </div>
            </label>

            {/* Designation */}
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Designation

              <div className="relative mt-2">
                <BriefcaseBusiness
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  className={iconFieldClass}
                  type="text"
                  placeholder="e.g. Software Developer"
                  required={role === "employee"}
                  value={form.designation}
                  onChange={(event) =>
                    updateField("designation", event.target.value)
                  }
                />
              </div>
            </label>

            {/* Phone */}
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Phone Number

              <div className="relative mt-2">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  className={iconFieldClass}
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your phone number"
                  required={role === "employee"}
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                />
              </div>
            </label>
          </div>
        )}

        {/* Inline error */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
            to="/login"
          >
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
