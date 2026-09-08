import { useState } from 'react';

import { TopBar } from '@/components/competitive/TopBar';
import type { TopTab } from '@/data/dummyData';

import {
  CdmoTab,
  ConsensusTab,
  CostStructureEbitdaTab,
  LeverageCashFlowTab,
  OverviewTab,
  RevenueGrowthTab,
  ValuationReturnsTab,
} from './CompetitiveAnalysisTabs';

const TAB_CONTENT: Record<TopTab, React.ComponentType> = {
  Overview: OverviewTab,
  'Revenue & Growth': RevenueGrowthTab,
  'Cost Structure & EBITDA': CostStructureEbitdaTab,
  'Valuation & Returns': ValuationReturnsTab,
  'Leverage & Cash Flow': LeverageCashFlowTab,
  CDMO: CdmoTab,
  Consensus: ConsensusTab,
};

export function CompetitiveAnalysisPage() {
  const [activeTab, setActiveTab] = useState<TopTab>('Overview');
  const ActiveTabContent = TAB_CONTENT[activeTab];

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <TopBar activeTab={activeTab} onChangeTab={setActiveTab} />
      <main className="px-8 py-6">
        <ActiveTabContent />
      </main>
    </div>
  );
}
