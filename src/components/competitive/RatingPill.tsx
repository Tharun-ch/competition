import type { AnalystRow } from '@/data/dummyData';

const BUY_RATINGS = new Set(['Buy', 'Outperform', 'Accumulate', 'Add']);
const NEUTRAL_RATINGS = new Set(['Equal-weight', 'Neutral', 'Hold']);
const SELL_RATINGS = new Set(['Reduce', 'Underweight', 'Underperform', 'Sell']);

export function RatingPill({ rating }: { rating: AnalystRow['rating'] }) {
  if (rating === 'Not Rated') {
    return <span className="text-[12px] text-gray-400">Not rated</span>;
  }

  const className = BUY_RATINGS.has(rating)
    ? 'bg-[#E0F0D8] text-[#2E7D32]'
    : NEUTRAL_RATINGS.has(rating)
      ? 'bg-[#FFF0C8] text-[#8A6D1D]'
      : SELL_RATINGS.has(rating)
        ? 'bg-[#F0C0C0] text-[#B23A3A]'
        : 'bg-gray-100 text-gray-600';

  return <span className={`inline-block rounded px-2.5 py-1 text-[12px] font-medium ${className}`}>{rating}</span>;
}
