import type { HeatTable, MetricRow } from '@/data/dummyData';

import { HEAT_COLOR_CLASS, extremeColors, formatPlaceholder, formatValue } from './format';

const DRL_COL_INDEX = 0;

function Cell({
  row,
  colIndex,
  isDrlBottom,
  isLastRow,
  isLastCol,
}: {
  row: MetricRow;
  colIndex: number;
  isDrlBottom: boolean;
  isLastRow: boolean;
  isLastCol: boolean;
}) {
  const value = row.values[colIndex];
  const pctValue = row.percentOfTotal?.[colIndex];
  const isTotal = row.variant === 'total';
  const isDrl = colIndex === DRL_COL_INDEX;
  const colors = row.colorize === false || isTotal ? null : extremeColors(row.values, row.direction);
  const bgClass = colors?.[colIndex] ? HEAT_COLOR_CLASS[colors[colIndex]!] : '';

  const drlBoxClass = isDrl ? `border-l-2 border-r-2 border-[#202020] ${isDrlBottom ? 'border-b-2' : ''}` : '';
  // Matches the wrapping div's rounded-md corners directly on the corner
  // cells — relying on overflow-hidden alone to clip a border-collapse
  // table's sharp corners leaves a visible sliver of the wrapper's
  // background showing through at the arc.
  const cornerClass = isLastRow && isLastCol ? 'rounded-br-md' : '';

  if (isTotal) {
    return (
      <td className={`whitespace-nowrap px-4 py-3 text-center text-[13px] font-semibold text-white ${drlBoxClass} ${cornerClass}`}>
        {value === null ? formatPlaceholder() : formatValue(value, row.unit)}
      </td>
    );
  }

  return (
    <td className={`px-4 py-2.5 text-center align-middle ${bgClass} ${drlBoxClass} ${cornerClass}`}>
      <span className={`block text-[13px] ${row.bold ? 'font-semibold text-gray-900' : 'text-[#484848]'} ${value === null ? 'text-gray-400' : ''}`}>
        {value === null ? formatPlaceholder(row.placeholder) : formatValue(value, row.unit)}
      </span>
      {row.percentOfTotal && (
        <span className="mt-0.5 block text-[11px] italic text-gray-400">
          {pctValue === null || pctValue === undefined ? formatPlaceholder(row.placeholder) : formatValue(pctValue, 'percent')}
          {pctValue !== null && pctValue !== undefined && '%'}
        </span>
      )}
    </td>
  );
}

export function DataTable({ table, titleRight }: { table: HeatTable; titleRight?: React.ReactNode }) {
  const lastRowIndex = table.rows.length - 1;

  return (
    <section className="overflow-hidden rounded-lg border border-[#E5E5E0] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 pb-3 pt-5">
        {table.title && <h3 className="text-[15px] font-semibold text-gray-900">{table.title}</h3>}
        {titleRight}
      </div>
      <div className="px-6 pb-4">
        <div className="overflow-hidden rounded-md border border-[#E5E5E0]">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#5038A0]">
                <th className="whitespace-nowrap rounded-tl-md px-4 py-3 text-left text-[13px] font-medium text-white">
                  {table.firstColLabel ?? 'Metric'}
                </th>
                {table.columns.map((col, colIndex) => (
                  <th
                    key={col}
                    className={`whitespace-nowrap px-4 py-3 text-center text-[13px] font-medium text-white ${
                      colIndex === DRL_COL_INDEX ? 'border-l-2 border-r-2 border-t-2 border-[#202020]' : ''
                    } ${colIndex === table.columns.length - 1 ? 'rounded-tr-md' : ''}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, i) => (
                <tr
                  key={`${row.label}-${i}`}
                  className={row.variant === 'total' ? 'bg-[#5038A0]' : i % 2 === 1 ? 'bg-[#FAFAFA]' : ''}
                >
                  <td
                    className={`whitespace-nowrap px-4 py-2.5 text-[13px] ${
                      row.variant === 'total'
                        ? 'font-semibold text-white'
                        : row.bold
                          ? 'font-semibold text-gray-900'
                          : 'text-[#484848]'
                    } ${i === lastRowIndex ? 'rounded-bl-md' : ''}`}
                  >
                    <span className="block">{row.label}</span>
                    {row.percentOfTotal && <span className="mt-0.5 block text-[11px] italic text-gray-400">% of Total</span>}
                  </td>
                  {row.values.map((_, colIndex) => (
                    <Cell
                      key={colIndex}
                      row={row}
                      colIndex={colIndex}
                      isDrlBottom={i === lastRowIndex}
                      isLastRow={i === lastRowIndex}
                      isLastCol={colIndex === table.columns.length - 1}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {table.footnote && <p className="mt-3 text-[11px] italic text-gray-400">{table.footnote}</p>}
      </div>
    </section>
  );
}
