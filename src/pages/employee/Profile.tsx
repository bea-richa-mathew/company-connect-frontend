import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const fields = [
    ["Employee ID", user.id],
    ["Full Name", user.name],
    ["Email", user.email],
    ["Phone", user.phone || "Not provided"],
    ["Department", user.department],
    ["Designation", user.designation],
    ["Joining Date", user.joinDate],
    ["Location", user.location],
  ];

  return (
    <div>
      <div>
        <p className="text-sm text-slate-500">Employee Portal</p>
        <h1 className="mt-2 text-3xl font-bold">My Profile</h1>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
            {user.name.charAt(0)}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="mt-1 text-slate-500">
              {user.designation} • {user.department}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {fields.map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {label}
              </p>

              <p className="mt-2 font-medium text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}