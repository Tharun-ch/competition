/**
 * DUMMY DATA — placeholder for the Competitive Analysis app.
 *
 * Everything the UI renders (KPI cards, heatmap tables, the EBITDA bridge chart,
 * CDMO peer cards) is sourced from this single file. When the real Fabric
 * semantic model is connected, delete this file and replace its exports with
 * data loaded from that model — the component layer (src/components/competitive,
 * src/pages/CompetitiveAnalysisPage.tsx) reads only the types below, so no UI
 * code needs to change.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Unit = 'percent' | 'currencyCr' | 'multiple' | 'number' | 'days' | 'rupee' | 'rank';
export type Direction = 'higherIsBetter' | 'lowerIsBetter';
export type HeatColor = 'red' | 'orange' | 'yellow' | 'green';

export interface MetricRow {
  label: string;
  unit: Unit;
  /** One value per column; `null` renders as "n/a". */
  values: (number | null)[];
  /** Optional CAGR% shown under the value, colored by sign (not by rank). */
  cagr?: (number | null)[];
  /** Optional "% of total" shown under the value, in place of cagr. */
  percentOfTotal?: (number | null)[];
  direction?: Direction;
  /** Set false to disable the relative-rank cell coloring (e.g. absolute-value tables). */
  colorize?: boolean;
  bold?: boolean;
  /** Renders the row as a solid purple "Total" row, like the table header. */
  variant?: 'total';
}

export interface HeatTable {
  title: string;
  columns: string[];
  firstColLabel?: string;
  rows: MetricRow[];
}

export interface Kpi {
  label: string;
  value: string;
  sub?: string;
}

export interface CdmoCompany {
  name: string;
  dotColor: string;
  revenue: string;
  growth: string;
  margin: string;
}

// ---------------------------------------------------------------------------
// App / header
// ---------------------------------------------------------------------------

export const APP_META = {
  title: "Competitive Analysis — Dr. Reddy's Laboratories",
  badge: 'DATA IS ONLY PULLED FROM BLOOMBERG',
};

export const PEER_COMPANIES = [
  'Sun Pharma',
  'Cipla',
  'Aurobindo',
  'Lupin',
  'Torrent',
  'Mankind',
  'Zydus',
];

export const FISCAL_YEARS = ['FY21', 'FY22', 'FY23', 'FY24', 'FY25', 'FY26', 'FY27E', 'FY28E'];
export const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
export const BRIDGE_PERIODS = ['FY26 Q4', 'FY26 Q3', 'FY26 Q2', 'FY26 Q1'];
export const FORECAST_PERIODS = ['1 Year Forward (1YF)', '2 Year Forward (2YF)'];

export const TOP_TABS = [
  'Overview',
  'Revenue & Growth',
  'Cost Structure',
  'EBITDA Detail',
  'Valuation & Returns',
  'Leverage & Cash Flows',
  'Sustainability',
  'CDMO',
] as const;
export type TopTab = (typeof TOP_TABS)[number];

/** DRL, then the seven listed peers — the standard column set for peer-comparison tables. */
export const PEER_COLS = ['DRL', 'Sun', 'Cipla', 'Auro', 'Lupin', 'Torrent', 'Mankind', 'Zydus'];

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

export const OVERVIEW_KPIS: Kpi[] = [
  { label: 'DRL Revenue', value: '₹33,593 Cr', sub: 'Growth 3.2%' },
  { label: 'DRL EBITDA Margin', value: '19.2%', sub: 'Absolute EBITDA: ₹6,454 Cr' },
  { label: 'DRL ROCE %', value: '19.0%', sub: 'Peer avg 27.4% · gap -4.7pp' },
  { label: 'DRL P/E', value: '24.9x' },
  { label: 'DRL Market-Cap Rank Overall', value: '4 of 8', sub: 'LTI Rank - 5 of 8' },
];

export const OVERVIEW_TABLES: HeatTable[] = [
  {
    title: 'Performance Heatmap',
    columns: PEER_COLS,
    rows: [
      { label: 'Revenue Growth %', unit: 'percent', values: [3.2, 11.9, 2.1, 6.4, 26.0, 23.5, 17.0, 18.4] },
      { label: 'Gross Profit Margin %', unit: 'percent', values: [58.4, 63.2, 60.1, 54.8, 61.5, 65.0, 68.2, 62.7] },
      { label: 'EBITDA Margin %', unit: 'percent', values: [19.2, 28.3, 21.4, 20.5, 29.2, 32.6, 27.8, 26.9] },
      { label: 'PAT Margin %', unit: 'percent', values: [12.5, 19.8, 14.2, 12.0, 20.1, 22.4, 18.9, 17.6] },
      { label: 'ROCE %', unit: 'percent', values: [22.7, 21.6, 19.3, 16.4, 21.4, 41.7, 36.9, 34.7] },
    ],
  },
  {
    title: 'Multiples & Market Capitalisation — Will show N/A when a period (from-to) is selected',
    columns: PEER_COLS,
    rows: [
      { label: 'P/E', unit: 'multiple', direction: 'lowerIsBetter', values: [24.9, 36.7, 25.5, 21.6, 19.8, 66.0, 43.3, 17.4] },
      { label: 'EV/EBITDA', unit: 'multiple', direction: 'lowerIsBetter', values: [16.3, 23.9, 15.3, 10.7, 12.8, 36.2, 22.0, 12.7] },
      { label: 'Market Capitalisation (₹ Cr)', unit: 'currencyCr', values: [104575, 421611, 98946, 75760, 105974, 142831, 82799, 87643] },
    ],
  },
  {
    title: 'Consensus Estimates',
    columns: PEER_COLS,
    rows: [
      { label: 'Revenue', unit: 'percent', values: Array(8).fill(null) },
      { label: 'Gross Margin %', unit: 'percent', values: Array(8).fill(null) },
      { label: 'EBITDA Margin %', unit: 'percent', values: Array(8).fill(null) },
      { label: 'PAT Margin %', unit: 'percent', values: Array(8).fill(null) },
    ],
  },
];

// ---------------------------------------------------------------------------
// Revenue & Growth
// ---------------------------------------------------------------------------

export const REVENUE_GROWTH_TABLES: HeatTable[] = [
  {
    title: 'Region Wise Revenue (₹ Cr) & Contribution To Total Revenue',
    columns: PEER_COLS,
    firstColLabel: 'Segment',
    rows: [
      { label: 'North America', unit: 'currencyCr', colorize: false, values: [13412, 18100, 8850, 7220, 6100, 5200, 3100, 6400], percentOfTotal: [39.9, 31.1, 31.9, 21.6, 21.8, 37.2, 21.7, 24.0] },
      { label: 'Europe', unit: 'currencyCr', colorize: false, values: [5274, 7600, 4600, 5100, 3900, 1900, 1400, 4200], percentOfTotal: [15.7, 13.1, 16.6, 15.3, 13.9, 13.6, 9.8, 15.7] },
      { label: 'India', unit: 'currencyCr', colorize: false, values: [7471, 16200, 8300, 6300, 9800, 4900, 8200, 9100], percentOfTotal: [22.2, 27.8, 30.0, 18.9, 35.1, 35.0, 57.4, 34.1] },
      { label: 'Emerging Markets', unit: 'currencyCr', colorize: false, values: [5900, 9700, 4200, 9600, 5900, 1500, 1100, 4800], percentOfTotal: [17.6, 16.7, 15.2, 28.8, 21.1, 10.7, 7.7, 18.0] },
      { label: 'PSAI (API)', unit: 'currencyCr', colorize: false, values: [1536, 6620, 1762, 5165, 2258, 480, 478, 2220], percentOfTotal: [4.6, 11.4, 6.4, 15.5, 8.1, 3.4, 3.3, 8.3] },
      { label: 'Total', unit: 'currencyCr', colorize: false, variant: 'total', values: [33593, 58220, 27712, 33385, 27958, 13980, 14278, 26720] },
    ],
  },
  {
    title: 'Region Wise Revenue Growth',
    columns: PEER_COLS,
    firstColLabel: 'Segment',
    rows: [
      { label: 'North America', unit: 'percent', values: [-2.4, 14.2, 3.8, 8.1, 30.5, 27.9, 19.4, 21.0] },
      { label: 'Europe', unit: 'percent', values: [4.1, 9.8, 1.2, 5.6, 22.0, 18.4, 14.7, 16.9] },
      { label: 'India', unit: 'percent', values: [11.6, 13.5, 7.4, 9.9, 24.8, 20.1, 22.6, 19.8] },
      { label: 'Emerging Markets', unit: 'percent', values: [6.8, 15.9, 2.6, 12.3, 27.1, 24.6, 16.2, 18.7] },
      { label: 'PSAI (API)', unit: 'percent', values: [-5.2, 6.4, -1.8, 4.0, 18.9, 15.2, 9.1, 12.4] },
      { label: 'Total', unit: 'percent', colorize: false, variant: 'total', values: [3.2, 11.9, 2.1, 6.4, 26.0, 23.5, 17.0, 18.4] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Cost Structure
// ---------------------------------------------------------------------------

export const COST_STRUCTURE_TABLES: HeatTable[] = [
  {
    title: 'Cost (₹ Cr) & as a % of Sales',
    columns: PEER_COLS,
    firstColLabel: 'Segment',
    rows: [
      { label: 'COGS', unit: 'currencyCr', colorize: false, values: [14453, 21400, 11049, 15302, 10774, 4054, 4540, 9862], percentOfTotal: [43.0, 36.8, 39.9, 45.8, 38.5, 29.0, 31.8, 36.9] },
      { label: 'SG&A', unit: 'currencyCr', colorize: false, values: [10078, 15250, 7524, 8850, 6989, 2350, 3350, 6980], percentOfTotal: [30.0, 26.2, 27.2, 26.5, 25.0, 16.8, 23.5, 26.1] },
      { label: 'R&D', unit: 'currencyCr', colorize: false, values: [2452, 3900, 1662, 1836, 1258, 559, 785, 1470], percentOfTotal: [7.3, 6.7, 6.0, 5.5, 4.5, 4.0, 5.5, 5.5] },
      { label: 'Personnel', unit: 'currencyCr', colorize: false, values: [4610, 6900, 3350, 3980, 3020, 1090, 1490, 3120], percentOfTotal: [13.7, 11.9, 12.1, 11.9, 10.8, 7.8, 10.4, 11.7] },
      { label: 'Others', unit: 'currencyCr', colorize: false, values: [-302, -1350, -558, 883, -280, -60, -125, -430], percentOfTotal: [-0.9, -2.3, -2.0, 2.6, -1.0, -0.4, -0.9, -1.6] },
      { label: 'Total', unit: 'currencyCr', colorize: false, variant: 'total', values: [33593, 58220, 27712, 33385, 27958, 13980, 14278, 26720] },
    ],
  },
  {
    title: 'Cost Increase/Decrease',
    columns: PEER_COLS,
    firstColLabel: 'Segment',
    rows: [
      { label: 'COGS', unit: 'percent', direction: 'lowerIsBetter', values: [5.8, 9.4, 3.1, 12.6, 6.0, 4.4, 5.9, 7.2] },
      { label: 'SG&A', unit: 'percent', direction: 'lowerIsBetter', values: [3.2, 8.1, 2.4, 9.8, 5.3, 3.9, 4.6, 6.4] },
      { label: 'R&D', unit: 'percent', direction: 'lowerIsBetter', values: [-1.4, 6.5, 0.8, 7.2, 3.1, 2.0, 3.8, 4.9] },
      { label: 'Other Opex', unit: 'percent', direction: 'lowerIsBetter', values: [-8.2, 4.0, -3.5, 15.1, 1.6, -2.1, 0.9, 2.7] },
      { label: 'Personnel', unit: 'percent', direction: 'lowerIsBetter', values: [6.1, 10.2, 4.7, 11.9, 7.4, 5.5, 6.8, 8.3] },
      { label: 'Total', unit: 'percent', colorize: false, variant: 'total', values: [4.8, 8.9, 3.3, 11.4, 5.7, 4.2, 5.4, 7.0] },
    ],
  },
];

// ---------------------------------------------------------------------------
// EBITDA Detail
// ---------------------------------------------------------------------------

export const EBITDA_DETAIL_TABLE: HeatTable = {
  title: 'EBITDA',
  columns: PEER_COLS,
  rows: [
    { label: 'EBITDA (₹ Cr)', unit: 'currencyCr', values: [6454, 16476, 5931, 6844, 8164, 4558, 3969, 7188] },
    { label: 'EBITDA Margin %', unit: 'percent', values: [19.2, 28.3, 21.4, 20.5, 29.2, 32.6, 27.8, 26.9] },
  ],
};

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
  defaultPeriod: 'FY26 Q4',
  barColor: '#4C3A9E',
  /** The track represents 0..scaleMax%, so bars/steps can be positioned proportionally. */
  scaleMax: 30,
  steps: [
    { label: 'Sun Pharma EBITDA', type: 'total', value: 28.3, display: '28.3%' },
    { label: 'Gross Margin', type: 'delta', value: -2.0, display: '-2.0pp' },
    { label: 'R&D', type: 'delta', value: -1.4, display: '-1.4pp' },
    { label: 'SG&A', type: 'delta', value: -2.3, display: '-2.3pp' },
    { label: 'Personnel', type: 'delta', value: -1.9, display: '-1.9pp' },
    { label: 'Other Opex', type: 'delta', value: -1.5, display: '-1.5pp' },
    { label: 'DRL EBITDA', type: 'total', value: 19.2, display: '19.2%' },
  ] satisfies BridgeStep[],
  note: 'Note: DRL EBITDA % = Sun Pharma EBITDA % (28.3%) − Gross Margin (2.0pp) − R&D (1.4pp) − SG&A (2.3pp) − Personnel (1.9pp) − Other Opex (1.5pp) = 19.2% · Gap: -9.1pp',
};

// ---------------------------------------------------------------------------
// Valuation & Returns
// ---------------------------------------------------------------------------

export const VALUATION_KPIS: Kpi[] = [
  { label: 'DRL Share Price', value: '₹1254.9' },
  { label: 'DRL Market Cap', value: '₹1,04,575 Cr' },
  { label: 'DRL P/E', value: '24.9x' },
  { label: 'DRL EV/EBITDA', value: '16.3x' },
  { label: 'DRL EV/Sales', value: '3.1x' },
];

export const VALUATION_TABLES: HeatTable[] = [
  {
    title: 'Valuation Multiples',
    columns: PEER_COLS,
    rows: [
      { label: 'P/E', unit: 'multiple', direction: 'lowerIsBetter', values: [24.9, 36.7, 25.5, 21.6, 19.8, 66.0, 43.3, 17.4] },
      { label: 'P/B', unit: 'multiple', direction: 'lowerIsBetter', values: [3.8, 6.2, 4.1, 3.0, 3.5, 9.8, 12.4, 4.6] },
      { label: 'EV/EBITDA', unit: 'multiple', direction: 'lowerIsBetter', values: [16.3, 23.9, 15.3, 10.7, 12.8, 36.2, 22.0, 12.7] },
      { label: 'EV/Sales', unit: 'multiple', direction: 'lowerIsBetter', values: [3.1, 6.8, 3.3, 2.2, 3.7, 11.8, 12.1, 3.4] },
    ],
  },
  {
    title: 'Share Price & Market Cap',
    columns: PEER_COLS,
    rows: [
      { label: 'Share Price (₹)', unit: 'rupee', values: [1254.9, 1757.2, 1224.2, 1304.4, 2313.9, 4220.2, 2005.8, 871.2] },
      { label: 'Market Cap (₹ Cr)', unit: 'currencyCr', values: [104575, 421611, 98946, 75760, 105974, 142831, 82799, 87643] },
      { label: 'Market Cap Rank (of 8)', unit: 'rank', direction: 'lowerIsBetter', values: [4, 1, 5, 8, 3, 2, 7, 6] },
      { label: 'Market Cap Rank as per LTI', unit: 'rank', values: Array(8).fill(null) },
    ],
  },
  {
    title: 'Returns',
    columns: PEER_COLS,
    rows: [
      { label: 'ROCE', unit: 'percent', values: [22.7, 21.6, 19.3, 16.4, 21.4, 41.7, 36.9, 34.7] },
      { label: 'ROIC', unit: 'percent', values: [15.1, 14.0, 13.2, 10.8, 13.9, 28.4, 25.1, 22.6] },
      { label: 'ROE', unit: 'percent', values: [11.8, 18.2, 15.6, 12.9, 16.4, 24.7, 27.3, 21.5] },
      { label: 'Dividend Payout Ratio', unit: 'percent', values: [15.9, 22.4, 18.7, 12.3, 20.1, 35.6, 28.9, 19.4] },
      { label: 'Dividend Per Share (₹)', unit: 'rupee', values: [8.0, 4.5, 9.0, 3.5, 9.0, 34.0, 6.75, 5.0] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Leverage & Cash Flows
// ---------------------------------------------------------------------------

export const LEVERAGE_SECTION_TITLE = 'Leverage & Cash Flow';

export const LEVERAGE_KPIS: Kpi[] = [
  { label: 'DRL Net Debt', value: '₹562 Cr' },
  { label: 'DRL Net Debt / EBITDA', value: '0.1x' },
  { label: 'DRL Net Debt / Equity', value: '1.5x' },
  { label: 'Cash Flow From Operations', value: '₹5,382 Cr' },
  { label: 'Cash Flow From Investing', value: '₹-6,701 Cr' },
  { label: 'Cash Flow From Financing', value: '₹1,397 Cr' },
];

export const LEVERAGE_TABLES: HeatTable[] = [
  {
    title: 'Leverage & Cash Flows',
    columns: PEER_COLS,
    rows: [
      { label: 'Net Debt (₹ Cr)', unit: 'currencyCr', direction: 'lowerIsBetter', values: [562, -1850, -420, 1240, 310, -2200, -1600, -980] },
      { label: 'Net Debt / EBITDA', unit: 'multiple', direction: 'lowerIsBetter', values: [0.1, -0.2, -0.1, 0.4, 0.1, -0.3, -0.4, -0.2] },
      { label: 'Net Debt / Equity', unit: 'multiple', direction: 'lowerIsBetter', values: [1.5, -0.4, -0.1, 0.3, 0.1, -0.5, -0.6, -0.2] },
      { label: 'Cash Flow From Operations (₹ Cr)', unit: 'currencyCr', values: [5382, 9840, 4230, 4680, 5310, 3120, 2860, 4990] },
      { label: 'Cash Flow From Investing (₹ Cr)', unit: 'currencyCr', values: [-6701, -5200, -2100, -3800, -3100, -1500, -1200, -2600] },
      { label: 'Cash Flow From Financing (₹ Cr)', unit: 'currencyCr', values: [1397, -2400, -1500, -600, -1800, -900, -700, -1600] },
      { label: 'CAPEX (₹ Cr)', unit: 'currencyCr', direction: 'lowerIsBetter', values: [2331, 3900, 1450, 2600, 1900, 750, 650, 1700] },
    ],
  },
  {
    title: 'Working Capital Days',
    columns: PEER_COLS,
    rows: [
      { label: 'DSO (days)', unit: 'days', direction: 'lowerIsBetter', values: [104.1, 78.6, 95.2, 112.8, 88.4, 62.1, 58.9, 90.3] },
      { label: 'DIO (days)', unit: 'days', direction: 'lowerIsBetter', values: [212.8, 145.3, 168.9, 198.4, 156.7, 98.2, 87.5, 172.6] },
      { label: 'DPO (days)', unit: 'days', values: [91.1, 105.4, 88.7, 76.3, 96.8, 68.9, 71.2, 92.5] },
      { label: 'CCC (days)', unit: 'days', direction: 'lowerIsBetter', values: [225.8, 118.5, 175.4, 234.9, 148.3, 91.4, 75.2, 170.4] },
      { label: 'Current Ratio', unit: 'multiple', values: [1.9, 2.4, 2.1, 1.6, 2.0, 2.8, 2.6, 2.2] },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sustainability
// ---------------------------------------------------------------------------

export const ENVIRONMENT_TABLE: HeatTable = {
  title: 'Environmental Metrics',
  columns: PEER_COLS,
  rows: [
    { label: 'GHG Scope 1 (kt CO₂e)', unit: 'number', direction: 'lowerIsBetter', values: [116.8, 210.4, 98.6, 245.7, 132.9, 68.2, 54.1, 140.5] },
    { label: 'GHG Scope 2 (kt CO₂e)', unit: 'number', direction: 'lowerIsBetter', values: [315.1, 198.7, 176.3, 289.4, 205.6, 112.8, 96.4, 220.9] },
    { label: 'Total Energy (TJ)', unit: 'number', direction: 'lowerIsBetter', values: [1291.6, 1680.2, 980.4, 1520.8, 1105.3, 640.7, 520.9, 1240.6] },
    { label: '% Renewable Energy', unit: 'percent', values: [68.6, 42.3, 55.8, 31.2, 48.9, 71.4, 76.2, 52.7] },
  ],
};

export const SOCIAL_TABLE: HeatTable = {
  title: 'Social Metrics',
  columns: PEER_COLS,
  rows: [
    { label: 'Community Spending (₹ Cr)', unit: 'currencyCr', values: [111, 148, 62, 54, 79, 41, 38, 88] },
    { label: 'Employees', unit: 'number', values: [42487, 38500, 26400, 32100, 21800, 14200, 12600, 24900] },
    { label: 'Employee Turnover %', unit: 'percent', direction: 'lowerIsBetter', values: [18.4, 12.6, 15.9, 21.3, 14.2, 9.8, 8.5, 16.7] },
    { label: 'Women in Workforce %', unit: 'percent', values: [22.9, 26.4, 24.1, 19.8, 25.0, 31.2, 33.6, 23.5] },
    { label: 'Women in Senior Management %', unit: 'percent', values: [14.2, 18.9, 16.5, 11.4, 17.8, 24.6, 27.1, 15.9] },
  ],
};

// ---------------------------------------------------------------------------
// CDMO
// ---------------------------------------------------------------------------

export const CDMO_COMPANIES: CdmoCompany[] = [
  { name: "Divi's Labs", dotColor: '#5B3E96', revenue: '₹10,476 Cr', growth: '12.3%', margin: '32.8%' },
  { name: 'Laurus Labs', dotColor: '#3366CC', revenue: '₹6,721 Cr', growth: '22.0%', margin: '26.4%' },
  { name: 'Sai Life Sciences', dotColor: '#E67E22', revenue: '₹2,137 Cr', growth: '27.9%', margin: '29.5%' },
  { name: 'Syngene', dotColor: '#2E8B57', revenue: '₹3,593 Cr', growth: '3.2%', margin: '19.2%' },
];

const CDMO_COLS = ["Divi's", 'Laurus', 'Sai Life', 'Syngene'];

export const CDMO_TABLES: HeatTable[] = [
  {
    title: 'CDMO Performance Heatmap',
    columns: CDMO_COLS,
    rows: [
      { label: 'Revenue (₹ Cr)', unit: 'currencyCr', values: [10476, 6721, 2137, 3593] },
      { label: 'Revenue Growth %', unit: 'percent', values: [12.3, 22.0, 27.9, 3.2] },
      { label: 'Gross Profit Margin %', unit: 'percent', values: [58.2, 51.6, 54.9, 48.3] },
      { label: 'EBITDA Margin %', unit: 'percent', values: [32.8, 26.4, 29.5, 19.2] },
      { label: 'PAT Margin %', unit: 'percent', values: [24.1, 18.6, 20.3, 12.5] },
      { label: 'ROCE %', unit: 'percent', values: [18.1, 20.7, 8.0, 22.7] },
    ],
  },
  {
    title: 'Multiples & Market Capitalisation — Will show N/A when a period (from-to) is selected',
    columns: CDMO_COLS,
    rows: [
      { label: 'P/E', unit: 'multiple', direction: 'lowerIsBetter', values: [61.5, 60.3, 58.5, 45.2] },
      { label: 'EV/EBITDA', unit: 'multiple', direction: 'lowerIsBetter', values: [42.1, 35.6, 33.8, 24.9] },
      { label: 'Market Capitalisation (₹ Cr)', unit: 'currencyCr', values: [157874, 53651, 20643, 38940] },
      { label: 'Asset Turnover Ratio', unit: 'multiple', values: [0.6, 0.8, 0.7, 0.9] },
    ],
  },
  {
    title: 'Consensus Estimates',
    columns: CDMO_COLS,
    rows: [
      { label: 'Revenue', unit: 'percent', values: Array(4).fill(null) },
      { label: 'Gross Margin %', unit: 'percent', values: Array(4).fill(null) },
      { label: 'EBITDA Margin %', unit: 'percent', values: Array(4).fill(null) },
      { label: 'PAT Margin %', unit: 'percent', values: Array(4).fill(null) },
    ],
  },
];
