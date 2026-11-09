export default function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[14px] border border-[#e2e7f0] bg-white p-6 shadow-[0_8px_25px_rgba(23,32,51,.02)] transition-colors duration-200 dark:border-[#292d3a] dark:bg-[#14161e] dark:shadow-[0_8px_25px_rgba(0,0,0,.15)]">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eef2ff] text-xl text-[#3155d9] dark:bg-[#252344] dark:text-[#a5b4fc]">
        {icon}
      </div>

      <div>
        <p className="m-0 text-sm text-[#6d7890] dark:text-gray-400">
          {label}
        </p>

        <h2 className="m-0 text-[#172033] dark:text-gray-100">
          {value}
        </h2>
      </div>
    </div>
  );
}