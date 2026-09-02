import { BridgeChart } from '@/components/competitive/BridgeChart';
import { CdmoCard } from '@/components/competitive/CdmoCard';
import { DataTable } from '@/components/competitive/DataTable';
import { ForecastPeriodDropdown } from '@/components/competitive/ForecastPeriodDropdown';
import { KpiRow } from '@/components/competitive/KpiCard';
import {
  CDMO_COMPANIES,
  CDMO_TABLES,
  COST_STRUCTURE_TABLES,
  EBITDA_DETAIL_TABLE,
  ENVIRONMENT_TABLE,
  LEVERAGE_KPIS,
  LEVERAGE_SECTION_TITLE,
  LEVERAGE_TABLES,
  OVERVIEW_KPIS,
  OVERVIEW_TABLES,
  REVENUE_GROWTH_TABLES,
  SOCIAL_TABLE,
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
  return (
    <div className="flex flex-col gap-6">
      {REVENUE_GROWTH_TABLES.map((table) => (
        <DataTable key={table.title} table={table} />
      ))}
    </div>
  );
}

export function CostStructureTab() {
  return (
    <div className="flex flex-col gap-6">
      {COST_STRUCTURE_TABLES.map((table) => (
        <DataTable key={table.title} table={table} />
      ))}
    </div>
  );
}

export function EbitdaDetailTab() {
  return (
    <div className="flex flex-col gap-6">
      <DataTable table={EBITDA_DETAIL_TABLE} />
      <BridgeChart />
    </div>
  );
}

export function ValuationReturnsTab() {
  return (
    <div className="flex flex-col gap-6">
      <KpiRow kpis={VALUATION_KPIS} />
      {VALUATION_TABLES.map((table) => (
        <DataTable key={table.title} table={table} />
      ))}
    </div>
  );
}

export function LeverageCashFlowsTab() {
  const [leverage, workingCapital] = LEVERAGE_TABLES;
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[15px] font-semibold text-gray-900">{LEVERAGE_SECTION_TITLE}</h2>
      <KpiRow kpis={LEVERAGE_KPIS} cols={3} />
      <DataTable table={leverage} />
      <DataTable table={workingCapital} />
    </div>
  );
}

export function SustainabilityTab() {
  return (
    <div className="flex flex-col gap-6">
      <DataTable table={ENVIRONMENT_TABLE} />
      <DataTable table={SOCIAL_TABLE} />
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
