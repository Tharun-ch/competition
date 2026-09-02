import { APP_META, TOP_TABS, type TopTab } from '@/data/dummyData';

import { PeriodDropdown } from './PeriodDropdown';

export function TopBar({
  activeTab,
  onChangeTab,
}: {
  activeTab: TopTab;
  onChangeTab: (tab: TopTab) => void;
}) {
  return (
    <div className="border-b border-[#E5E5E0] bg-white">
      <div className="flex items-center justify-between px-8 pt-6">
        <h1 className="text-[19px] font-bold text-gray-900">
          {APP_META.title}{' '}
          <span className="ml-2 align-middle text-[11px] font-medium uppercase tracking-wide text-gray-400">
            {APP_META.badge}
          </span>
        </h1>
        <PeriodDropdown />
      </div>

      <nav className="mt-4 flex gap-6 overflow-x-auto px-8">
        {TOP_TABS.map((tab) => {
          const active = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChangeTab(tab)}
              className={`whitespace-nowrap border-b-2 pb-3 text-[13px] font-medium transition-colors ${
                active ? 'border-[#4C3A9E] text-[#4C3A9E]' : 'border-transparent text-[#8A8A85] hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
