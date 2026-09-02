import { useEffect, useRef, useState } from 'react';

import { FISCAL_YEARS } from '@/data/dummyData';

export function PeriodDropdown() {
  const [open, setOpen] = useState(false);
  const [fiscalYear, setFiscalYear] = useState('FY26');
  const [applied, setApplied] = useState('FY 2026');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-gray-500">Period:</span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex min-w-[140px] items-center justify-between gap-3 rounded-md border border-[#E0E0E0] bg-white px-3 py-2 text-[13px] font-medium text-gray-800 shadow-sm hover:border-[#4C3A9E]"
        >
          {applied}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="absolute right-0 top-full z-10 mt-2 w-72 rounded-lg border border-[#E5E5E0] bg-white p-4 shadow-lg">
          <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Fiscal Year</div>
          <select
            value={fiscalYear}
            onChange={(e) => setFiscalYear(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-[#E0E0E0] px-3 py-2 text-[13px] text-gray-800"
          >
            {FISCAL_YEARS.map((fy) => (
              <option key={fy} value={fy}>
                {fy}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              setApplied(`FY 20${fiscalYear.slice(2, 4)}`);
              setOpen(false);
            }}
            className="mt-4 w-full rounded-md bg-[#4C3A9E] py-2 text-[13px] font-semibold text-white hover:bg-[#3D2D8A]"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
