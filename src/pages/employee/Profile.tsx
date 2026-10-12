import {
  useState,
  type FormEvent
} from "react";

import {
  useAuth
} from "../../context/AuthContext";

import api from "../../services/api";

export default function Profile() {
  const {
    user
  } = useAuth();

  const [
    phone,
    setPhone
  ] = useState(
    user?.phone || ""
  );

  const [
    name,
    setName
  ] = useState(
    user?.name || ""
  );

  const [
    saved,
    setSaved
  ] = useState(false);

  const [
    error,
    setError
  ] = useState("");

  const submit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    try {
      const response =
        await api.patch(
          `/employees/${
            user?._id || user?.id
          }`,
          {
            name,
            phone
          }
        );

      const updatedUser =
        response.data.data;

      localStorage.setItem(
        "company_portal_user",
        JSON.stringify(
          updatedUser
        )
      );

      setSaved(true);
      setError("");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save profile."
      );
    }
  };

  return (
    <div>
      <div className="mb-7">
        <p className="mb-3 text-xs font-extrabold tracking-[.13em] text-[#3155d9]">
          MY PROFILE
        </p>

        <h1 className="m-0 text-3xl font-extrabold">
          Personal information
        </h1>
      </div>

      <form
        className="grid w-full max-w-4xl gap-5 rounded-2xl border border-[#e2e7f0] bg-white p-7 shadow-sm"
        onSubmit={submit}
      >
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#3155d9] text-3xl font-extrabold text-white">
          {user?.name?.charAt(0)}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label>
            Full Name

            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value
                )
              }
            />
          </label>

          <label>
            Email

            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              value={
                user?.email || ""
              }
              disabled
            />
          </label>

          <label>
            Employee ID

            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              value={
                user?.employeeId ||
                "Not assigned"
              }
              disabled
            />
          </label>

          <label>
            Department

            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              value={
                user?.department ||
                ""
              }
              disabled
            />
          </label>

          <label>
            Designation

            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              value={
                user?.designation ||
                ""
              }
              disabled
            />
          </label>

          <label>
            Phone

            <input
              className="mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3"
              value={phone}
              onChange={(event) =>
                setPhone(
                  event.target.value
                )
              }
            />
          </label>
        </div>

        <button className="w-fit rounded-lg bg-[#3155d9] px-5 py-3 font-semibold text-white">
          Save Changes
        </button>

        {saved && (
          <p className="rounded-lg bg-[#e7f8ef] p-3 text-[#167044]">
            Profile saved.
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-[#fff0f0] p-3 text-[#c62828]">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}