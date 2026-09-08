import { useState } from 'react';

import { MEASURES } from '@/data/dummyData';

export function MeasureDropdown() {
  const [value, setValue] = useState(MEASURES[0]);

  return (
    <label className="flex items-center gap-2 text-[13px] text-gray-500">
      Measure:
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-md border border-[#E0E0E0] px-3 py-1.5 text-[13px] font-medium text-gray-800"
      >
        {MEASURES.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </label>
  );
}
