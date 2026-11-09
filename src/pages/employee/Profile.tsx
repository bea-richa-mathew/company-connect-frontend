import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type ChangeEvent,
} from "react";

import api from "../../services/api";

interface UserProfile {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  employeeId?: string;
  department?: string;
  designation?: string;
  phone?: string;
  profileImage?: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch profile data directly from the backend on load.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/me");

        const currentUser = (
          response.data.data ??
          response.data.user ??
          response.data
        ) as UserProfile;

        setUser(currentUser);
        setName(currentUser.name || "");
        setPhone(currentUser.phone || "");
        setProfileImage(currentUser.profileImage || "");
      } catch (err: unknown) {
        console.error("Failed to load profile:", err);

        setError(
          "Failed to load profile data. Please refresh and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Select and compress the profile photo.
  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSaved(false);

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Please select an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const maxDimension = 700;

        const scale = Math.min(
          1,
          maxDimension / Math.max(image.width, image.height)
        );

        const canvas = document.createElement("canvas");

        canvas.width = Math.max(
          1,
          Math.round(image.width * scale)
        );

        canvas.height = Math.max(
          1,
          Math.round(image.height * scale)
        );

        const context = canvas.getContext("2d");

        if (!context) {
          setError("Unable to process the selected image.");
          return;
        }

        context.drawImage(
          image,
          0,
          0,
          canvas.width,
          canvas.height
        );

        const compressedImage = canvas.toDataURL(
          "image/jpeg",
          0.75
        );

        setProfileImage(compressedImage);
      };

      image.onerror = () => {
        setError("Unable to read the selected image.");
      };

      image.src = reader.result as string;
    };

    reader.onerror = () => {
      setError("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  };

  // Remove the photo from the form.
  // The removal is saved to the backend when Save Changes is clicked.
  const handleRemovePhoto = () => {
    setProfileImage("");
    setSaved(false);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Save profile information and photo together.
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setError("Profile information is unavailable.");
      return;
    }

    setSaving(true);
    setSaved(false);
    setError("");

    try {
      const response = await api.patch("/employees/me", {
        name,
        phone,
        profileImage,
      });

      const updatedUser = (
        response.data.data ??
        response.data.user ??
        response.data
      ) as UserProfile;

      setUser((previous) => ({
        ...(previous ?? user),
        ...updatedUser,
        name: updatedUser.name ?? name,
        phone: updatedUser.phone ?? phone,
        profileImage: updatedUser.profileImage ?? profileImage,
      }));

      setName(updatedUser.name ?? name);
      setPhone(updatedUser.phone ?? phone);
      setProfileImage(updatedUser.profileImage ?? profileImage);

      setSaved(true);
    } catch (err: unknown) {
      console.error("Unable to save profile:", err);

      const message = (
        err as {
          response?: {
            data?: {
              message?: string;
            };
          };
          message?: string;
        }
      )?.response?.data?.message;

      setError(
        message || "Unable to save profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-600 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl bg-white p-6 text-red-600 dark:bg-zinc-900 dark:text-red-400">
        {error || "Unable to load profile data."}
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-lg border border-[#d7deea] px-3 py-3 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white";

  const readOnlyClass =
    "mt-1 w-full rounded-lg border border-[#d7deea] bg-gray-50 px-3 py-3 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-gray-400";

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
        className="grid w-full max-w-4xl gap-5 rounded-2xl border border-[#e2e7f0] bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        onSubmit={submit}
      >
        {/* Profile photo */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-[#e2e7f0] bg-[#3155d9] text-3xl font-extrabold text-white dark:border-zinc-700">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Employee profile"
                className="h-full w-full object-cover"
              />
            ) : (
              user.name?.charAt(0)?.toUpperCase() || "U"
            )}
          </div>

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              Profile Photo
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Choose an image up to 5 MB.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-[#3155d9] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2847b8]"
              >
                Upload Photo
              </button>

              {profileImage && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="rounded-lg border border-[#d7deea] px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800"
                >
                  Remove Photo
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
            <input
              className={inputClass}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setSaved(false);
              }}
              required
            />
          </label>

          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
            <input
              className={readOnlyClass}
              value={user.email || ""}
              disabled
            />
          </label>

          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Employee ID
            <input
              className={readOnlyClass}
              value={user.employeeId || "Not assigned"}
              disabled
            />
          </label>

          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Department
            <input
              className={readOnlyClass}
              value={user.department || ""}
              disabled
            />
          </label>

          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Designation
            <input
              className={readOnlyClass}
              value={user.designation || ""}
              disabled
            />
          </label>

          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone
            <input
              className={inputClass}
              type="tel"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setSaved(false);
              }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-lg bg-[#3155d9] px-5 py-3 font-semibold text-white hover:bg-[#2847b8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {saved && (
          <p className="rounded-lg bg-[#e7f8ef] p-3 text-[#167044]">
            Profile saved successfully.
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-[#fff0f0] p-3 text-[#c62828]"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}