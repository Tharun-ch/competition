import { useEffect, useRef, useState } from 'react';

import { FISCAL_YEARS, QUARTERS } from '@/data/dummyData';

type Mode = 'Quarter' | 'Year' | 'Range';

function FieldSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex-1">
      <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-md border border-[#E0E0E0] px-3 py-2 text-[13px] text-gray-800"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function PeriodDropdown() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('Year');
  const [fiscalYear, setFiscalYear] = useState('FY26');
  const [quarter, setQuarter] = useState('Q1');
  const [fromYear, setFromYear] = useState('FY26');
  const [fromQuarter, setFromQuarter] = useState('Q1');
  const [toYear, setToYear] = useState('FY26');
  const [toQuarter, setToQuarter] = useState('Q3');
  const [applied, setApplied] = useState('FY 2026');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function apply() {
    if (mode === 'Quarter') setApplied(`${fiscalYear} ${quarter}`);
    else if (mode === 'Year') setApplied(`FY 20${fiscalYear.slice(2, 4)}`);
    else setApplied(`${fromYear} ${fromQuarter} – ${toYear} ${toQuarter}`);
    setOpen(false);
  }

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
        <div className="absolute right-0 top-full z-10 mt-2 w-80 rounded-lg border border-[#E5E5E0] bg-white p-4 shadow-lg">
          <div className="grid grid-cols-3 gap-1 rounded-md bg-[#F5F5F3] p-1">
            {(['Quarter', 'Year', 'Range'] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded px-2 py-1.5 text-[13px] font-medium transition-colors ${
                  mode === m ? 'bg-white text-[#4C3A9E] shadow-sm' : 'text-gray-500'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {mode === 'Quarter' && (
            <div className="mt-4 flex gap-3">
              <FieldSelect label="Fiscal Year" value={fiscalYear} onChange={setFiscalYear} options={FISCAL_YEARS} />
              <FieldSelect label="Quarter" value={quarter} onChange={setQuarter} options={QUARTERS} />
            </div>
          )}

          {mode === 'Year' && (
            <div className="mt-4">
              <FieldSelect label="Fiscal Year" value={fiscalYear} onChange={setFiscalYear} options={FISCAL_YEARS} />
            </div>
          )}

          {mode === 'Range' && (
            <div className="mt-4 flex flex-col gap-3">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">From</div>
                <div className="mt-1.5 flex gap-3">
                  <FieldSelect label="FY" value={fromYear} onChange={setFromYear} options={FISCAL_YEARS} />
                  <FieldSelect label="Quarter" value={fromQuarter} onChange={setFromQuarter} options={QUARTERS} />
                </div>
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">To</div>
                <div className="mt-1.5 flex gap-3">
                  <FieldSelect label="FY" value={toYear} onChange={setToYear} options={FISCAL_YEARS} />
                  <FieldSelect label="Quarter" value={toQuarter} onChange={setToQuarter} options={QUARTERS} />
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={apply}
            className="mt-4 w-full rounded-md bg-[#4C3A9E] py-2 text-[13px] font-semibold text-white hover:bg-[#3D2D8A]"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
