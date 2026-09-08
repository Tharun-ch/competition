import { AnalystTable } from '@/components/competitive/AnalystTable';
import { BridgeChart } from '@/components/competitive/BridgeChart';
import { CdmoCard } from '@/components/competitive/CdmoCard';
import { DataTable } from '@/components/competitive/DataTable';
import { ForecastPeriodDropdown } from '@/components/competitive/ForecastPeriodDropdown';
import { KpiRow } from '@/components/competitive/KpiCard';
import { MeasureDropdown } from '@/components/competitive/MeasureDropdown';
import {
  CDMO_COMPANIES,
  CDMO_TABLES,
  CONSENSUS_SUMMARY,
  CONSENSUS_TITLE,
  COST_STRUCTURE_TABLES,
  LEVERAGE_KPIS,
  LEVERAGE_TABLES,
  OVERVIEW_KPIS,
  OVERVIEW_TABLES,
  REVENUE_GROWTH_TABLES,
  VALUATION_KPIS,
  VALUATION_TABLES,
} from '@/data/dummyData';

export function OverviewTab() {
  const [performance, multiples, consensus] = OVERVIEW_TABLES;
  return (
    <div className="flex flex-col gap-6">
      <KpiRow kpis={OVERVIEW_KPIS} />
      <DataTable table={performance} />
      <DataTable table={multiples} />
      <DataTable table={consensus} titleRight={<ForecastPeriodDropdown />} />
    </div>
  );
}

export function RevenueGrowthTab() {
  const [revenue, growth, consensus] = REVENUE_GROWTH_TABLES;
  return (
    <div className="flex flex-col gap-6">
      <DataTable table={revenue} />
      <DataTable table={growth} />
      <DataTable table={consensus} titleRight={<ForecastPeriodDropdown />} />
    </div>
  );
}

export function CostStructureEbitdaTab() {
  const [costSales, costChange, ebitda] = COST_STRUCTURE_TABLES;
  return (
    <div className="flex flex-col gap-6">
      <DataTable table={costSales} />
      <DataTable table={costChange} />
      <DataTable table={ebitda} />
      <BridgeChart />
    </div>
  );
}

export function ValuationReturnsTab() {
  const [multiples, priceMktCap, returns, consensus] = VALUATION_TABLES;
  return (
    <div className="flex flex-col gap-6">
      <KpiRow kpis={VALUATION_KPIS} />
      <DataTable table={multiples} />
      <DataTable table={priceMktCap} />
      <DataTable table={returns} />
      <DataTable table={consensus} titleRight={<ForecastPeriodDropdown />} />
    </div>
  );
}

export function LeverageCashFlowTab() {
  const [leverage, workingCapital, consensus] = LEVERAGE_TABLES;
  return (
    <div className="flex flex-col gap-6">
      <KpiRow kpis={LEVERAGE_KPIS} cols={3} />
      <DataTable table={leverage} />
      <DataTable table={workingCapital} />
      <DataTable table={consensus} titleRight={<ForecastPeriodDropdown />} />
    </div>
  );
}

export function CdmoTab() {
  const [performance, multiples, consensus] = CDMO_TABLES;
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CDMO_COMPANIES.map((company) => (
          <CdmoCard key={company.name} {...company} />
        ))}
      </div>
      <DataTable table={performance} />
      <DataTable table={multiples} />
      <DataTable table={consensus} titleRight={<ForecastPeriodDropdown />} />
    </div>
  );
}

export function ConsensusTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-gray-900">{CONSENSUS_TITLE}</h2>
        <MeasureDropdown />
      </div>
      <DataTable table={CONSENSUS_SUMMARY} />
      <AnalystTable />
    </div>
  );
}
