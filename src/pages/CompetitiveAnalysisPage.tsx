import { useState } from 'react';

import { TopBar } from '@/components/competitive/TopBar';
import type { TopTab } from '@/data/dummyData';

import {
  CdmoTab,
  CostStructureTab,
  EbitdaDetailTab,
  LeverageCashFlowsTab,
  OverviewTab,
  RevenueGrowthTab,
  SustainabilityTab,
  ValuationReturnsTab,
} from './CompetitiveAnalysisTabs';

const TAB_CONTENT: Record<TopTab, React.ComponentType> = {
  Overview: OverviewTab,
  'Revenue & Growth': RevenueGrowthTab,
  'Cost Structure': CostStructureTab,
  'EBITDA Detail': EbitdaDetailTab,
  'Valuation & Returns': ValuationReturnsTab,
  'Leverage & Cash Flows': LeverageCashFlowsTab,
  Sustainability: SustainabilityTab,
  CDMO: CdmoTab,
};

export function CompetitiveAnalysisPage() {
  const [activeTab, setActiveTab] = useState<TopTab>('Overview');
  const ActiveTabContent = TAB_CONTENT[activeTab];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <TopBar activeTab={activeTab} onChangeTab={setActiveTab} />
      <main className="px-8 py-6">
        <ActiveTabContent />
      </main>
    </div>
  );
}
