import type { Kpi } from '@/data/dummyData';

export function KpiCard({ label, value, sub }: Kpi) {
  return (
    <div className="rounded-lg border border-[#E5E5E0] bg-white px-5 py-4 shadow-sm">
      <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</div>
      <div className="mt-1.5 text-[26px] font-bold leading-tight text-gray-900">{value}</div>
      {sub && <div className="mt-1.5 text-[11px] text-gray-400">{sub}</div>}
    </div>
  );
}

const LG_COLS_CLASS = {
  3: 'lg:grid-cols-3',
  5: 'lg:grid-cols-5',
} as const;

export function KpiRow({ kpis, cols = 5 }: { kpis: Kpi[]; cols?: keyof typeof LG_COLS_CLASS }) {
  return (
    <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${LG_COLS_CLASS[cols]}`}>
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </div>
  );
}
