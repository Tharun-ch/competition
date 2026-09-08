import type { CdmoCompany } from '@/data/dummyData';

export function CdmoCard({ name, revenue, growth, margin }: CdmoCompany) {
  return (
    <div className="rounded-lg border border-[#E5E5E0] bg-white px-5 py-4 shadow-sm">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{name}</div>
      <div className="mt-1.5 text-[22px] font-bold text-gray-900">{revenue}</div>
      <div className="mt-1.5 text-[11px] text-gray-400">
        Growth {growth} | EBITDA Margin {margin}
      </div>
    </div>
  );
}
