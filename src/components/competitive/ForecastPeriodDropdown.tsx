import { useState } from 'react';

import { FORECAST_PERIODS } from '@/data/dummyData';

export function ForecastPeriodDropdown() {
  const [value, setValue] = useState(FORECAST_PERIODS[0]);

  return (
    <label className="flex items-center gap-2 text-[13px] text-gray-500">
      Forecast Period:
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-md border border-[#E0E0E0] px-3 py-1.5 text-[13px] font-medium text-gray-800"
      >
        {FORECAST_PERIODS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </label>
  );
}
