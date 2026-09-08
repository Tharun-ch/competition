import type { HeatTable, MetricRow } from '@/data/dummyData';

import { HEAT_COLOR_CLASS, extremeColors, formatPlaceholder, formatValue } from './format';

const DRL_COL_INDEX = 0;

interface FlatRow {
  key: string;
  label: string;
  values: (number | null)[];
  unit: MetricRow['unit'];
  isPercentRow: boolean;
  variant?: 'total';
  bold?: boolean;
  colorize?: boolean;
  direction?: MetricRow['direction'];
  placeholder?: MetricRow['placeholder'];
}

function flattenRows(rows: MetricRow[]): FlatRow[] {
  const flat: FlatRow[] = [];
  rows.forEach((row, i) => {
    flat.push({
      key: `${row.label}-${i}`,
      label: row.label,
      values: row.values,
      unit: row.unit,
      isPercentRow: false,
      variant: row.variant,
      bold: row.bold,
      colorize: row.colorize,
      direction: row.direction,
      placeholder: row.placeholder,
    });
    if (row.percentOfTotal) {
      flat.push({
        key: `${row.label}-${i}-pct`,
        label: '% of Total',
        values: row.percentOfTotal,
        unit: 'percent',
        isPercentRow: true,
      });
    }
  });
  return flat;
}

function Cell({ flatRow, colIndex, isDrlTop, isDrlBottom }: { flatRow: FlatRow; colIndex: number; isDrlTop: boolean; isDrlBottom: boolean }) {
  const value = flatRow.values[colIndex];
  const isTotal = flatRow.variant === 'total';
  const isDrl = colIndex === DRL_COL_INDEX;
  const colors = flatRow.colorize === false || isTotal || flatRow.isPercentRow ? null : extremeColors(flatRow.values, flatRow.direction);
  const bgClass = colors?.[colIndex] ? HEAT_COLOR_CLASS[colors[colIndex]!] : '';

  const drlBoxClass = isDrl && !isTotal ? `border-l-2 border-r-2 border-[#202020] ${isDrlTop ? 'border-t-2' : ''} ${isDrlBottom ? 'border-b-2' : ''}` : '';

  if (isTotal) {
    return (
      <td className="whitespace-nowrap px-4 py-3 text-center text-[13px] font-semibold text-white">
        {value === null ? formatPlaceholder() : formatValue(value, flatRow.unit)}
      </td>
    );
  }

  return (
    <td className={`px-4 py-2.5 text-center align-middle ${bgClass} ${drlBoxClass}`}>
      {value === null ? (
        <span className={`text-[13px] ${flatRow.isPercentRow ? 'text-gray-400 italic' : 'text-gray-400'}`}>
          {formatPlaceholder(flatRow.placeholder)}
        </span>
      ) : (
        <span
          className={`text-[13px] ${
            flatRow.isPercentRow
              ? 'text-gray-400 italic'
              : flatRow.bold
                ? 'font-semibold text-gray-900'
                : 'text-[#484848]'
          }`}
        >
          {formatValue(value, flatRow.unit)}
        </span>
      )}
    </td>
  );
}

export function DataTable({ table, titleRight }: { table: HeatTable; titleRight?: React.ReactNode }) {
  const flatRows = flattenRows(table.rows);
  const nonTotalIndices = flatRows.map((r, i) => (r.variant === 'total' ? -1 : i)).filter((i) => i >= 0);
  const firstNonTotal = nonTotalIndices[0];
  const lastNonTotal = nonTotalIndices[nonTotalIndices.length - 1];

  return (
    <section className="overflow-hidden rounded-lg border border-[#E5E5E0] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 px-6 pb-3 pt-5">
        {table.title && <h3 className="text-[15px] font-semibold text-gray-900">{table.title}</h3>}
        {titleRight}
      </div>
      <div className="px-6 pb-4">
        <div className="overflow-hidden rounded-md border border-[#E5E5E0]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#5038A0]">
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
              {flatRows.map((flatRow, i) => (
                <tr
                  key={flatRow.key}
                  className={`border-t border-[#F0F0EE] ${flatRow.variant === 'total' ? 'bg-[#5038A0]' : flatRow.isPercentRow ? 'bg-[#FAFAFA]' : ''}`}
                >
                  <td
                    className={`whitespace-nowrap px-4 py-2.5 text-[13px] ${
                      flatRow.variant === 'total'
                        ? 'font-semibold text-white'
                        : flatRow.isPercentRow
                          ? 'pl-8 italic text-gray-400'
                          : flatRow.bold
                            ? 'font-semibold text-gray-900'
                            : 'text-[#484848]'
                    }`}
                  >
                    {flatRow.label}
                  </td>
                  {flatRow.values.map((_, colIndex) => (
                    <Cell
                      key={colIndex}
                      flatRow={flatRow}
                      colIndex={colIndex}
                      isDrlTop={i === firstNonTotal}
                      isDrlBottom={i === lastNonTotal}
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
