/**
 * DUMMY DATA — placeholder for the Competitive Analysis app.
 *
 * Everything the UI renders (KPI cards, heatmap tables, the EBITDA bridge chart,
 * CDMO peer cards, analyst consensus) is sourced from this single file. When the
 * real Fabric semantic model is connected, delete this file and replace its
 * exports with data loaded from that model — the component layer
 * (src/components/competitive, src/pages/CompetitiveAnalysisPage.tsx) reads only
 * the types below, so no UI code needs to change.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Unit = 'percent' | 'currencyCr' | 'multiple' | 'number' | 'days' | 'rupee' | 'rank';
export type Direction = 'higherIsBetter' | 'lowerIsBetter';
export type HeatColor = 'peach' | 'green';
export type Placeholder = 'NA' | 'XX';

export interface MetricRow {
  label: string;
  unit: Unit;
  /** One value per column; a missing value renders as the row's placeholder text. */
  values: (number | null)[];
  /** Renders a second, lightly-styled row directly beneath this one showing each value's share of the total. */
  percentOfTotal?: (number | null)[];
  direction?: Direction;
  /** Set false to disable the single best/worst cell highlighting (e.g. absolute-value tables). */
  colorize?: boolean;
  bold?: boolean;
  /** Renders the row as a solid purple "Total" row, like the table header. */
  variant?: 'total';
  /** Text shown for a null value — "NA" (data unavailable) or "XX" (forecast not modeled for this column). */
  placeholder?: Placeholder;
}

export interface HeatTable {
  title: string;
  columns: string[];
  firstColLabel?: string;
  rows: MetricRow[];
  /** Small italic note rendered under the table. */
  footnote?: string;
}

export interface Kpi {
  label: string;
  value: string;
  sub?: string;
}

export interface CdmoCompany {
  name: string;
  revenue: string;
  growth: string;
  margin: string;
}

export interface AnalystRow {
  firm: string;
  rating: 'Buy' | 'Outperform' | 'Accumulate' | 'Add' | 'Equal-weight' | 'Neutral' | 'Hold' | 'Reduce' | 'Underweight' | 'Underperform' | 'Sell' | 'Not Rated';
  targetPrice: number | null;
  oneYearForward: number | null;
  oneYearGrowth: number | null;
  twoYearForward: number | null;
  twoYearGrowth: number | null;
}

// ---------------------------------------------------------------------------
// App / header
// ---------------------------------------------------------------------------

export const APP_META = {
  title: 'Competitive Analysis',
  sourceLabel: 'SOURCE:',
  source: 'BLOOMBERG',
  naNote: 'DATA NOT AVAILABLE IN BLOOMBERG MARKED AS NA',
};

export const PEER_COMPANIES = ['Sun Pharma', 'Cipla', 'Aurobindo', 'Lupin', 'Torrent', 'Mankind', 'Zydus Life'];

export const FISCAL_YEARS = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26', 'FY27 (Est.)', 'FY28 (Est.)'];
export const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
export const FORECAST_PERIODS = ['1 Year Forward (1YF)', '2 Year Forward (2YF)'];
export const MEASURES = ['Revenue', 'EBITDA', 'EBITDA Margin %', 'PAT', 'P/E'];

export const TOP_TABS = [
  'Overview',
  'Revenue & Growth',
  'Cost Structure & EBITDA',
  'Valuation & Returns',
  'Leverage & Cash Flow',
  'CDMO',
  'Consensus',
] as const;
export type TopTab = (typeof TOP_TABS)[number];

/** DRL, then the seven listed peers — the standard column set for peer-comparison tables. */
export const PEER_COLS = ['DRL', 'Sun', 'Cipla', 'Aurobindo', 'Lupin', 'Torrent', 'Mankind', 'Zydus Life'];

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

export const OVERVIEW_KPIS: Kpi[] = [
  { label: 'DRL Revenue (₹ Cr)', value: '33,593', sub: 'Growth 3.2%' },
  { label: 'DRL EBITDA Margin %', value: '21.2%', sub: 'Absolute EBITDA: ₹7,116 Cr' },
  { label: 'DRL ROCE %', value: '19.4%', sub: 'Peer avg 30.60% · gap -11.21%' },
  { label: 'DRL P/E', value: '24.4x' },
  { label: 'DRL Market-Cap Rank Overall', value: '5 of 8', sub: 'LTI Rank - 4 of 7' },
];

export const OVERVIEW_TABLES: HeatTable[] = [
  {
    title: 'Performance Heatmap',
    columns: PEER_COLS,
    rows: [
      { label: 'Revenue Growth%', unit: 'percent', values: [3.2, 11.9, 2.1, 6.4, 26.0, 23.5, 17.0, 18.4] },
      { label: 'Gross Profit Margin%', unit: 'percent', values: [52.8, 80.3, 66.1, 59.9, 73.8, 75.8, 71.6, 73.1] },
      { label: 'EBITDA Margin %', unit: 'percent', values: [21.2, 28.3, 21.4, 20.5, 29.2, 32.6, 27.8, 26.9] },
      { label: 'PAT Margin %', unit: 'percent', values: [12.8, 19.7, 14.0, 10.5, 19.1, 15.5, 13.4, 18.9] },
      { label: 'ROCE %', unit: 'percent', values: [19.4, 23.7, 15.9, 13.3, 36.6, 43.5, 57.4, 36.1] },
    ],
  },
  {
    title: 'Multiples & Market Capitalisation',
    columns: PEER_COLS,
    rows: [
      { label: 'P/E (x)', unit: 'multiple', direction: 'lowerIsBetter', values: [24.4, 36.7, 25.5, 21.6, 19.8, 66.0, 43.3, 17.4] },
      { label: 'EV/EBITDA (x)', unit: 'multiple', direction: 'lowerIsBetter', values: [14.6, 23.9, 15.3, 10.7, 12.8, 36.2, 22.0, 12.7] },
      { label: 'Market Capitalisation (₹ Cr)', unit: 'currencyCr', values: [104575, 421611, 98946, 75760, 105974, 142831, 82799, 87643] },
    ],
  },
  {
    title: 'Consensus Estimates',
    columns: PEER_COLS,
    rows: [
      { label: 'Revenue Growth%', unit: 'percent', placeholder: 'XX', values: [4.7, null, null, null, null, null, null, null] },
      { label: 'Gross Margin %', unit: 'percent', placeholder: 'XX', values: [50.9, null, null, null, null, null, null, null] },
      { label: 'EBITDA Margin %', unit: 'percent', placeholder: 'XX', values: [18.1, null, null, null, null, null, null, null] },
      { label: 'PAT Margin %', unit: 'percent', placeholder: 'XX', values: [10.7, null, null, null, null, null, null, null] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Revenue & Growth
// ---------------------------------------------------------------------------

export const REVENUE_GROWTH_TABLES: HeatTable[] = [
  {
    title: 'Region Wise Revenue (₹ Cr) | % Total Revenue',
    columns: PEER_COLS,
    firstColLabel: 'Segment',
    rows: [
      { label: 'North America', unit: 'currencyCr', colorize: false, values: [11374, 16824, 6860, 14408, 121203, 13620, null, 11682], percentOfTotal: [33.9, 28.9, 24.8, 43.2, 43.4, 97.4, null, 43.7] },
      { label: 'Europe', unit: 'currencyCr', colorize: false, values: [5550, null, null, 10316, 2822, 1248, null, null], percentOfTotal: [16.5, null, null, 30.9, 10.1, 8.9, null, null] },
      { label: 'India', unit: 'currencyCr', colorize: false, values: [6219, 19290, 12500, null, 8114, 7644, 12217, 10488], percentOfTotal: [18.5, 33.1, 45.1, null, 29.0, 54.7, 85.6, 39.3] },
      { label: 'Emerging Markets', unit: 'currencyCr', colorize: false, values: [6756, 19755, 9535, 8499, 2943, 1362, 2060, 3070], percentOfTotal: [20.1, 33.9, 34.4, 10.5, 10.5, 9.7, 14.4, 11.5] },
      { label: 'API', unit: 'currencyCr', colorize: false, values: [3477, 2185, 422, 4047, 969, 1831, null, 992], percentOfTotal: [10.4, 3.8, 1.5, 12.1, 3.5, 13.1, null, 3.7] },
      { label: 'Others', unit: 'currencyCr', colorize: false, values: [213, 165, null, 1384, null, null, null, 259], percentOfTotal: [0.6, 0.3, null, 4.1, null, null, null, 1.0] },
      { label: 'Adjustment', unit: 'currencyCr', colorize: false, values: [1, null, -1606, -269, 984, 533, 6, 229], percentOfTotal: [0, null, -5.8, -0.8, 3.5, 3.8, 0.0, 0.9] },
      { label: 'Total', unit: 'currencyCr', colorize: false, variant: 'total', values: [33593, 58220, 27712, 33385, 27958, 13980, 14278, 26720] },
    ],
    footnote: 'OTHERS IN DRL INCLUDES PROPRIETARY PRODUCTS, ZYDUS LIFE INCLUDES ALLIANCES AND MED-TECH, IN AUROBINDO ARV',
  },
  {
    title: 'Region Wise Revenue Growth %',
    columns: PEER_COLS,
    firstColLabel: 'Segment',
    rows: [
      { label: 'North America', unit: 'percent', values: [-21.6, 3.6, -12.7, -2.8, 44.4, 23.8, null, 5.8] },
      { label: 'Europe', unit: 'percent', values: [54.7, null, null, 23.5, 9.5, null, null, null] },
      { label: 'India', unit: 'percent', values: [15.7, 14.0, 7.9, null, 7.1, 19.6, 13.9, 22.3] },
      { label: 'Emerging Markets', unit: 'percent', values: [23.3, 19.2, 10.0, null, 9.7, 23.7, 34.5, 39.0] },
      { label: 'API', unit: 'percent', values: [2.7, 10.4, -22.5, -6.4, -17.7, null, null, 97.2] },
      { label: 'Others', unit: 'percent', values: [-0.5, null, 33.5, null, 40.1, null, null, 5.5] },
      { label: 'Total', unit: 'percent', colorize: false, variant: 'total', values: [3.2, 11.9, 2.1, 6.4, 26.0, 23.5, 17.0, 18.4] },
    ],
  },
  {
    title: 'Consensus Estimates',
    columns: PEER_COLS,
    firstColLabel: 'Segment',
    rows: [
      { label: 'North America', unit: 'percent', placeholder: 'XX', values: [-7.7, null, null, null, null, null, null, null] },
      { label: 'Europe', unit: 'percent', placeholder: 'XX', values: [11.0, null, null, null, null, null, null, null] },
      { label: 'India', unit: 'percent', placeholder: 'XX', values: [10.6, null, null, null, null, null, null, null] },
      { label: 'Emerging Markets', unit: 'percent', placeholder: 'XX', values: [22.1, null, null, null, null, null, null, null] },
      { label: 'API', unit: 'percent', placeholder: 'XX', values: [8.0, null, null, null, null, null, null, null] },
      { label: 'Others', unit: 'percent', placeholder: 'XX', values: [-33.6, null, null, null, null, null, null, null] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Cost Structure & EBITDA
// ---------------------------------------------------------------------------

export const COST_STRUCTURE_TABLES: HeatTable[] = [
  {
    title: 'Cost (₹ Cr) & as a % of Sales',
    columns: PEER_COLS,
    firstColLabel: 'Segment',
    rows: [
      { label: 'COGS', unit: 'currencyCr', colorize: false, values: [15687, 11496, 9396, 13381, 7326, 3388, 4052, 7117], percentOfTotal: [47.2, 19.7, 33.9, 40.1, 26.2, 24.2, 28.4, 26.9] },
      { label: 'SG&A', unit: 'currencyCr', colorize: false, values: [10676, null, null, null, null, null, null, null], percentOfTotal: [31.8, null, null, null, null, null, null, null] },
      { label: 'R&D', unit: 'currencyCr', colorize: false, values: [2406, 3474, 1618, 530, 2063, 650, null, 1834], percentOfTotal: [7.25, 5.9, 5.8, 1.6, 7.4, 4.6, null, 6.9] },
      { label: 'Personnel', unit: 'currencyCr', colorize: false, values: [null, 11419, 5366, 5190, 4575, 2671, 3184, 4418], percentOfTotal: [null, 19.6, 19.4, 15.5, 16.4, 19.1, 22.3, 16.5] },
    ],
    footnote: 'Bloomberg indicated SG&A for DRL but only Selling and marketing on annual basis for these',
  },
  {
    title: 'Cost Increase/Decrease',
    columns: PEER_COLS,
    firstColLabel: 'Segment',
    rows: [
      { label: 'COGS', unit: 'percent', direction: 'lowerIsBetter', values: [17.4, 8.1, 3.3, 3.9, 7.2, 24.2, 16.1, 16.6] },
      { label: 'SG&A', unit: 'percent', direction: 'lowerIsBetter', values: [13.7, null, null, null, null, null, null, null] },
      { label: 'R&D', unit: 'percent', direction: 'lowerIsBetter', values: [-12.8, 7.6, 27.4, 7.0, 16.7, 11.9, null, 25.5] },
      { label: 'Personnel', unit: 'percent', direction: 'lowerIsBetter', values: [null, 14.5, 11.0, 16.0, 15.4, 21.2, 18.3, 20.0] },
    ],
  },
  {
    title: 'EBITDA',
    columns: PEER_COLS,
    rows: [
      { label: 'EBITDA (₹ Cr)', unit: 'currencyCr', values: [7116, 16491, 5925, 6846, 8160, 4558, 3976, 7195] },
      { label: 'EBITDA Margin %', unit: 'percent', values: [21.2, 28.3, 21.4, 20.5, 29.2, 32.6, 27.8, 26.9] },
    ],
  },
];

export type BridgeStepType = 'total' | 'delta';

export interface BridgeStep {
  label: string;
  type: BridgeStepType;
  /** For `total`: the bar's end value (bar always runs 0 → value). For `delta`: the +/- step applied to the running total. */
  value: number;
  display: string;
}

export const EBITDA_BRIDGE = {
  defaultPeer: 'Sun Pharma',
  defaultYear: 'FY26',
  /** The track represents 0..scaleMax%, so bars/steps can be positioned proportionally. */
  scaleMax: 30,
  steps: [
    { label: 'Sun Pharma EBITDA', type: 'total', value: 28.3, display: '28.3%' },
    { label: 'COGS', type: 'delta', value: -5.6, display: '-5.6pp' },
    { label: 'R&D', type: 'delta', value: -1.9, display: '-1.9pp' },
    { label: 'SG&A & Others', type: 'delta', value: 0.4, display: '+0.4pp' },
    { label: 'DRL EBITDA', type: 'total', value: 21.2, display: '21.2%' },
  ] satisfies BridgeStep[],
  note: 'Note: DRL EBITDA % = Sun Pharma EBITDA % (28.3%) − COGS (5.6pp) − R&D (1.9pp) + SG&A & Others (0.4pp) = 21.2% · Gap: -7.1pp',
};

// ---------------------------------------------------------------------------
// Valuation & Returns
// ---------------------------------------------------------------------------

export const VALUATION_KPIS: Kpi[] = [
  { label: 'DRL Share Price (₹)', value: '1254.9' },
  { label: 'DRL Market Cap (₹ Cr)', value: '1,04,575' },
  { label: 'DRL P/E', value: '24.4x' },
  { label: 'DRL EV/EBITDA', value: '14.6x' },
  { label: 'DRL EV/Sales', value: '3.1x' },
];

export const VALUATION_TABLES: HeatTable[] = [
  {
    title: 'Valuation Multiples',
    columns: PEER_COLS,
    rows: [
      { label: 'P/E', unit: 'multiple', direction: 'lowerIsBetter', values: [24.4, 36.7, 25.5, 21.6, 19.8, 66.0, 43.3, 17.4] },
      { label: 'P/B', unit: 'multiple', direction: 'lowerIsBetter', values: [2.7, 5.0, 2.9, 2.0, 4.7, 8.1, 5.0, 3.0] },
      { label: 'EV/EBITDA', unit: 'multiple', direction: 'lowerIsBetter', values: [14.6, 23.9, 15.3, 10.7, 12.8, 36.2, 22.0, 12.7] },
      { label: 'EV/Sales', unit: 'multiple', direction: 'lowerIsBetter', values: [3.1, 6.8, 3.3, 2.2, 3.7, 11.8, 6.1, 3.4] },
    ],
  },
  {
    title: 'Share Price & Market Cap',
    columns: PEER_COLS,
    rows: [
      { label: 'Share Price (₹)', unit: 'rupee', values: [1254.9, 1757.2, 1224.2, 1304.4, 2313.9, 4220.2, 2005.8, 871.2] },
      { label: 'Market Cap (₹ Cr)', unit: 'currencyCr', values: [104575, 421611, 98946, 75760, 105974, 142831, 82799, 87643] },
      { label: 'Market Cap Rank (of 8)', unit: 'rank', direction: 'lowerIsBetter', values: [5, 1, 6, 9, 4, 3, null, 7] },
      { label: 'Market Cap Rank as per LTI', unit: 'rank', direction: 'lowerIsBetter', values: [4, 1, 5, 7, 3, 2, null, 6] },
    ],
    footnote: "DIVI'S IS IN TOP COMPANIES BY MARKET CAP BUT NOT INCLUDED IN THIS PEER SET; GLENMARK IS PART OF LTI PEER SET",
  },
  {
    title: 'Returns',
    columns: PEER_COLS,
    rows: [
      { label: 'ROCE', unit: 'percent', values: [19.4, 23.7, 15.9, 13.3, 36.6, 43.5, 57.4, 36.1] },
      { label: 'ROIC', unit: 'percent', values: [8.9, 12.9, 10.4, 8.1, 20.3, 10.5, 10.3, 19.7] },
      { label: 'ROE', unit: 'percent', values: [12.1, 14.7, 11.8, 9.9, 26.9, 27.1, 12.5, 19.7] },
      { label: 'Dividend Payout Ratio', unit: 'percent', values: [15.6, 33.4, 27.1, 6.6, 15.4, 59.4, 2.2, 2.0] },
      { label: 'Dividend Per Share (₹)', unit: 'rupee', values: [8.0, 16.0, 13.0, 4.0, 18.0, 38.0, 1.0, 1.0] },
    ],
  },
  {
    title: 'Consensus Estimates',
    columns: PEER_COLS,
    rows: [
      { label: 'P/E', unit: 'multiple', placeholder: 'XX', values: Array(8).fill(null) },
      { label: 'P/B', unit: 'multiple', placeholder: 'XX', values: Array(8).fill(null) },
      { label: 'EV/ EBIDTA', unit: 'multiple', placeholder: 'XX', values: Array(8).fill(null) },
      { label: 'EV/Sales', unit: 'multiple', placeholder: 'XX', values: Array(8).fill(null) },
    ],
  },
];

// ---------------------------------------------------------------------------
// Leverage & Cash Flow
// ---------------------------------------------------------------------------

export const LEVERAGE_KPIS: Kpi[] = [
  { label: 'DRL Net Debt (₹ Cr)', value: '-10,473' },
  { label: 'DRL Net Debt / EBITDA', value: '-0.15x' },
  { label: 'DRL Net Debt / Equity', value: '-2.75x' },
  { label: 'DRL Cash Flow From Operations (₹ Cr)', value: '5,384' },
  { label: 'DRL Cash Flow From Investing (₹ Cr)', value: '-6,703' },
  { label: 'DRL Cash Flow From Financing (₹ Cr)', value: '1,397' },
];

export const LEVERAGE_TABLES: HeatTable[] = [
  {
    title: 'Leverage & Cash Flows',
    columns: PEER_COLS,
    rows: [
      { label: 'Net Debt (₹ Cr)', unit: 'currencyCr', direction: 'lowerIsBetter', values: [-10473, -22909, -8373, -2545, -1129, 12995, 4291, 1124] },
      { label: 'Net Debt / EBITDA', unit: 'multiple', direction: 'lowerIsBetter', values: [-0.15, -1.7, -1.4, -0.4, -0.1, 2.9, 1.1, 0.2] },
      { label: 'Net Debt / Equity', unit: 'multiple', direction: 'lowerIsBetter', values: [-2.75, -33.3, -24.3, -6.7, -5.0, 73.9, 25.9, 3.8] },
      { label: 'Cash Flow From Operations (₹ Cr)', unit: 'currencyCr', values: [5384, 12853, 4133, 5513, 7152, 2631, 2510, 2191] },
      { label: 'Cash Flow From Investing (₹ Cr)', unit: 'currencyCr', values: [-6703, -12108, -2556, -3789, -4081, -12749, -254, -8724] },
      { label: 'Cash Flow From Financing (₹ Cr)', unit: 'currencyCr', values: [1397, -1242, -1104, -96, -446, 10661, -2268, 6371] },
      { label: 'Free Cash Flow (₹ Cr)', unit: 'currencyCr', values: [3051, 9242, 2533, 2827, 5097, 1954, 1884, -480] },
      { label: 'CAPEX (₹ Cr)', unit: 'currencyCr', direction: 'lowerIsBetter', values: [2333, 3609, 1599, 2686, 2055, -677, 626, 2672] },
    ],
  },
  {
    title: 'Working Capital Days',
    columns: PEER_COLS,
    rows: [
      { label: 'DSO (days)', unit: 'days', direction: 'lowerIsBetter', values: [104.1, 89.5, 73.3, 70.2, 79.0, 63.9, 41.8, 64.5] },
      { label: 'DIO (days)', unit: 'days', direction: 'lowerIsBetter', values: [212.8, 354.2, 217.0, 299.2, 281.7, 306.9, 192.6, 213.6] },
      { label: 'DPO (days)', unit: 'days', values: [76.7, null, 98.4, 116.4, 160.8, 191.9, 111.1, 95.3] },
      { label: 'Current Ratio', unit: 'multiple', values: [1.8, 2.8, 3.4, 1.8, 1.9, 1.1, 1.1, 1.3] },
    ],
  },
  {
    title: 'Consensus Estimates',
    columns: PEER_COLS,
    rows: [
      { label: 'Free Cash Flow (₹ Cr)', unit: 'currencyCr', placeholder: 'XX', values: Array(8).fill(null) },
      { label: 'CAPEX (₹ Cr)', unit: 'currencyCr', placeholder: 'XX', values: Array(8).fill(null) },
      { label: 'Net Debt/EBITDA (x)', unit: 'multiple', placeholder: 'XX', values: Array(8).fill(null) },
    ],
  },
];

// ---------------------------------------------------------------------------
// CDMO
// ---------------------------------------------------------------------------

export const CDMO_COMPANIES: CdmoCompany[] = [
  { name: "Divi's Labs", revenue: '10,476', growth: '12.3%', margin: '32.8%' },
  { name: 'Laurus Labs', revenue: '6,721', growth: '22.0%', margin: '26.4%' },
  { name: 'Sai Life Sciences', revenue: '2,137', growth: '27.9%', margin: '29.5%' },
  { name: 'Syngene', revenue: '3,739', growth: '2.6%', margin: '26.2%' },
];

const CDMO_COLS = ["Divi's", 'Laurus', 'Sai Life', 'Syngene'];

export const CDMO_TABLES: HeatTable[] = [
  {
    title: 'Performance Heatmap',
    columns: CDMO_COLS,
    rows: [
      { label: 'Revenue Growth%', unit: 'percent', values: [12.3, 22.0, 27.9, 2.6] },
      { label: 'Gross Profit Margin%', unit: 'percent', values: [61.2, 60.4, 74.0, 75.4] },
      { label: 'EBITDA Margin %', unit: 'percent', values: [32.8, 26.4, 29.5, 26.2] },
      { label: 'PAT Margin %', unit: 'percent', values: [24.5, 13.2, 16.3, 8.5] },
      { label: 'ROCE %', unit: 'percent', values: [15.8, 18.1, 14.4, 7.5] },
    ],
  },
  {
    title: 'Multiples & Market Capitalisation',
    columns: CDMO_COLS,
    rows: [
      { label: 'P/E (x)', unit: 'multiple', direction: 'lowerIsBetter', values: [61.5, 60.3, 58.5, 49.5] },
      { label: 'P/B (x)', unit: 'multiple', direction: 'lowerIsBetter', values: [9.4, 10.1, 8.3, 3.2] },
      { label: 'EV/EBITDA (x)', unit: 'multiple', direction: 'lowerIsBetter', values: [44.9, 31.6, 32.8, 15.3] },
      { label: 'Market Capitalisation (₹ Cr)', unit: 'currencyCr', values: [157874, 53651, 20643, 15700] },
      { label: 'Asset Turnover Ratio (x)', unit: 'multiple', values: [0.5, 0.6, 0.6, 0.5] },
    ],
  },
  {
    title: 'Consensus Estimates',
    columns: CDMO_COLS,
    rows: [
      { label: 'Revenue Growth %', unit: 'percent', values: [19.9, 23.0, 23.3, -1.3] },
      { label: 'Gross Margin %', unit: 'percent', values: [63.7, 61.8, 74.2, 75.7] },
      { label: 'EBITDA Margin %', unit: 'percent', values: [35.9, 29.6, 29.7, 24.6] },
      { label: 'PAT Margin %', unit: 'percent', values: [26.0, 15.9, 15.9, 6.2] },
      { label: 'P/E (x)', unit: 'multiple', values: [35.9, 29.6, 29.7, 24.6] },
      { label: 'P/B (x)', unit: 'multiple', values: [26.0, 15.9, 15.9, 6.2] },
      { label: 'EV/EBITDA (x)', unit: 'multiple', values: [35.9, 29.6, 29.7, 24.6] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Consensus (dedicated tab)
// ---------------------------------------------------------------------------

export const CONSENSUS_TITLE = "Analyst Wise - Rating, Target Price & Consensus Estimates for Dr. Reddy's";

export const CONSENSUS_SUMMARY: HeatTable = {
  title: '',
  columns: ['1 Year Forward', '1YF Growth %', '2 Year Forward', '2YF Growth %'],
  firstColLabel: 'Metric',
  rows: [
    { label: 'Mean Consensus', unit: 'number', placeholder: 'XX', values: Array(4).fill(null) },
    { label: 'High Consensus', unit: 'number', placeholder: 'XX', values: Array(4).fill(null) },
    { label: 'Low Consensus', unit: 'number', placeholder: 'XX', values: Array(4).fill(null) },
  ],
};

export const ANALYST_ROWS: AnalystRow[] = [
  { firm: 'Investec', rating: 'Buy', targetPrice: 1600, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'JM Financial Institutional Securities Limited', rating: 'Buy', targetPrice: 1489, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: '360 ONE Capital Market Private Limited', rating: 'Buy', targetPrice: 1400, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Nomura', rating: 'Buy', targetPrice: 1740, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Nuvama (formerly Edelweiss)', rating: 'Buy', targetPrice: 1365, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Ambit Capital Pvt. Ltd.', rating: 'Buy', targetPrice: 1340, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'ICICIdirect.com (Retail)', rating: 'Buy', targetPrice: 1340, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Way2Wealth Brokers Ltd.', rating: 'Buy', targetPrice: 1440, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'HSBC', rating: 'Buy', targetPrice: 1350, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'BOB Capital Markets', rating: 'Buy', targetPrice: 1471, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'BofA Securities', rating: 'Buy', targetPrice: 1350, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Haitong International Research Ltd', rating: 'Outperform', targetPrice: 1300, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Prabhudas Lilladher Pvt.', rating: 'Accumulate', targetPrice: 1300, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'ICICI Securities (Institutional)', rating: 'Add', targetPrice: 1275, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'YES Research', rating: 'Add', targetPrice: 1340, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Choice Equity Broking Pvt Ltd', rating: 'Add', targetPrice: 1365, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Morgan Stanley', rating: 'Equal-weight', targetPrice: 1200, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Macquarie', rating: 'Neutral', targetPrice: 1230, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Motilal Oswal Securities Ltd.', rating: 'Neutral', targetPrice: 1125, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Phillip Securities', rating: 'Neutral', targetPrice: 1200, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'DAM Capital', rating: 'Neutral', targetPrice: 1203, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'BNP Paribas', rating: 'Neutral', targetPrice: 1220, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'CLSA', rating: 'Hold', targetPrice: 1240, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Antique Stock Broking Ltd', rating: 'Hold', targetPrice: 1160, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Systematix Group', rating: 'Hold', targetPrice: 1213, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Incred Research Services Pvt Ltd', rating: 'Hold', targetPrice: 1278, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Kotak Securities (Institutional Equities)', rating: 'Reduce', targetPrice: 1125, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Axis Capital', rating: 'Reduce', targetPrice: 1160, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Emkay', rating: 'Reduce', targetPrice: 1200, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'HDFC Research', rating: 'Reduce', targetPrice: 1250, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Dolat Capital Market Ltd.', rating: 'Reduce', targetPrice: 1246, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Avendus Spark', rating: 'Reduce', targetPrice: 1120, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'IIFL (Institutional)', rating: 'Reduce', targetPrice: 1160, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Elara Capital', rating: 'Reduce', targetPrice: 1222, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'JP Morgan', rating: 'Underweight', targetPrice: 1100, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Jefferies', rating: 'Underperform', targetPrice: 1040, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Goldman Sachs', rating: 'Sell', targetPrice: 1050, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'UBS', rating: 'Sell', targetPrice: 1150, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Citi', rating: 'Sell', targetPrice: 1040, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Equirus Securities Private Limited', rating: 'Sell', targetPrice: 1080, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Nirmal Bang Institutional Equities', rating: 'Sell', targetPrice: 1098, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Indsec', rating: 'Not Rated', targetPrice: null, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Morningstar', rating: 'Not Rated', targetPrice: null, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
  { firm: 'Sharekhan Limited', rating: 'Not Rated', targetPrice: null, oneYearForward: null, oneYearGrowth: null, twoYearForward: null, twoYearGrowth: null },
];
