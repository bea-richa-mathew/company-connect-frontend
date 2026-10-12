export default function StatCard({
  label,
  value,
  icon
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[14px] border border-[#e2e7f0] bg-white p-6 shadow-[0_8px_25px_rgba(23,32,51,.02)]">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eef2ff] text-xl text-[#3155d9]">
        {icon}
      </div>

      <div>
        <p className="m-0 text-sm text-[#6d7890]">
          {label}
        </p>

        <h2 className="m-0">
          {value}
        </h2>
      </div>
    </div>
  );
}