import { ANALYST_ROWS } from '@/data/dummyData';

import { formatPlaceholder, formatValue } from './format';
import { RatingPill } from './RatingPill';

function ForecastCell({ value }: { value: number | null }) {
  return (
    <td className="whitespace-nowrap px-4 py-2.5 text-center text-[13px] text-gray-400">
      {value === null ? formatPlaceholder('XX') : formatValue(value, 'percent')}
    </td>
  );
}

export function AnalystTable() {
  return (
    <section className="overflow-hidden rounded-lg border border-[#E5E5E0] bg-white shadow-sm">
      <div className="px-6 pb-4">
        <div className="overflow-hidden rounded-md border border-[#E5E5E0]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#5038A0]">
                <th className="whitespace-nowrap px-4 py-3 text-left text-[13px] font-medium text-white">Firm</th>
                <th className="whitespace-nowrap px-4 py-3 text-left text-[13px] font-medium text-white">Rating</th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-[13px] font-medium text-white">Target Price</th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-[13px] font-medium text-white">1 Year Forward</th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-[13px] font-medium text-white">1YF Growth %</th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-[13px] font-medium text-white">2 Year Forward</th>
                <th className="whitespace-nowrap px-4 py-3 text-center text-[13px] font-medium text-white">2YF Growth %</th>
              </tr>
            </thead>
            <tbody>
              {ANALYST_ROWS.map((row) => (
                <tr key={row.firm} className="border-t border-[#F0F0EE]">
                  <td className="whitespace-nowrap px-4 py-2.5 text-[13px] text-[#484848]">{row.firm}</td>
                  <td className="whitespace-nowrap px-4 py-2.5">
                    <RatingPill rating={row.rating} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-center text-[13px] text-[#484848]">
                    {row.targetPrice === null ? '' : formatValue(row.targetPrice, 'rupee')}
                  </td>
                  <ForecastCell value={row.oneYearForward} />
                  <ForecastCell value={row.oneYearGrowth} />
                  <ForecastCell value={row.twoYearForward} />
                  <ForecastCell value={row.twoYearGrowth} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
