import type { Direction, HeatColor, Unit } from '@/data/dummyData';

const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

export function formatValue(value: number, unit: Unit): string {
  switch (unit) {
    case 'percent':
      return `${value.toFixed(1)}%`;
    case 'multiple':
      return `${value.toFixed(1)}x`;
    case 'currencyCr':
      return `₹${inr.format(Math.round(value))} Cr`;
    case 'rupee':
      return `₹${value.toFixed(1)}`;
    case 'rank':
      return `${value} of 8`;
    case 'number':
    default:
      return inr.format(value);
  }
}

const HEAT_COLORS: HeatColor[] = ['red', 'orange', 'yellow', 'green'];

export const HEAT_COLOR_CLASS: Record<HeatColor, string> = {
  red: 'bg-[#FFCDD2]',
  orange: 'bg-[#FFE0B2]',
  yellow: 'bg-[#FFF9C4]',
  green: 'bg-[#C8E6C9]',
};

/**
 * Ranks the non-null values in a row into four buckets (worst → best) and
 * assigns red/orange/yellow/green accordingly. `direction` decides whether a
 * high or low value counts as "best". This mirrors the conditional-formatting
 * heatmap in the source design without needing a hand-picked color per cell —
 * so the same logic keeps working once real values replace the dummy ones.
 */
export function heatColors(
  values: (number | null)[],
  direction: Direction = 'higherIsBetter'
): (HeatColor | null)[] {
  const present = values
    .map((v, i) => ({ v, i }))
    .filter((x): x is { v: number; i: number } => x.v !== null);

  if (present.length < 2) return values.map(() => null);

  const sorted = [...present].sort((a, b) => (direction === 'higherIsBetter' ? a.v - b.v : b.v - a.v));
  const n = sorted.length;
  const result: (HeatColor | null)[] = values.map(() => null);

  sorted.forEach((item, rank) => {
    const bucket = Math.min(3, Math.floor((rank / n) * 4));
    result[item.i] = HEAT_COLORS[bucket];
  });

  return result;
}
