import type { HeatTable, MetricRow } from '@/data/dummyData';

import { HEAT_COLOR_CLASS, formatValue, heatColors } from './format';

function Cell({ row, colIndex }: { row: MetricRow; colIndex: number }) {
  const value = row.values[colIndex];
  const isTotal = row.variant === 'total';
  const colors = row.colorize === false || isTotal ? null : heatColors(row.values, row.direction);
  const bgClass = colors?.[colIndex] ? HEAT_COLOR_CLASS[colors[colIndex]!] : '';
  const cagr = isTotal ? undefined : row.cagr?.[colIndex];
  const pct = isTotal ? undefined : row.percentOfTotal?.[colIndex];

  if (isTotal) {
    return (
      <td className="whitespace-nowrap px-4 py-3 text-center text-[13px] font-semibold text-white">
        {value === null ? 'n/a' : formatValue(value, row.unit)}
      </td>
    );
  }

  return (
    <td className={`px-4 py-3 text-center align-middle ${bgClass}`}>
      {value === null ? (
        <span className="text-[13px] text-gray-300">n/a</span>
      ) : (
        <div>
          <div className={`text-[13px] ${row.bold ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
            {formatValue(value, row.unit)}
          </div>
          {cagr != null && (
            <div className={`text-[11px] ${cagr >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              CAGR {cagr >= 0 ? '+' : ''}
              {cagr.toFixed(1)}%
            </div>
          )}
          {pct != null && <div className="text-[11px] text-gray-400">{pct.toFixed(1)}% of total</div>}
        </div>
      )}
    </td>
  );
}

export function DataTable({ table, titleRight }: { table: HeatTable; titleRight?: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#E5E5E0] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 pb-3 pt-5">
        <h3 className="text-[15px] font-semibold text-gray-900">{table.title}</h3>
        {titleRight}
      </div>
      <div className="px-6 pb-6">
        <div className="overflow-hidden rounded-md border border-[#E5E5E0]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#4C3A9E]">
                <th className="whitespace-nowrap px-4 py-3 text-left text-[13px] font-medium text-white">
                  {table.firstColLabel ?? 'Metric'}
                </th>
                {table.columns.map((col) => (
                  <th key={col} className="whitespace-nowrap px-4 py-3 text-center text-[13px] font-medium text-white">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row.label} className={`border-t border-[#F0F0EE] ${row.variant === 'total' ? 'bg-[#4C3A9E]' : ''}`}>
                  <td
                    className={`whitespace-nowrap px-4 py-3 text-[13px] ${
                      row.variant === 'total'
                        ? 'font-semibold text-white'
                        : row.bold
                          ? 'font-semibold text-gray-900'
                          : 'text-gray-700'
                    }`}
                  >
                    {row.label}
                  </td>
                  {row.values.map((_, colIndex) => (
                    <Cell key={colIndex} row={row} colIndex={colIndex} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
