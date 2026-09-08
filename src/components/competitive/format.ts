import type { Direction, HeatColor, Placeholder, Unit } from '@/data/dummyData';

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
const inr2 = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const inr1 = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/**
 * Table cells render plain numbers — no ₹, Cr, %, or x suffixes. The unit is
 * communicated once, by the row label or the table title, never repeated in
 * every cell.
 */
export function formatValue(value: number, unit: Unit): string {
  switch (unit) {
    case 'percent':
      return `${value >= 0 ? '' : ''}${inr1.format(value)}`;
    case 'multiple':
      return inr1.format(value);
    case 'currencyCr':
      return inr.format(Math.round(value));
    case 'rupee':
      return inr2.format(value);
    case 'rank':
      return `${value}`;
    case 'number':
    default:
      return inr.format(value);
  }
}

export function formatPlaceholder(placeholder: Placeholder = 'NA'): string {
  return placeholder;
}

export const HEAT_COLOR_CLASS: Record<HeatColor, string> = {
  peach: 'bg-[#F8D8C0]',
  green: 'bg-[#E0F0D8]',
};

/**
 * Highlights only the single best (green) and single worst (peach) value in a
 * row, ignoring `excludeIndex` (DRL, which gets its own box treatment instead
 * of a rank color). Every other cell stays plain. This mirrors the source
 * design's sparse "call out the extremes" heatmap rather than a full gradient,
 * and keeps working once real values replace the dummy ones.
 */
export function extremeColors(
  values: (number | null)[],
  direction: Direction = 'higherIsBetter',
  excludeIndex = 0
): (HeatColor | null)[] {
  const candidates = values
    .map((v, i) => ({ v, i }))
    .filter((x): x is { v: number; i: number } => x.v !== null && x.i !== excludeIndex);

  const result: (HeatColor | null)[] = values.map(() => null);
  if (candidates.length < 2) return result;

  const best = candidates.reduce((a, b) => {
    const bBetter = direction === 'higherIsBetter' ? b.v > a.v : b.v < a.v;
    return bBetter ? b : a;
  });
  const worst = candidates.reduce((a, b) => {
    const bWorse = direction === 'higherIsBetter' ? b.v < a.v : b.v > a.v;
    return bWorse ? b : a;
  });

  if (best.i !== worst.i) {
    result[best.i] = 'green';
    result[worst.i] = 'peach';
  }

  return result;
}
